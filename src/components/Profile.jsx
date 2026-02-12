import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ onBack }) => {
  // State for profile data
  const [profileData, setProfileData] = useState({
    name: 'Jaanya Bagdi',
    registrationNumber: '24BKT0029',
    course: 'B.Tech Computer Science',
    school: 'School of Computer Science and Engineering',
    email: 'jaanya.bagdi2024@vitstudent.ac.in',
    phone: '+91 7869511627',
    profilePicture: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });
  const [imagePreview, setImagePreview] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setTempData({
      ...tempData,
      [field]: value
    });
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTempData({
          ...tempData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save
  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    // Here you would typically make an API call to save the data
    console.log('Saving profile data:', tempData);
  };

  // Handle cancel
  const handleCancel = () => {
    setTempData({ ...profileData });
    setImagePreview(profileData.profilePicture);
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-wrapper">
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>

      <div className="profile-container">
        {/* Back Button */}
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Dashboard</span>
        </button>

        {/* Success Message */}
        {saveSuccess && (
          <div className="success-message">
            <span>✓</span> Profile updated successfully!
          </div>
        )}

        {/* Profile Card */}
        <div className="profile-content">
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-page-title">Student Profile</h1>
            <p className="profile-subtitle">Manage your personal information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="profile-picture-section">
            <div className="picture-container">
              {imagePreview || profileData.profilePicture ? (
                <img 
                  src={imagePreview || profileData.profilePicture} 
                  alt="Profile" 
                  className="profile-picture-img"
                />
              ) : (
                <div className="profile-picture-placeholder">
                  {getInitials(tempData.name)}
                </div>
              )}
              {isEditing && (
                <label className="picture-upload-overlay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Change Photo</span>
                </label>
              )}
            </div>
            <div className="picture-info">
              <h3>{profileData.name}</h3>
              <p>{profileData.registrationNumber}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="profile-form">
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group full-width">
                <label className="form-label">
                  {/* <span className="label-icon">👤</span> */}
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={tempData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Registration Number */}
              <div className="form-group">
                <label className="form-label">
                  {/* <span className="label-icon">🎓</span> */}
                  Registration Number
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={tempData.registrationNumber}
                  onChange={(e) => handleChange('registrationNumber', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., 21BCE1234"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  {/* <span className="label-icon">📧</span> */}
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={tempData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  placeholder="your.email@vitstudent.ac.in"
                />
              </div>

              {/* Course/Branch */}
              <div className="form-group">
                <label className="form-label">
                  {/* <span className="label-icon">📚</span> */}
                  Course / Branch
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={tempData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., B.Tech Computer Science"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">
                  {/* <span className="label-icon">📱</span> */}
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-input"
                  value={tempData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* School Name */}
              <div className="form-group full-width">
                <label className="form-label">
                  {/* <span className="label-icon">🏛️</span> */}
                  School Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={tempData.school}
                  onChange={(e) => handleChange('school', e.target.value)}
                  disabled={!isEditing}
                  placeholder="School of Computer Science and Engineering"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              {!isEditing ? (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button className="btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn-primary btn-save" onClick={handleSave}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info Card
        <div className="info-card">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h4>Keep Your Profile Updated</h4>
            <p>Make sure your information is accurate so professors can reach you for project opportunities and collaborations.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;