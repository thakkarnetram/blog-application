import {Image, Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BlogHome from '../BlogRouter/BlogHome';

const BottomRoute = createBottomTabNavigator();

const BottomRouter = () => {
  return (
    <BottomRoute.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <BottomRoute.Screen
        name="Blog"
        component={BlogHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/icon_home.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#5a67d8' : '#b0b3c7'},
                ]}
              />
              <Text
                style={[
                  styles.iconLabel,
                  {color: focused ? '#5a67d8' : '#b0b3c7'},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <BottomRoute.Screen
        name="Screen2"
        component={BlogHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/icon_blog.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#5a67d8' : '#b0b3c7'},
                ]}
              />
              <Text
                style={[
                  styles.iconLabel,
                  {color: focused ? '#5a67d8' : '#b0b3c7'},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <BottomRoute.Screen
        name="s3"
        component={BlogHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/icon_stats.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#5a67d8' : '#b0b3c7'},
                ]}
              />
              <Text
                style={[
                  styles.iconLabel,
                  {color: focused ? '#5a67d8' : '#b0b3c7'},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <BottomRoute.Screen
        name="s4"
        component={BlogHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/icon_trends.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#5a67d8' : '#b0b3c7'},
                ]}
              />
              <Text
                style={[
                  styles.iconLabel,
                  {color: focused ? '#5a67d8' : '#b0b3c7'},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
    </BottomRoute.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 5,
    height: 60,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default BottomRouter;
