import { StyleSheet, Text, View, Pressable, Image, ScrollView, KeyboardAvoidingView, Alert, Button } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../../../contexts/UserContext';
import InputPassword from '../../../components/InputPassword';
import InputText from '../../../components/InputText';
import Spinner from 'react-native-loading-spinner-overlay';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const Login = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('chao1@gmail.com')
  const [password, setPassword] = useState('1')
  const { onLogin } = useContext(UserContext);

  const onLoginPress = async () => {
    setIsLoading(true);
    const result = await onLogin(email, password);
    setIsLoading(false);
    if (!result) {
      Alert.alert('Login failed');
    }
  }
  useEffect(() => {
    GoogleSignin.configure();
  }, [])

  const signInGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('google login userInfo:', userInfo)
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('SIGN_IN_CANCELLED')
          // sign in was cancelled
          break;
        case statusCodes.IN_PROGRESS:
          console.log('IN_PROGRESS')
          // operation (e.g. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('PLAY_SERVICES_NOT_AVAILABLE')
          // android only
          break;
        default:
          // some other error happened
          console.error('signInGoogle', error);
      }
    }
  })


  return (
    <KeyboardAvoidingView style={loginstyles.body}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <ScrollView>
        <View>
          <Text style={loginstyles.hello}>Hello</Text>
          <Text style={loginstyles.again}>Again! </Text>
          <Text style={loginstyles.welcom}>Welcome back you’ve been missed</Text>

          <View style={loginstyles.usernameContainer}>
            <Text style={loginstyles.usernameLabel}>Email*</Text>
            <InputText
              value={email}
              keyboardType='email-address'
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={loginstyles.passwordContainer}>
            <Text style={loginstyles.passwordLabel}>Password*</Text>
            <InputPassword
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Pressable
            onPress={onLoginPress}
            style={loginstyles.buttonLoginContainer}>
            <Text style={loginstyles.buttonLoginLabel}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={loginstyles.buttonLoginContainer}>
            <Text style={loginstyles.buttonLoginLabel}>Register</Text>
          </Pressable>

          <Text style={loginstyles.textContinue}>or continue with</Text>

          <View style={loginstyles.loginWithFaceBookOrGoogle}>

            <View style={loginstyles.loginFaceBookContainer}>
              <Pressable style={loginstyles.buttonLoginFaceBook}>
                <Image source={require('../../../assets/images/f.png')}></Image>
                <Text style={loginstyles.loginFaceBookLabel}>Facebook</Text>
              </Pressable>
            </View>

            <View style={loginstyles.loginGoogleContainer}>
              <Pressable style={loginstyles.buttonLoginGoogle} onPress={signInGoogle}>
                <Image source={require('../../../assets/images/G.png')}></Image>
                <Text style={loginstyles.loginGoogleLabel}>Google</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const loginstyles = StyleSheet.create({
  loginWithFaceBookOrGoogle: {
    flexDirection: 'row',
    with: '100%',
    marginTop: 24,
    justifyContent: 'space-between'
  },
  loginGoogleContainer: {
    position: 'relative'
  },
  loginGoogleLabel: {
    color: '#667080',
    lineHeight: 24,
    letterSpacing: 0.12,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  buttonLoginGoogle: {
    marginTop: 24,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#EEF1F4',
    height: 48,
    width: 160,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,

  },
  loginFaceBookContainer: {
    justifyContent: 'space-between'
  },
  loginFaceBookLabel: {
    color: '#667080',
    lineHeight: 24,
    letterSpacing: 0.12,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  buttonLoginFaceBook: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#EEF1F4',
    height: 48,
    width: 160,
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 24,

  },
  buttonLoginLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  buttonLoginContainer: {
    marginTop: 24,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#1877F2',
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  textContinue: {
    marginTop: 16,
    textAlign: 'center'
  },
  passwordLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
  },
  passwordContainer: {
    marginTop: 16
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12
  },
  paswordInput: {
    padding: 10,
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: '#4E4B66',
    borderWidth: 1
  },
  usernameInput: {
    padding: 10,
    width: '100%',
    height: 48,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: '#4E4B66',
    borderWidth: 1
  },
  usernameLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,

  },
  usernameContainer: {
    marginTop: 48,
  },
  hello: {
    fontSize: 48,
    lineHeight: 72,
    fontWeight: '700',
    letterSpacing: 0.12,
    color: '#050505'
  },
  welcom: {
    width: 222,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginTop: 4,
  },
  again: {
    fontSize: 48,
    letterSpacing: 0.12,
    lineHeight: 72,
    fontWeight: '700',
    color: '#1877F2',
    width: 222
  },
  body: {
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  }
})