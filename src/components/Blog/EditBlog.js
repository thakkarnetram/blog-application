import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SERVER_URL} from '../../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

const EditBlog = ({route, navigation}) => {
  const {blogId, blogData, token} = route.params;
  const [title, setTitle] = useState(blogData.blogTitle);
  const [description, setDescription] = useState(blogData.blogDescription);
  const [loading, setLoading] = useState(false);

  const handleEditBlog = async () => {
    setLoading(true);
    console.log(token);
    try {
      const response = await fetch(`${SERVER_URL}/blogs/update/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogTitle: title,
          blogDescription: description,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Blog updated successfully!',
        });
        navigation.goBack();
      } else if (response.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: ` ${data.message} `,
        });
      } else {
        console.log(response);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: ` Failed to update blog. Please try again.`,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while updating the blog.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Blog Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter blog title"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Blog Description</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter blog description"
        multiline
        numberOfLines={4}
        placeholderTextColor="#888"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6A42F5" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEditBlog}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
      <Toast ref={Toast.setRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#F5F6FA',
  },
  label: {
    fontSize: wp('4%'),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: hp('1.5%'),
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    color: '#888',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: hp('1.5%'),
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    textAlignVertical: 'top',
    color: '#888',
  },
  button: {
    backgroundColor: '#6A42F5',
    padding: hp('2%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default EditBlog;
