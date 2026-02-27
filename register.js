import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Register() {
  return (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: 250,
      height: 500,
      padding: 20,
      borderWidth: 1
    }}>

      <Text style={{
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold'
      }}>
        Register
      </Text>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Name
        </Text>
        <TextInput style={{placeholder:'test', borderWidth: 1, height: 40 }} />
      </View>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Email
        </Text>
        <TextInput style={{placeholder:'test@gmail.com', borderWidth: 1, height: 40 }} />
      </View>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Password
        </Text>
        <TextInput secureTextEntry style={{placeholder:'********', borderWidth: 1, height: 40 }} />
      </View>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Confirm Password
        </Text>
        <TextInput secureTextEntry style={{placeholder:'********', borderWidth: 1, height: 40 }} />
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
          Create
        </Text>
      </TouchableOpacity>

    </View>
  );
}