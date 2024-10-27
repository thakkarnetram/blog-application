import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../../components/Home';

const Router = createStackNavigator();

const BlogHome = () => {
  return (
    <Router.Navigator options={{headerShown: false}}>
      <Router.Screen
        name="Home"
        component={Home}
        screenOptions={{headerShown: false}}
      />
    </Router.Navigator>
  );
};

export default BlogHome;
