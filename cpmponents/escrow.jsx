import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

// Set your base URL here, depending on your setup:
const BASE_URL = 'http://10.0.2.2:8082'; // Android Emulator
// For iOS Simulator or actual device, you can use http://localhost:8082 if it's accessible

const EscrowPage = () => {
  const [payer, setPayer] = useState('');
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to create an escrow
  const submitEscrow = async () => {
    if (!payer || !payee || !amount) {
      Alert.alert('Missing Information', 'Please fill out all fields.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payer, payee, amount: parseFloat(amount) }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Escrow transaction has been created.');
      } else {
        Alert.alert('Error', 'Failed to create escrow.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to approve escrow as either payer or payee
  const approveEscrow = async (role) => {
    const endpoint = role === 'payer' ? '/approve/payer' : '/approve/payee';

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
      });

      if (response.ok) {
        Alert.alert('Approval', `${role.charAt(0).toUpperCase() + role.slice(1)} has approved the escrow.`);
      } else {
        Alert.alert('Error', 'Failed to approve escrow.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    }
  };

  // Function to cancel escrow
  const cancelEscrow = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cancel`, {
        method: 'POST',
      });

      if (response.ok) {
        Alert.alert('Cancellation', 'The escrow transaction has been canceled.');
      } else {
        Alert.alert('Error', 'Failed to cancel escrow.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escrow Transaction</Text>
      <Text style={styles.subtitle}>Fill in the details to initiate an escrow transaction.</Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payer's Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., John Doe"
            placeholderTextColor="#999"
            value={payer}
            onChangeText={setPayer}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payee's Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Jane Smith"
            placeholderTextColor="#999"
            value={payee}
            onChangeText={setPayee}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#999"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Submit Escrow */}
        <TouchableOpacity style={styles.submitButton} onPress={submitEscrow} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Create Escrow</Text>
          )}
        </TouchableOpacity>

        {/* Approve and Cancel Buttons */}
        <TouchableOpacity style={styles.approveButton} onPress={() => approveEscrow('payer')}>
          <Text style={styles.approveButtonText}>Approve as Payer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.approveButton} onPress={() => approveEscrow('payee')}>
          <Text style={styles.approveButtonText}>Approve as Payee</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={cancelEscrow}>
          <Text style={styles.cancelButtonText}>Cancel Escrow</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  approveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EscrowPage;