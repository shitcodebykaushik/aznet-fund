import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const CampaignPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Campaign Image */}
      <Image
        source={{ uri: 'https://example.com/campaign-image.jpg' }}
        style={styles.campaignImage}
      />

      <View style={styles.contentContainer}>
        {/* Campaign Title */}
        <Text style={styles.campaignTitle}>Support Education for All</Text>

        {/* Campaign Description */}
        <Text style={styles.campaignDescription}>
          Help provide essential resources to underprivileged children to ensure they have access to
          quality education. Your support can make a big difference in their lives.
        </Text>

        {/* Progress Bar Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Raised: $5,000 of $10,000</Text>
          <ProgressBar progress={0.5} color="#4CAF50" style={styles.progressBar} />
        </View>

        {/* Donate Button */}
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>

        {/* About Section */}
        <Text style={styles.sectionTitle}>About this Campaign</Text>
        <Text style={styles.sectionContent}>
          This campaign aims to raise funds for educational supplies, school fees, and support
          programs that directly impact children's lives in underserved communities. Every donation
          brings us closer to creating a world where education is accessible to all.
        </Text>

        {/* Organizer Section */}
        <Text style={styles.sectionTitle}>Organizer</Text>
        <Text style={styles.sectionContent}>Aman Kumar</Text>

        {/* Location Section */}
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.sectionContent}>Law Gate, Punjab</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  campaignImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  campaignDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 20,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default CampaignPage;
