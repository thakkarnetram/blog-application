import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Router = createStackNavigator();

// Components
import Home from '../../components/Blog/Home';
import ViewBlog from '../../components/Blog/ViewBlog';
import AddBlog from '../../components/Blog/AddBlog';
import EditBlog from '../../components/Blog/EditBlog';

const BlogHome = () => {
  return (
    <Router.Navigator>
      <Router.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: ({navigation}) => (
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <TouchableOpacity>
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
                <TouchableOpacity onPress={() => console.log('Search pressed')}>
                  <Icon name="search" size={24} color="#6A42F5" />
                </TouchableOpacity>
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
        }}
      />
      <Router.Screen
        name="ViewBlog"
        component={ViewBlog}
        options={{
          headerShown: true,
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
                <TouchableOpacity onPress={() => console.log('Search pressed')}>
                  <Icon name="search" size={24} color="#6A42F5" />
                </TouchableOpacity>
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
        }}
      />
      <Router.Screen
        name="AddBlog"
        component={AddBlog}
        options={{
          headerShown: true,
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
                <TouchableOpacity onPress={() => console.log('Search pressed')}>
                  <Icon name="search" size={24} color="#6A42F5" />
                </TouchableOpacity>
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
        }}
      />
      <Router.Screen
        name="EditBlog"
        component={EditBlog}
        options={{
          headerShown: true,
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
                <TouchableOpacity onPress={() => console.log('Search pressed')}>
                  <Icon name="search" size={24} color="#6A42F5" />
                </TouchableOpacity>
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
        }}
      />
    </Router.Navigator>
  );
};

const styles = StyleSheet.create({
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

export default BlogHome;
