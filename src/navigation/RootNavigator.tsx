import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard';
import ConversionScreen from '../screens/ConversionScreen';
import SearchScreen from '../components/SearchScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="Conversion"
        component={ConversionScreen}
        options={{
          headerShown: true,
          title: 'Currency Converter',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="searchCurrency"
        component={SearchScreen}
        options={{
          headerShown: false,
          title: 'Search currency',
          presentation: 'containedModal',
          animation: 'slide_from_bottom',
          statusBarColor: '#00000095',
          statusBarStyle: 'light',
          statusBarAnimation: 'slide',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
