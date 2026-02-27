import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: 250,
      height: 400,
      padding: 20,
      borderWidth: 1
    }}>

      <Text style={{
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
      }}>
        Login
      </Text>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Email/Username
        </Text>
        <TextInput
          style={{
            placeholder: 'test@gmail.com',
            borderWidth: 1,
            height: 40
          }}
        />
      </View>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Password
        </Text>
        <TextInput
          secureTextEntry
          style={{
            placeholder: '********',
            borderWidth: 1,
            height: 40
          }}
        />
        <Text>Forgot password?</Text>
      </View>

      <TouchableOpacity style={{
        backgroundColor: '#007bff',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold'
        }}>
          Sign in
        </Text>
      </TouchableOpacity>

    </View>
  );
}