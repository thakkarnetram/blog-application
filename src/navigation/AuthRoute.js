import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import BottomRouter from './BottomRouter/BottomRouter';

const AuthStack = createStackNavigator();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator options={{headerShown: false}}>
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="BottomStack"
        component={BottomRouter}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
