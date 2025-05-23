import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ onMenuPress, showMenu = true, onBackPress, showBackButton = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ) : showMenu ? (
        <View style={styles.spacer} />
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.flexTitle}>
        <Text style={styles.title}>VisionHive</Text>
      </TouchableOpacity>

      {showMenu ? (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'green',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  menuButton: {
    paddingLeft: 16,
  },
  backButton: {
    paddingRight: 16,
  },
  spacer: {
    width: 24,
  },
});
