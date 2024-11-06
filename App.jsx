import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import SignupScreen from './cpmponents/Sign';
import LoginScreen from './cpmponents/Login';
import HomeScreen from './cpmponents/Home';
import CampaignPage from './cpmponents/campaign';
import DonatePage from './cpmponents/donate';
import EscrowPage from './cpmponents/escrow';
import CharityPage from './cpmponents/charity';

import Icon from 'react-native-vector-icons/Ionicons'; // For icons in the tab navigator

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Signup, Login, Campaign, and Donate Goods screens
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Campaign" component={CampaignPage} />
      <Stack.Screen name="Donate Goods" component={DonatePage} />
      <Stack.Screen name="EscrowPage" component={EscrowPage} />
      <Stack.Screen name="CharityPage" component={CharityPage} />
    </Stack.Navigator>
  );
}

// Tab Navigator with Home and StackNavigator
function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ellipsis-horizontal-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}
