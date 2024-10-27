import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRoute from './AuthRoute';
import AppRoute from './AppRoute';

const RootStack = createStackNavigator();

const Router = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      if (jwt) setToken(jwt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <RootStack.Screen
            name="App"
            component={AppRoute}
            screenOptions={{headerShown: false}}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthRoute}
            screenOptions={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
