import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SERVER_URL} from '../../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddBlog = ({route, navigation}) => {
  const {token} = route.params;
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddBlog = async () => {
    if (!blogTitle || !blogDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/blogs/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogTitle,
          blogDescription,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Blog added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to add the blog');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while adding the blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Blog</Text>
      <TextInput
        style={styles.input}
        value={blogTitle}
        onChangeText={setBlogTitle}
        placeholder="Blog Title"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={blogDescription}
        onChangeText={setBlogDescription}
        placeholder="Blog Description"
        placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddBlog}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#F5F6FA',
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#6A42F5',
    marginBottom: hp('3%'),
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: wp('3%'),
    fontSize: wp('4%'),
    color: '#333',
    marginBottom: hp('2%'),
  },
  descriptionInput: {
    height: hp('20%'),
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6A42F5',
    padding: wp('4%'),
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default AddBlog;
