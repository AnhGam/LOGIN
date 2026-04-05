import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getProfile } from './api';

export default function Profile({ user, onBack }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile(user.email);
      setProfileData(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      Alert.alert('Lỗi', 'Không thể tải thông tin cá nhân');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const displayName = profileData?.name || user?.name || 'User';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Top Header */}
      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{displayName}!</Text>
        </View>
        <View style={{ width: 60, height: 60, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: '#eee' }}>
          <Text style={{ fontSize: 30 }}>🖼️</Text>
        </View>
      </View>

      {/* Form nhập liệu */}
      <View style={{ padding: 20, paddingBottom: 50 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Họ và tên</Text>
          <TextInput 
            style={{ borderWidth: 1.5, borderColor: '#e2e8f0', height: 48, paddingHorizontal: 15, borderRadius: 12, backgroundColor: '#fff', fontSize: 16, color: '#1e293b' }} 
            value={displayName} 
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Email kết nối</Text>
          <TextInput 
            style={{ borderWidth: 1.5, borderColor: '#f1f5f9', height: 48, paddingHorizontal: 15, borderRadius: 12, backgroundColor: '#f8fafc', fontSize: 16, color: '#64748b' }} 
            editable={false}
            value={profileData?.email || user?.email} 
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Địa chỉ</Text>
          <TextInput 
            style={{ borderWidth: 1.5, borderColor: '#e2e8f0', height: 48, paddingHorizontal: 15, borderRadius: 12, backgroundColor: '#fff', fontSize: 16, color: '#1e293b' }} 
            placeholder="Nhập địa chỉ của bạn" 
            placeholderTextColor="#94a3b8"
            value={profileData?.address || ''}
          />
        </View>

        <View style={{ marginBottom: 25 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Giới thiệu bản thân</Text>
          <TextInput 
            style={{ borderWidth: 1.5, borderColor: '#e2e8f0', height: 120, padding: 15, borderRadius: 12, backgroundColor: '#fff', fontSize: 16, color: '#1e293b', textAlignVertical: 'top' }} 
            multiline
            placeholder="Hãy chia sẻ một chút về bạn..." 
            placeholderTextColor="#94a3b8"
            value={profileData?.description || ''}
          />
        </View>

        <TouchableOpacity 
          onPress={onBack}
          style={{ backgroundColor: '#60a5fa', height: 52, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#60a5fa', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
