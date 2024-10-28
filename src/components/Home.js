import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SERVER_URL} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Home = ({navigation}) => {
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
          await fetchBlogData(jwt);
        }
      };
      fetchData();
    }, []),
  );

  const fetchBlogData = async jwt => {
    try {
      const response = await fetch(`${SERVER_URL}/blogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderBlogItem = ({item}) => {
    const localDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ViewBlog', {blogId: item._id, token})
        }>
        <View style={styles.content}>
          <Text style={styles.title}>{item.blogTitle}</Text>
          <Text style={styles.description}>{item.blogDescription}</Text>
          <View style={styles.footer}>
            <Text style={styles.date}>{localDate}</Text>
            <Text style={styles.date}>Author : {item.user}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blogs</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => console.log('Add new')}>
            <Text style={styles.addNew}>Add new</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Preview')}>
            <Text style={styles.previewButton}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6A42F5" style={styles.loader} />
      ) : (
        <FlatList
          data={blogs}
          renderItem={renderBlogItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      )}
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addNew: {
    color: '#6A42F5',
    fontSize: 16,
    marginRight: 10,
  },
  previewButton: {
    color: '#FFF',
    backgroundColor: '#6A42F5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
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

export default Home;
