import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const registerUser = async () => {
    // Kiểm tra thông tin cơ bản
    if (!name || !email || !password) {
      return Alert.alert("Lỗi", "Vui lòng điền đủ thông tin");
    }
    if (password !== confirm) {
      return Alert.alert("Lỗi", "Mật khẩu không khớp");
    }
    
    try {
      // Tạo object user đơn giản
      const newUser = { name, email, password };
      // Lưu vào bộ nhớ máy
      await AsyncStorage.setItem(email, JSON.stringify(newUser));
      
      Alert.alert("Xong!", "Đăng ký thành công", [
        { text: "OK", onPress: onNavigateToLogin }
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu dữ liệu: " + e.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Đăng Ký</Text>
        
        <Text style={{ marginBottom: 5 }}>Họ và tên:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, marginBottom: 15 }} 
          placeholder="Ví dụ: Nguyễn Văn A" 
          onChangeText={setName} 
        />
        
        <Text style={{ marginBottom: 5 }}>Email:</Text>
        <TextInput 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, marginBottom: 15 }} 
          placeholder="test@gmail.com" 
          keyboardType="email-address"
          onChangeText={setEmail} 
        />
        
        <Text style={{ marginBottom: 5 }}>Mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, marginBottom: 15 }} 
          placeholder="********" 
          onChangeText={setPassword} 
        />
        
        <Text style={{ marginBottom: 5 }}>Nhập lại mật khẩu:</Text>
        <TextInput 
          secureTextEntry 
          style={{ borderWidth: 1, height: 40, paddingHorizontal: 10, marginBottom: 20 }} 
          placeholder="********" 
          onChangeText={setConfirm} 
        />

        <TouchableOpacity 
          onPress={registerUser} 
          style={{ backgroundColor: '#007bff', height: 45, justifyContent: 'center', alignItems: 'center' }}
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