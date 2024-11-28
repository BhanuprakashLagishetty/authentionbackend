import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WellnessScreen from './wellness';
import ProfileScreen from './profile';
import NutritionScreen from './fooddata';
import LoginScreen from '../login';
import HealthCheckTab from "./healthcheck";
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#007bff', // Active icon color
        tabBarInactiveTintColor: '#888', // Inactive icon color
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Wellness" 
        component={WellnessScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Food Data" 
        component={NutritionScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" size={26} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Health Connect" 
        component={HealthCheckTab} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" size={26} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: 0,
    elevation: 5, // Add shadow on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 5, // Add space below the label
  },
});
