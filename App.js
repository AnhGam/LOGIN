import React from 'react';
import { View } from 'react-native';
import Register from './register';
import Login from './login';

export default function App() {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 40
    }}>
      <Login />
    </View> 
  );
}