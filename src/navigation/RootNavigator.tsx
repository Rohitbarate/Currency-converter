import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard';
import ConversionScreen from '../screens/ConversionScreen';
import SearchScreen from '../components/SearchScreen';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen name="searchCurrency" component={SearchScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
