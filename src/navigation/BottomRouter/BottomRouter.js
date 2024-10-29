import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BlogHome from '../BlogRouter/BlogHome';
import UserBlog from '../../components/Blog/UserBlog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
        name="UserBlogs"
        component={UserBlog}
        options={{
          header: ({navigation}) => (
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={require('../../assets/images/back.png')}
                    style={styles.backLogo}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  onPress={() => console.log('Profile pressed')}
                  style={styles.profileContainer}>
                  <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
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
                My blogs
              </Text>
            </View>
          ),
        }}
      />
      {/* <BottomRoute.Screen
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
      /> */}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: wp('20%'),
    height: hp('5%'),
    marginLeft: wp('-5%'),
  },
  backLogo: {
    width: wp('3%'),
    height: hp('3%'),
    margin: wp('3%'),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A42F5',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D1C4E9',
  },
});

export default BottomRouter;
