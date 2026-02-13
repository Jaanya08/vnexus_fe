import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

function App() {
  // Shared profile data state
  const [profileData, setProfileData] = useState({
    name: 'Jaanya Bagdi',
    registrationNumber: '24BKT0029',
    course: 'B.Tech Computer Science',
    school: 'School of Computer Science and Engineering',
    email: 'jaanya.bagdi2024@vitstudent.ac.in',
    phone: '+91 7869511627',
    profilePicture: null
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' or 'profile'

  // Handle profile save - updates the shared state
  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  // Navigate to profile page
  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  // Navigate back to dashboard
  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="App">
      {currentPage === 'dashboard' ? (
        <Dashboard 
          onNavigateToProfile={navigateToProfile}
          profileData={profileData}
        />
      ) : (
        <Profile 
          onBack={navigateToDashboard}
          profileData={profileData}
          onSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
}

export default App;