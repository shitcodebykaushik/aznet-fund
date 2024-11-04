import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const DonateGoodsPage = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
        quality: 1,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setItemImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donate Goods</Text>
      <Text style={styles.subtitle}>List the items you wish to donate to those in need</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter a brief description of the item"
          value={itemDescription}
          onChangeText={setItemDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item category (e.g., Clothing, Electronics)"
          value={itemCategory}
          onChangeText={setItemCategory}
        />
      </View>

      <View style={styles.imagePickerContainer}>
        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Icon name="camera-outline" size={24} color="#666" />
          <Text style={styles.imagePickerText}>Choose Photo</Text>
        </TouchableOpacity>
        {itemImage && <Image source={{ uri: itemImage }} style={styles.itemImage} />}
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Donation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    borderRadius: 10,
    padding: 10,
  },
  imagePickerText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DonateGoodsPage;
