import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SERVER_URL} from '../../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';

const ViewBlog = ({route, navigation}) => {
  const {blogId, token} = route.params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/blogs/${blogId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBlogDetail();
    }, [blogId]),
  );

  useEffect(() => {
    if (!token) return;
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/blogs/${blogId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [blogId]);

  const handleEdit = () => {
    navigation.navigate('EditBlog', {blogId, blogData: blog, token});
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#6A42F5" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blog.blogTitle}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.author}>Author - {blog.user}</Text>
        <Text style={styles.date}>
          {new Date(blog.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <ScrollView style={{marginTop: hp('2.5%')}}>
        <Text style={styles.content}>{blog.blogDescription}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#6A42F5',
    margin: wp('5%'),
  },
  author: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: wp('5%'),
  },
  date: {
    fontSize: wp('4%'),
    color: '#888',
    marginRight: wp('5%'),
  },
  content: {
    fontSize: wp('4%'),
    color: '#555',
    margin: wp('5%'),
  },
  loader: {
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#6A42F5',
    padding: hp('2%'),
    margin: wp('5%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default ViewBlog;
