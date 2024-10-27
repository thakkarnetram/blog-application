import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomRouter from './BottomRouter/BottomRouter';

const AppStack = createStackNavigator();

const AppRoute = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen
        name="BottomStack"
        component={BottomRouter}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppRoute;
