import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Modal,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();

  // State for greeting, campaigns, and modal visibility
  const [greeting, setGreeting] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ title: '', description: '', status: 'Approval is Pending' });

  // Sample data for past donations
  const pastDonations = [
    { id: 1, item: 'Winter Jacket', date: '2023-10-15', imageUri: 'https://example.com/jacket.png' },
  ];

  // Update greeting based on the time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening'
    );
  }, []);

  // Handle adding a new campaign
  const handleAddCampaign = () => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
    setNewCampaign({ title: '', description: '', status: 'Approval is Pending' });
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <ScrollView style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
        {/* Header with greeting and user management */}
        <View style={styles.header}>
          <Text style={[styles.greeting, isDarkMode ? styles.darkText : styles.lightText]}>{greeting} Aman 👋</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* User Management Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('UserManagement')} style={styles.iconContainer}>
              <Icon name="person-outline" size={24} color={isDarkMode ? '#fff' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://example.com/profile-pic.png' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.subheading, isDarkMode ? styles.darkText : styles.lightText]}>What do you wanna donate today?</Text>

        {/* Search bar */}
        <View style={[styles.searchContainer, isDarkMode ? styles.darkSearch : styles.lightSearch]}>
          <Icon name="search-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
          <TextInput
            placeholder="Search here"
            placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            style={[styles.searchInput, isDarkMode ? styles.darkText : styles.lightText]}
          />
          <Icon name="options-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
        </View>

        {/* Campaign Banner */}
        <View style={[styles.campaignBanner, isDarkMode ? styles.darkBanner : styles.lightBanner]}>
          <Text style={[styles.bannerText, isDarkMode ? styles.darkText : styles.lightText]}>Do you really have a creative idea?</Text>
          <TouchableOpacity
            style={[styles.startCampaignButton, isDarkMode ? styles.darkButton : styles.lightButton]}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.startCampaignText}>Start Campaign</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Categories</Text>
        <View style={styles.categoryContainer}>
          <CategoryIcon icon="apps-outline" label="Escrow" onPress={() => navigation.navigate('EscrowPage')}  // Navigate to Escrow 
           isDarkMode={isDarkMode} 
           />
          <CategoryIcon
            icon="megaphone-outline"
            label="Campaign"
            onPress={() => navigation.navigate('Campaign')}
            isDarkMode={isDarkMode}
          />
          <CategoryIcon
            icon="gift-outline"
            label="Donate Goods"
            onPress={() => navigation.navigate("Donate Goods")}
            isDarkMode={isDarkMode}
          />
          <CategoryIcon icon="heart-outline" label="Charity" onPress={() => navigation.navigate('CharityPage')}
           isDarkMode={isDarkMode} />
        </View>

        {/* Past Donations Section */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Past Donations</Text>
        {pastDonations.map((donation) => (
          <View key={donation.id} style={[styles.donationCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <Image source={{ uri: donation.imageUri }} style={styles.donationImage} />
            <View style={styles.donationTextContainer}>
              <Text style={[styles.donationItemName, isDarkMode ? styles.darkText : styles.lightText]}>{donation.item}</Text>
              <Text style={[styles.donationDate, isDarkMode ? styles.darkText : styles.lightText]}>{donation.date}</Text>
            </View>
          </View>
        ))}

        {/* Campaigns Section */}
        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Campaigns</Text>
        <View style={styles.campaignsContainer}>
          {campaigns.map((campaign) => (
            <View key={campaign.id} style={[styles.campaignCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
              <Text style={[styles.campaignTitle, isDarkMode ? styles.darkText : styles.lightText]}>{campaign.title}</Text>
              <Text style={[styles.campaignDescription, isDarkMode ? styles.darkText : styles.lightText]}>{campaign.description}</Text>
              <Text style={styles.statusText}>Status: {campaign.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Campaign Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Campaign</Text>
            <TextInput
              placeholder="Campaign Title"
              value={newCampaign.title}
              onChangeText={(text) => setNewCampaign({ ...newCampaign, title: text })}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Campaign Description"
              value={newCampaign.description}
              onChangeText={(text) => setNewCampaign({ ...newCampaign, description: text })}
              style={[styles.modalInput, styles.modalTextArea]}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAddCampaign}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CategoryIcon = ({ icon, label, onPress, isDarkMode }) => (
  <View style={styles.categoryIconContainer}>
    <TouchableOpacity style={[styles.categoryIcon, isDarkMode ? styles.darkCard : styles.lightCard]} onPress={onPress}>
      <Icon name={icon} size={28} color="#039BE5" />
    </TouchableOpacity>
    <Text style={[styles.categoryLabel, isDarkMode ? styles.darkText : styles.lightText]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  darkMode: {
    backgroundColor: '#000',
  },
  lightMode: {
    backgroundColor: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  darkSearch: {
    backgroundColor: '#333',
    borderColor: '#555',
    borderWidth: 1,
  },
  lightSearch: {
    backgroundColor: '#f1f1f1',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  campaignBanner: {
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  darkBanner: {
    backgroundColor: '#333',
  },
  lightBanner: {
    backgroundColor: '#e0f7fa',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  startCampaignButton: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  darkButton: {
    backgroundColor: '#388E3C',
  },
  lightButton: {
    backgroundColor: '#4CAF50',
  },
  startCampaignText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryIconContainer: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  darkCard: {
    backgroundColor: '#555',
  },
  lightCard: {
    backgroundColor: '#e1f5fe',
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 14,
  },
  donationCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  donationImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  donationTextContainer: {
    flex: 1,
  },
  donationItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  donationDate: {
    fontSize: 14,
  },
  campaignsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  campaignCard: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campaignDescription: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
