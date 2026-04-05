import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ activeTab, onTabPress }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
    { id: 'setting', label: 'Setting', icon: 'settings-outline', activeIcon: 'settings' },
  ];

  return (
    <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.id)}
            >
              <View style={[
                  { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 25 },
                  isActive && { backgroundColor: '#eff6ff', borderRadius: 12 }
              ]}>
                <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={24}
                    color={isActive ? '#60a5fa' : '#94a3b8'}
                />
                <Text style={[styles.label, { color: isActive ? '#60a5fa' : '#94a3b8', fontWeight: isActive ? '600' : '400', marginTop: 2 }]}>
                    {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
