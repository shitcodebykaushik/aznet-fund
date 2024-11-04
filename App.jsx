import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import SignupScreen from './cpmponents/Sign';
import LoginScreen from './cpmponents/Login';
import HomeScreen from './cpmponents/Home';
import CampaignPage from './cpmponents/campaign';
import DonatePage from './cpmponents/donate';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Campaign" component={CampaignPage} />
        <Stack.Screen name="Donate Goods" component={DonatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
