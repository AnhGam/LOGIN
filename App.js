import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { initDatabase } from './database';
import Register from './register';
import Login from './login';
import Home from './home';
import Profile from './profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initDatabase().catch(err => console.error('Error initializing database:', err));
  }, []);

  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) setCurrentUser(data);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'register':
        return <Register onNavigateToLogin={() => navigateTo('login')} />;
      case 'login':
        return <Login 
          onNavigateToRegister={() => navigateTo('register')} 
          onLoginSuccess={(user) => navigateTo('home', user)} 
        />;
      case 'home':
        return <Home user={currentUser} onNavigateToProfile={() => navigateTo('profile')} />;
      case 'profile':
        return <Profile user={currentUser} onBack={() => navigateTo('home')} />;
      default:
        return <Login onNavigateToRegister={() => navigateTo('register')} onLoginSuccess={(user) => navigateTo('home', user)} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
}