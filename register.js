import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from './api';

export default function Register({ onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Lỗi", "Vui lòng điền đủ thông tin");
    }
    if (password !== confirm) {
      return Alert.alert("Lỗi", "Mật khẩu không khớp");
    }
    
    try {
      const response = await registerUser({
        email,
        password,
        name,
        description: "New User" // Default description
      });

      if (response.message === "User registered successfully") {
        Alert.alert("Xong!", "Đăng ký thành công", [
          { text: "OK", onPress: onNavigateToLogin }
        ]);
      } else {
        Alert.alert("Lỗi", response.detail || "Không thể đăng ký");
      }
    } catch (e) {
      Alert.alert("Lỗi", "Không thể kết nối với máy chủ: " + e.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 25, justifyContent: 'center' }}>
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Đăng Ký</Text>
        
        <Text style={{ marginBottom: 5 }}>Họ và tên:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 44, paddingHorizontal: 10, marginBottom: 15, borderColor: '#ddd', borderRadius: 4 }} 
          placeholder="Ví dụ: Nguyễn Văn A" 
          onChangeText={setName} 
        />
        
        <Text style={{ marginBottom: 5 }}>Email:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 44, paddingHorizontal: 10, marginBottom: 15, borderColor: '#ddd', borderRadius: 4 }} 
          placeholder="test@gmail.com" 
          keyboardType="email-address"
          onChangeText={setEmail} 
        />
        
        <Text style={{ marginBottom: 5 }}>Mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 44, paddingHorizontal: 10, marginBottom: 15, borderColor: '#ddd', borderRadius: 4 }} 
          placeholder="********" 
          onChangeText={setPassword} 
        />
        
        <Text style={{ marginBottom: 5 }}>Nhập lại mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 44, paddingHorizontal: 10, marginBottom: 20, borderColor: '#ddd', borderRadius: 4 }} 
          placeholder="********" 
          onChangeText={setConfirm} 
        />

        <TouchableOpacity 
          onPress={handleRegister} 
          style={{ backgroundColor: '#007bff', height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>TẠO TÀI KHOẢN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToLogin} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', color: '#007bff' }}>Bạn đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}