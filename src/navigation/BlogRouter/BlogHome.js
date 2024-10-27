import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../../components/Home';

const BlogRouter = createStackNavigator();

const BlogHome = () => {
  return (
    <BlogRouter.Navigator>
      <BlogRouter.Screen name="Home" component={Home} />
    </BlogRouter.Navigator>
  );
};

export default BlogHome;
