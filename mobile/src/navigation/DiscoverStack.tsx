import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import DiscoverScreen from '../screens/DiscoverScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

export type DiscoverStackParamList = {
  DiscoverList: undefined;
  PlaceDetail: { place_id: string; name: string };
};

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export default function DiscoverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgPrimary },
      }}
    >
      <Stack.Screen name="DiscoverList" component={DiscoverScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
}
