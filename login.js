import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    if (!email || !pass) {
      return Alert.alert("Thông báo", "Vui lòng nhập email và mật khẩu");
    }

    try {
      // Lấy dữ liệu từ AsyncStorage dựa theo email
      const data = await AsyncStorage.getItem(email);
      const user = data ? JSON.parse(data) : null;

      if (user && user.password === pass) {
        onLoginSuccess(user); // Đăng nhập đúng thì vào Home
      } else {
        Alert.alert("Lỗi", "Sai email hoặc mật khẩu");
      }
    } catch (e) {
      Alert.alert("Lỗi", "Có lỗi xảy ra: " + e.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 300, padding: 25, backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>LOGIN</Text>
        
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>Email:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, borderColor: '#ccc' }} 
          placeholder="test@gmail.com"
          onChangeText={setEmail} 
        />

        <Text style={{ fontWeight: '500', marginTop: 15, marginBottom: 5 }}>Mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, borderColor: '#ccc' }} 
          placeholder="********"
          onChangeText={setPass} 
        />

        <TouchableOpacity 
          onPress={handleLogin} 
          style={{ backgroundColor: '#007bff', height: 45, marginTop: 25, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToRegister} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', color: '#007bff' }}>Chưa có tài khoản? Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}