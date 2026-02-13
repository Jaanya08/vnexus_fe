import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

function App() {
  // Shared profile data state
  const [profileData, setProfileData] = useState({
    name: 'Arjun Reddy',
    registrationNumber: '21BCE1234',
    course: 'B.Tech Computer Science',
    school: 'School of Computer Science and Engineering',
    email: 'arjun.reddy2021@vitstudent.ac.in',
    phone: '+91 98765 43210',
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