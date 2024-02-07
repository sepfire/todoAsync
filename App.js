import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, createStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="Todo"
          component={DetailScreen}
          options={{
            title: 'Todo',
            headerTitle: 'Todo',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
