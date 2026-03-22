import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function BMI_Calculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('...');

  const calculateBMI = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeightCm = parseFloat(height);

    if (!parsedWeight || !parsedHeightCm) {
      setBmi('...');
      return;
    }

    const parsedHeightM = parsedHeightCm / 100;
    const result = parsedWeight / (parsedHeightM * parsedHeightM);
    setBmi(result.toFixed(2));
  };

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
        BMI Calculator
      </Text>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Weight (kg)
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            paddingHorizontal: 8
          }}
          keyboardType='numeric'
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <View>
        <Text style={{ marginBottom: 4 }}>
          Height (cm)
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            paddingHorizontal: 8
          }}
          keyboardType='numeric'
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <Text>BMI: {bmi}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={calculateBMI}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold'
        }}>
          Calculate BMI
        </Text>
      </TouchableOpacity>
    </View>
  );
}
