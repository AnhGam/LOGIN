import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { initDatabase } from './database';
import Register from './register';
import Login from './login';
import Home from './home';
import Profile from './profile';
import Settings from './Settings';
import BottomNavBar from './BottomNavBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initDatabase().catch(err => console.error('Error initializing database:', err));
  }, []);

  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) setCurrentUser(data);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home user={currentUser} onNavigateToProfile={() => setActiveTab('profile')} />;
      case 'profile':
        return <Profile user={currentUser} onBack={() => setActiveTab('home')} />;
      case 'setting':
        return <Settings />;
      default:
        return <Home user={currentUser} onNavigateToProfile={() => setActiveTab('profile')} />;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'register':
        return <Register onNavigateToLogin={() => navigateTo('login')} />;
      case 'login':
        return <Login 
          onNavigateToRegister={() => navigateTo('register')} 
          onLoginSuccess={(user) => navigateTo('main', user)} 
        />;
      case 'main':
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              {renderActiveTab()}
            </View>
            <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
          </View>
        );
      default:
        return <Login onNavigateToRegister={() => navigateTo('register')} onLoginSuccess={(user) => navigateTo('main', user)} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
}