import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from './api';

export default function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    if (!email || !pass) {
      return Alert.alert("Thông báo", "Vui lòng nhập email và mật khẩu");
    }

    try {
      const response = await loginUser(email, pass);

      if (response.message === "Login successful") {
        // Prepare user object (API returns message and name)
        const user = { 
          email: email, 
          name: response.name || email.split('@')[0] 
        };
        onLoginSuccess(user); 
      } else {
        Alert.alert("Lỗi", response.detail || "Sai email hoặc mật khẩu");
      }
    } catch (e) {
      Alert.alert("Lỗi", "Không thể kết nối với máy chủ: " + e.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 25, justifyContent: 'center' }}>
      <View>
        <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>LOGIN</Text>
        
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>Email:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 48, paddingHorizontal: 15, borderColor: '#ddd', borderRadius: 4, marginBottom: 15 }} 
          placeholder="test@gmail.com"
          onChangeText={setEmail} 
        />

        <Text style={{ fontWeight: '500', marginTop: 15, marginBottom: 5 }}>Mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 48, paddingHorizontal: 15, borderColor: '#ddd', borderRadius: 4 }} 
          placeholder="********"
          onChangeText={setPass} 
        />

        <TouchableOpacity 
          onPress={handleLogin} 
          style={{ backgroundColor: '#007bff', height: 50, marginTop: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}
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