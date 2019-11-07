import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  linearGradient: {
    minHeight: 555,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    paddingTop: 50,
    paddingBottom: 10,
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  inputSubLabel: {
    color: '#fff',
  },centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: '#fff',
    width :100
  },
  buttonTouchable: {
    backgroundColor : '#4d68bc',
    padding :20,
    width : 100,
    borderRadius : 50
  },
  wi : {
    paddingRight :30,
    paddingLeft : 30
  },
  inputWrapStyle: {
    height: 50,
    marginTop: 30,
    
  },
  input: {
    height: 50,
    width: 40,
    borderRadius: 3,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  inputNotEmpty: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  nextButton: {
    marginTop: 100,
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  background : {
    backgroundColor : '#4d68bc',
    width : '50%',
    height : '100%'
  },
  myflex : {
    flex: 1,
    color : '#000'
  },
  nextButtonArrow: {
    transform: [{ translateX: -3 }, { rotate: '45deg' }],
    borderColor: '#4d68bc',
    width: 20,
    height: 20,
    borderWidth: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  sec : {
    backgroundColor : '#fff',
    width : "50%",
    "height" : '100%'
  },
  TicketLabel: {
    paddingLeft : "35%",
    paddingTop: 50,
    paddingBottom: 10,
    color: '#4d68bc',
    fontSize: 25,
    fontWeight: '700',
  },
  TicketSubLabel: {
    paddingLeft : "10%",
    paddingTop : 50,
    color: '#4d68bc',
  },  
  TicketButton: {
    marginTop: 60,
    marginLeft : '40%',
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: '#4d68bc',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
});