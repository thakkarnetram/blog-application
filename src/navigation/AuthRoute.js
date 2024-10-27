import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../components/Login';

const AuthStack = createStackNavigator();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
