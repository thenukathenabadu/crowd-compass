import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import RadarScreen from '../screens/RadarScreen';
import MapScreen from '../screens/MapScreen';
import DiscoverStack from './DiscoverStack';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.tabBackground,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: Colors.tabActive,
          tabBarInactiveTintColor: Colors.tabInactive,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === 'Radar') {
              iconName = focused ? 'radio' : 'radio-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else {
              iconName = focused ? 'search' : 'search-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Radar" component={RadarScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Discover" component={DiscoverStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
