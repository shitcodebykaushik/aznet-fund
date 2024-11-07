import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import SignupScreen from './cpmponents/Sign';
import LoginScreen from './cpmponents/Login';
import HomeScreen from './cpmponents/Home';
import CampaignPage from './cpmponents/campaign';
import DonatePage from './cpmponents/donate';
import EscrowPage from './cpmponents/escrow';
import CharityPage from './cpmponents/charity';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Signup and Login
function AuthNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Stack Navigator for Home and Category Screens
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Campaign" component={CampaignPage} />
      <Stack.Screen name="Donate Goods" component={DonatePage} />
      <Stack.Screen name="EscrowPage" component={EscrowPage} />
      <Stack.Screen name="CharityPage" component={CharityPage} />
    </Stack.Navigator>
  );
}

// Tab Navigator with only Home Tab
function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn} />}
    </NavigationContainer>
  );
}
