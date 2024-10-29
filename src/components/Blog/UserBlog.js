import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {SERVER_URL} from '../../../constants';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const UserBlog = ({navigation}) => {
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      setToken(jwt);
    }
    return jwt;
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const jwt = await fetchToken();
        if (jwt) {
          await fetchUserBlogs(jwt);
        }
      };
      fetchData();
    }, []),
  );

  const fetchUserBlogs = async jwt => {
    try {
      const response = await fetch(`${SERVER_URL}/blogs/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async blogId => {
    try {
      const response = await fetch(`${SERVER_URL}/blogs/delete/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        showToast('Success', 'Blog deleted successfully.', 'success');
      } else {
        console.log(response);
        showToast('Error', 'Failed to delete blog.');
      }
    } catch (error) {
      console.log(error);
      showToast('Error', 'An error occurred while deleting the blog.', 'error');
    }
  };

  const showToast = (title, message, type) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const confirmDelete = blogId => {
    console.log(blogId);
    deleteBlog(blogId);
  };

  const renderBlogItem = ({item}) => {
    const localDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ViewBlog', {blogId: item._id, token})
        }
        onLongPress={() => confirmDelete(item._id)}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.blogTitle}</Text>
          <Text style={styles.description}>{item.blogDescription}</Text>
          <View style={styles.footer}>
            <Text style={styles.date}>{localDate}</Text>
            <Text style={styles.date}>Author: {item.user}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Blogs</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBlog', {token})}>
          <Text style={styles.addNew}>Add new</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6A42F5" style={styles.loader} />
      ) : (
        <FlatList
          data={blogs}
          renderItem={renderBlogItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
      )}
      <Toast ref={Toast.setRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#6A42F5',
    margin: wp('5%'),
  },
  addNew: {
    color: '#6A42F5',
    fontSize: wp('4.5%'),
    marginRight: hp('3%'),
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: hp('3%'),
    margin: wp('2.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6A42F5',
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#555',
    marginTop: hp('1.5%'),
  },
  footer: {
    flexDirection: 'flex-end',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: wp('3%'),
    color: '#888',
    marginTop: hp('1.5%'),
  },
});

export default UserBlog;
