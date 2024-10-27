import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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

const Signup = ({navigation}) => {
  // State management
  const [loading, setLoading] = useState(false);
  const name = useSelector(state => state.auth.name);
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const nameHandler = name => {
    actions.updateName(name);
  };
  const emailHandler = email => {
    actions.updateEmail(email);
  };
  const passwordHandler = password => {
    actions.updatePassword(password);
  };
  // Api calls
  const createAccount = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        actions.updateName(name);
        actions.updateEmail(email);
        showMessage({
          message: `${name} Welcome to Blogger`,
          description: 'Onboarding You.....',
          type: 'default',
          icon: 'success',
          position: 'top',
          duration: 5000,
        });
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      } else {
        showMessage({
          message: data.message,
          description: 'Facing issues in signing you up',
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
        });
      }
    } catch (error) {
      showMessage({
        message: `Server is facing some issues !`,
        description: error,
        type: 'error',
        icon: 'error',
        position: 'top',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={nameHandler}
          placeholderTextColor="black"
        />
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
            createAccount(name, email, password);
          }}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    paddingHorizontal: wp('5%'),
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
    padding: wp('6%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('4%'),
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#f0f4ff',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('3%'),
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black',
  },
  button: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#5a67d8',
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  link: {
    color: '#5a67d8',
    fontSize: wp('4%'),
    marginTop: hp('3%'),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Signup;
