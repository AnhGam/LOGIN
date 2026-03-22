import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [time, ...prevLaps]);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Khung viền giả lập giao diện điện thoại trong ảnh */}
      <View style={styles.phoneFrame}>
        
        <Text style={styles.timeDisplay}>{formatTime(time)}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleLap}>
            <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleStartStop}>
            <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.lapContainer}>
          {laps.map((lapTime, index) => (
            <View key={index} style={styles.lapItem}>
              <Text style={styles.lapText}>Lap #{laps.length - index}</Text>
              <Text style={styles.lapText}>{formatTime(lapTime)}</Text>
            </View>
          ))}
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  phoneFrame: {
    width: 280,
    height: 500,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lapContainer: {
    width: '100%',
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginBottom: 10,
  },
  lapText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  }
});