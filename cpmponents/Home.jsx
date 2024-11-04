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
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();

  // State for greeting and notifications
  const [greeting, setGreeting] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Sample data for past donations
  const pastDonations = [
    { id: 1, item: 'Winter Jacket', date: '2023-10-15', imageUri: 'https://example.com/jacket.png' },
    { id: 2, item: 'Textbooks', date: '2023-09-22', imageUri: 'https://example.com/textbooks.png' },
    { id: 3, item: 'Laptop', date: '2023-08-10', imageUri: 'https://example.com/laptop.png' },
  ];

  // Update greeting based on the time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening'
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea(isDarkMode)}>
      <ScrollView style={styles.container(isDarkMode)}>
        {/* Header with greeting and notifications */}
        <View style={styles.header}>
          <Text style={styles.greeting(isDarkMode)}>{greeting}, Lisa 👋</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.notificationIconContainer}>
              <Icon name="notifications-outline" style={styles.notificationIcon(isDarkMode)} />
              {unreadNotifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{unreadNotifications}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://example.com/profile-pic.png' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subheading(isDarkMode)}>What do you wanna donate today?</Text>

        {/* Search bar */}
        <View style={styles.searchContainer(isDarkMode)}>
          <Icon name="search-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
          <TextInput
            placeholder="Search here"
            placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            style={styles.searchInput(isDarkMode)}
          />
          <Icon name="options-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
        </View>

        {/* Campaign Banner */}
        <View style={styles.campaignBanner(isDarkMode)}>
          <Text style={styles.bannerText(isDarkMode)}>Do you really have a creative idea?</Text>
          <TouchableOpacity style={styles.startCampaignButton(isDarkMode)}>
            <Text style={styles.startCampaignText}>Start Campaign</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={styles.sectionTitle(isDarkMode)}>Categories</Text>
        <View style={styles.categoryContainer}>
          <CategoryIcon icon="apps-outline" label="All" onPress={() => {}} isDarkMode={isDarkMode} />
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
          <CategoryIcon icon="heart-outline" label="Charity" onPress={() => {}} isDarkMode={isDarkMode} />
        </View>

        {/* Past Donations Section */}
        <Text style={styles.sectionTitle(isDarkMode)}>Past Donations</Text>
        {pastDonations.map((donation) => (
          <View key={donation.id} style={styles.donationCard(isDarkMode)}>
            <Image source={{ uri: donation.imageUri }} style={styles.donationImage} />
            <View style={styles.donationTextContainer}>
              <Text style={styles.donationItemName(isDarkMode)}>{donation.item}</Text>
              <Text style={styles.donationDate(isDarkMode)}>{donation.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoryIcon = ({ icon, label, onPress, isDarkMode }) => (
  <View style={styles.categoryIconContainer}>
    <TouchableOpacity style={styles.categoryIcon(isDarkMode)} onPress={onPress}>
      <Icon name={icon} size={28} color="#039BE5" />
    </TouchableOpacity>
    <Text style={styles.categoryLabel(isDarkMode)}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: (isDarkMode) => ({
    flex: 1,
    backgroundColor: isDarkMode ? '#000' : '#fff',
  }),
  container: (isDarkMode) => ({
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: isDarkMode ? '#000' : '#fff',
  }),
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  greeting: (isDarkMode) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  }),
  notificationIconContainer: {
    position: 'relative',
  },
  notificationIcon: (isDarkMode) => ({
    fontSize: 24,
    color: isDarkMode ? '#fff' : '#333',
  }),
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3D00',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subheading: (isDarkMode) => ({
    fontSize: 16,
    color: isDarkMode ? '#ccc' : '#333',
    marginBottom: 15,
  }),
  searchContainer: (isDarkMode) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#333' : '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: isDarkMode ? '#555' : '#ccc',
    borderWidth: 1,
  }),
  searchInput: (isDarkMode) => ({
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#333',
  }),
  campaignBanner: (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#333' : '#e0f7fa',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  }),
  bannerText: (isDarkMode) => ({
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#333',
  }),
  startCampaignButton: (isDarkMode) => ({
    marginTop: 10,
    backgroundColor: isDarkMode ? '#388E3C' : '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }),
  startCampaignText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: (isDarkMode) => ({
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDarkMode ? '#fff' : '#333',
  }),
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryIconContainer: {
    alignItems: 'center',
  },
  categoryIcon: (isDarkMode) => ({
    width: 60,
    height: 60,
    backgroundColor: isDarkMode ? '#555' : '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
  categoryLabel: (isDarkMode) => ({
    marginTop: 5,
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#333',
  }),
  donationCard: (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#333' : '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  donationImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  donationTextContainer: {
    flex: 1,
  },
  donationItemName: (isDarkMode) => ({
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  }),
  donationDate: (isDarkMode) => ({
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#777',
  }),
});

export default HomeScreen;
