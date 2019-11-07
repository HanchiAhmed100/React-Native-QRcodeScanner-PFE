import React, { Component, createRef } from 'react';
import { Alert, Text, View , TouchableOpacity,Image, Keyboard,StatusBar,PermissionsAndroid,ActivityIndicator } from 'react-native';
import{ Item ,Picker , Button, Input, Label} from 'native-base'
import Orientation from 'react-native-orientation';
import styles from './styles';
import axios from 'axios'
import Snackbar from 'react-native-snackbar';
import Config from 'react-native-config'
// import { CameraKitCameraScreen,CameraKitCamera } from 'react-native-camera-kit';
import QRCodeScanner from 'react-native-qrcode-scanner';


const white = "#FFF"
export default class RedExample extends Component {

  constructor(props){
    super(props)
    this.state = ({
      agence_id : 0,
      code : '',
      response : '',
      invalide : '',
      resCode : '',
      affiche : false, 
      agence : [],
      agences : [],
      error : '',
      text : '',
      showCam : false,
      qrcode : null,
      societe : [],
      societes : []
    })
  }

  changed = item =>{
    if(this.state.text.length == 6){
      console.log('finish')
      Keyboard.dismiss()
      //this.onFinishCheckingCode(this.state.text)
      this.check()
    }
  }
  async componentDidMount(){
    await this.LoadFormData()
    Orientation.lockToLandscapeRight()
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA, {
        'title': 'Camera App Permission',
        'message': 'Camera App needs access to your camera '
      }
    )
  }


  LoadData = async () =>{
    await axios.get(Config.API_KEY+'/Api/Client/agences/'+this.state.societes[0].id)
    .then(res =>{
      this.setState({
        agences : res.data.Agences,
        agence_id : res.data.Agences[0].id, 
        isLoading: false
      })
    }).catch(err =>{
      Snackbar.show({
        title: 'Erreur Resaux internet',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Fermer',
          color: 'green',
          onPress: () => {  },
        },
      });
    })
  }

  LoadFormData = async () =>{
    await axios.get(Config.API_KEY+'/Api/Client/societe')
    .then(res =>{
      this.setState({
        societes : res.data.societe,
        societe : res.data.societe[0].nom
      })
      this.LoadData()
    })
    .catch(err =>{
      console.log(err)
      Snackbar.show({
        title: 'Erreur Resaux internet&',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {},
        },
      });
    })
  }

  PickerChanged = async (item) =>{
    this.setState({isLoading : true,societe: item})
    await axios.get(Config.API_KEY+'/Api/Client/agences/'+item)
    .then(res =>{
      this.setState({
        agences : res.data.Agences,
        agence_id : res.data.Agences[0].id, 
        isLoading: false
      })
    }).catch(err =>{
      console.log("the "+err)
      Snackbar.show({
        title: 'Erreur Resaux internet ...s.',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Fermer',
          color: 'green',
          onPress: () => {  },
        },
      });
    })
  }
  
//onFinishCheckingCode
  check = async () => {
    this.setState({isLoading : true})
   // this.setState({code : code })
      await axios.post(Config.API_KEY+'/Api/Reservation/verif',{
        verif : this.state.text
      }).then(res => {
          console.log(res)
          if(res.data.code == "code incorrecte"){
            Alert.alert(res.data.code)
          }else{
            Alert.alert('Votre code : M-'+res.data.code)
          }

        })
      .catch(err => console.log(err))
    this.setState({text : ''});
    this.setState({isLoading : false})
  };





   onSuccess = async (e) => {

    this.setState({isLoading : true})
    // this.setState({code : code })
       await axios.post(Config.API_KEY+'/Api/Reservation/verif',{
         verif : e.data
       }).then(res => {
           if(res.data.code == "code incorrecte"){
             Alert.alert(res.data.code)
           }else{
             Alert.alert('Votre code : M-'+res.data.code)
           }
 
         })
       .catch(err => console.log(err))
     this.setState({text : ''});
     this.setState({isLoading : false})
    this.setState({affiche : true})

  }
  
  field = createRef();

  clearCode() {
    const { current } = this.field;
    if (current) {
      current.clear();
    }
  }



  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    if (hasValue) {
      return {
        style: [styles.input, styles.inputNotEmpty],
      };
    }
    return {
      style: styles.input}
      ;
  };



  update = () => {
    this.setState({affiche : true})
    console.log("agence :"+this.state.agence)
    console.log("agence_id :"+this.state.agence_id)
    Orientation.lockToLandscapeRight()
  }
  showcamera = () => {
    this.setState({showCam : true})
    Orientation.lockToPortrait()
  }
  
  hidecamera = () =>{
    this.setState({showCam : false,affiche : true})*
    Orientation.lockToLandscapeRight() 
   }
  
  ticket = async () => {
    console.log('ticket : '+Config.API_KEY)
    this.setState({isLoading : true})
    await axios.post(Config.API_KEY+'/Api/Guichet/local',{
      agence_id : this.state.agence_id
    })
    .then(res =>{
      console.log("ok"+JSON.stringify(res))
      this.setState({
        resCode : res.data.res
      })
      Alert.alert("votre code : L-"+ this.state.resCode)
    })
    .catch(err=>{
      console.log('eerrr'+err)
      Snackbar.show({
        title: 'Erreur Resaux internet ...AA',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Fermer',
          color: 'green',
          onPress: () => {  },
        },
      });
    })
    this.setState({isLoading : false})
  }

  containerProps = { style: styles.inputWrapStyle };


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1,justifyContent: 'center'}}>
        <StatusBar hidden />

          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if(this.state.showCam){
      return(
        <QRCodeScanner
          //cameraType="front"
          showMarker={true}
          onRead={this.onSuccess}
          topContent={
            <Text style={styles.centerText}>
              scan <Text style={styles.textBold}> Le QR </Text> de la reservation.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={()=> this.hidecamera() }>
              <Text style={styles.buttonText}>Retour </Text>
            </TouchableOpacity>
          }
        />
      )
    }
    if(this.state.affiche){
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <StatusBar hidden />
          <View style={styles.background}>
                 <View style={styles.wi}>
              <Text style={styles.inputLabel}>Code de Verification</Text>


                  <Item placeholderTextColor="#FFF" floatingLabel>
                    
                    <Label placeholderTextColor="#FFF"></Label>
                    <Input  
                      placeholderTextColor="#FFF"                
                      onChangeText={(text) => this.setState({text})}
                      keyboardType="numeric"
                      value={this.state.text}
                      maxLength = {6}
                      onTextChange={this.changed()}
                      />
                  </Item>

                 </View>

            <View style={styles.inputWrapper}>
                <View style={styles.nextButton}>
                  <TouchableOpacity onPress={this.showcamera}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('./qrcode.png')}
                    />
                  </TouchableOpacity>
                </View>
            </View>
          </View> 
          <View style={styles.sec}>
            <Text style={styles.TicketLabel}>Ticket TT</Text>
            <Text style={styles.TicketSubLabel}>
            Appuyer sur le button pour prendre votre ticket
            </Text>
              <TouchableOpacity onPress={this.ticket} >
                <View style={styles.TicketButton} >
                    <Text style={{color : '#fff'}}>Ticket</Text>
                </View>
              </TouchableOpacity>

          </View>
        </View>
      );
    }else{
      return (
      <View>
      <StatusBar hidden />

      <Text style={{marginLeft : 10}}>Region </Text>
        <Item>
          <Picker
            mode="dropdown"
            style={{ width: 90 }}
            placeholder="Date de Reservation "
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.societe}
            onValueChange={(itemValue) => this.PickerChanged(itemValue)}>

            {
              this.state.societes.map( (v,k)=>{
              return <Picker.Item label={v.nom} value={v.id} key={k} />
              })
            }
          </Picker>
        </Item>
        <Text style={styles.space}></Text>
        <Text style={{marginLeft : 10}}>Espace TT</Text>
        
        <Item picker style={styles.shortenpicker}>
            <Picker
              mode="dropdown"

              style={{ width: 90 }}
              placeholder="Votre Region"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.agence_id}
              onValueChange={(item => this.setState({agence_id : item}))}
            >
            {
              this.state.agences.map( (x,k)=>{
              return <Picker.Item label={x.nom} value={x.id} key={k} />
              })
            }  
            </Picker>
        </Item>
        <Button rounded primary style={{padding : 20}} onPress={this.update}>
          <Text style={{color : '#fff'}}> Valider</Text>
        </Button>

      </View>)
    }
  }
}

