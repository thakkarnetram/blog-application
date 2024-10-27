import {Image, Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BlogHome from '../BlogRouter/BlogHome';

const BottomRouter = createBottomTabNavigator();

const BottomRoute = () => {
  return (
    <BottomRouter.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <BottomRouter.Screen
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
    </BottomRouter.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: hp('10%'),
    backgroundColor: '#ffffff',
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp('7%'),
    height: hp('4%'),
    resizeMode: 'contain',
    marginBottom: hp('0.5%'),
  },
  iconLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
});

export default BottomRoute;
