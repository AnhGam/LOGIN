import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Profile({ user, onBack }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Top Header */}
      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{user?.name || 'Huy'}!</Text>
        <View style={{ width: 60, height: 60, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>🖼️</Text>
        </View>
      </View>

      {/* Form nhập liệu */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16 }}>Name</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 45, padding: 10, marginTop: 5 }} 
          value={user?.name || 'Huy'} 
        />

        <Text style={{ fontSize: 16, marginTop: 15 }}>Email</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 45, padding: 10, marginTop: 5, backgroundColor: '#eee' }} 
          editable={false}
          value={user?.email || 'test@gmail.com'} 
        />

        <Text style={{ fontSize: 16, marginTop: 15 }}>Address</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 45, padding: 10, marginTop: 5 }} 
          placeholder="Your Address" 
        />

        <Text style={{ fontSize: 16, marginTop: 15 }}>Avatar URL</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 45, padding: 10, marginTop: 5 }} 
          placeholder="https://example.com/photo.jpg" 
        />

        <Text style={{ fontSize: 16, marginTop: 15 }}>Description</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 100, padding: 10, marginTop: 5, textAlignVertical: 'top' }} 
          multiline
          placeholder="Tell us about yourself..." 
        />

        <TouchableOpacity 
          style={{ borderWidth: 1, width: 150, height: 50, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={{ marginTop: 20 }}>
          <Text style={{ color: '#007bff' }}>Trở về Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
