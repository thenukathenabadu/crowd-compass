import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DiscoverStackParamList } from '../navigation/DiscoverStack';
import { Colors } from '../constants/colors';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'PlaceDetail'>;

export default function PlaceDetailScreen({ route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{route.params.name}</Text>
      <Text style={styles.subtitle}>Energy history — Phase 6</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
  },
});
