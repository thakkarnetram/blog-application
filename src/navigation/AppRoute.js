import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomRoute from './BottomRouter/BottomRouter';

const AppStack = createStackNavigator();

const AppRoute = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="BottomStack"
        component={BottomRoute}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppRoute;
