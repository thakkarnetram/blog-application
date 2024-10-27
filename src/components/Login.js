import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SERVER_URL} from '../../constants';
import {actionCreators} from '../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  // State Management
  const [loading, setLoading] = useState(false);
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const emailHandler = email => {
    actions.updateEmail(email);
  };
  const passwordHandler = password => {
    actions.updatePassword(password);
  };
  // Login func
  const loginUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        showMessage({
          message: 'Login successful!',
          description: 'Welcome back!',
          type: 'success',
          icon: 'success',
          position: 'top',
          duration: 3000,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomStack'}],
          }),
        );
      } else {
        showMessage({
          message: 'Login failed',
          description: data.message,
          type: 'danger',
          icon: 'danger',
          position: 'top',
          duration: 3000,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Network error',
        description: 'Please try again later.',
        type: 'danger',
        icon: 'danger',
        position: 'top',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={emailHandler}
        keyboardType="email-address"
        placeholderTextColor="black"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={passwordHandler}
        secureTextEntry
        placeholderTextColor="black"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    backgroundColor: '#f8f9fc',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('3%'),
  },
  input: {
    width: '100%',
    height: hp('6%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black',
  },
  button: {
    width: '100%',
    height: hp('6%'),
    backgroundColor: '#5a67d8',
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  link: {
    color: '#5a67d8',
    fontSize: wp('4%'),
    marginTop: hp('2%'),
  },
});

export default Login;
