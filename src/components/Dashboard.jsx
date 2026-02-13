import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ onNavigateToProfile, profileData }) => {
  // Sample project data
  const projectsData = [
    {
      id: 1,
      title: "Machine Learning for Climate Prediction",
      description: "Exploring advanced ML algorithms to predict climate patterns and extreme weather events.",
      type: "research",
      professor: "Dr. Priya Sharma",
      deadline: "March 15, 2026",
      detailedDescription: "This research focuses on developing novel machine learning models to analyze historical climate data and predict future weather patterns with higher accuracy. The project involves working with large datasets, implementing deep learning architectures, and validating models against real-world scenarios.",
      date: new Date('2026-02-10')
    },
    {
      id: 2,
      title: "AI-Powered Healthcare Diagnostics",
      description: "Developing an intelligent system for early disease detection using computer vision.",
      type: "patent",
      professor: "Dr. Rajesh Kumar",
      deadline: "April 1, 2026",
      detailedDescription: "An innovative patent application focusing on computer vision techniques for medical image analysis. This project aims to create a system that can identify early signs of various diseases from medical imaging, potentially revolutionizing diagnostic procedures in healthcare facilities.",
      date: new Date('2026-02-12')
    },
    {
      id: 3,
      title: "Web3 and Blockchain Security Workshop",
      description: "Hands-on workshop covering smart contract development and security auditing.",
      type: "workshop",
      professor: "Prof. Amit Patel",
      deadline: null,
      detailedDescription: "A comprehensive two-week workshop designed to introduce students to blockchain technology, smart contract development on Ethereum, and security best practices. Participants will learn about common vulnerabilities, auditing techniques, and build real-world decentralized applications.",
      date: new Date('2026-02-13')
    },
    {
      id: 4,
      title: "Quantum Computing Algorithms Research",
      description: "Investigating quantum algorithms for optimization problems in logistics.",
      type: "research",
      professor: "Dr. Sanjay Mehta",
      deadline: "March 30, 2026",
      detailedDescription: "This research explores the application of quantum computing algorithms to solve complex optimization problems in supply chain and logistics. The project involves understanding quantum mechanics principles, implementing quantum circuits, and comparing results with classical algorithms.",
      date: new Date('2026-02-08')
    },
    {
      id: 5,
      title: "Sustainable Energy Management System",
      description: "IoT-based system for monitoring and optimizing energy consumption in buildings.",
      type: "patent",
      professor: "Dr. Kavita Desai",
      deadline: "April 15, 2026",
      detailedDescription: "A patent application for an innovative IoT-based energy management system that uses sensor networks and AI algorithms to optimize energy consumption in commercial and residential buildings. The system includes real-time monitoring, predictive analytics, and automated control mechanisms.",
      date: new Date('2026-02-11')
    },
    {
      id: 6,
      title: "Data Science in Finance Workshop",
      description: "Learn statistical modeling and machine learning for financial market analysis.",
      type: "workshop",
      professor: "Prof. Vikram Singh",
      deadline: null,
      detailedDescription: "An intensive workshop covering data science techniques specifically tailored for financial applications. Topics include time series analysis, risk modeling, portfolio optimization, and algorithmic trading strategies using Python and R.",
      date: new Date('2026-02-09')
    },
    {
      id: 7,
      title: "Natural Language Processing for Regional Languages",
      description: "Building NLP models to process and understand Indian regional languages.",
      type: "research",
      professor: "Dr. Anjali Verma",
      deadline: "March 20, 2026",
      detailedDescription: "This research project aims to develop state-of-the-art NLP models for processing Indian regional languages like Tamil, Telugu, and Hindi. The work involves creating training datasets, fine-tuning transformer models, and building applications for translation and sentiment analysis.",
      date: new Date('2026-02-07')
    },
    {
      id: 8,
      title: "Augmented Reality in Education",
      description: "Creating AR applications to enhance interactive learning experiences.",
      type: "patent",
      professor: "Dr. Ramesh Iyer",
      deadline: "April 5, 2026",
      detailedDescription: "A patent proposal for an augmented reality platform designed specifically for educational purposes. The system will enable students to interact with 3D models, conduct virtual experiments, and experience immersive learning scenarios across various subjects.",
      date: new Date('2026-02-13')
    }
  ];

  // State management
  const [currentSort, setCurrentSort] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState(['research', 'patent', 'workshop']);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter and sort projects
  const getFilteredProjects = () => {
    let filtered = projectsData.filter(project => {
      // Filter by category
      if (!selectedCategories.includes(project.type)) return false;

      // Filter by search
      if (searchQuery) {
        const searchText = `${project.title} ${project.description} ${project.professor}`.toLowerCase();
        if (!searchText.includes(searchQuery.toLowerCase())) return false;
      }

      return true;
    });

    // Sort
    switch (currentSort) {
      case 'latest':
        filtered.sort((a, b) => b.date - a.date);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.date - b.date);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle request button
  const handleRequest = (projectId, event) => {
    event.stopPropagation();
    const project = projectsData.find(p => p.id === projectId);
    alert(`Request sent to ${project.professor} for "${project.title}"!\n\nYou will be notified once the professor reviews your request.`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="dashboard-wrapper">
      <div className="bg-decoration"></div>
      <div className="bg-decoration"></div>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Profile Card */}
          <div className="profile-card">
            {profileData.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="profile-image"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 1rem',
                  display: 'block',
                  border: '4px solid var(--cream-dark)',
                  boxShadow: '0 5px 15px var(--shadow)',
                  animation: 'fadeIn 0.8s ease-out 0.2s both'
                }}
              />
            ) : (
              <div className="profile-image">{getInitials(profileData.name)}</div>
            )}
            <div className="profile-name">{profileData.name}</div>
            <div className="profile-school">{profileData.school}</div>
            
            {/* View Profile Button */}
            <button 
              className="view-profile-btn"
              onClick={onNavigateToProfile}
            >
              View Profile
            </button>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  value="research" 
                  checked={selectedCategories.includes('research')}
                  onChange={() => handleCategoryChange('research')}
                />
                <span className="checkbox-label">Research Papers</span>
              </label>
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  value="patent" 
                  checked={selectedCategories.includes('patent')}
                  onChange={() => handleCategoryChange('patent')}
                />
                <span className="checkbox-label">Patents</span>
              </label>
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  value="workshop" 
                  checked={selectedCategories.includes('workshop')}
                  onChange={() => handleCategoryChange('workshop')}
                />
                <span className="checkbox-label">Workshops</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header with Search and Filter */}
          <div className="header">
            <div className="search-wrapper">
              {/* <span className="search-icon">🔍</span> */}
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search projects, papers, workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button 
                className="filter-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                {/* <span>⚙️</span> */}
                <span>Sort</span>
              </button>
              <div className={`filter-dropdown ${dropdownOpen ? 'active' : ''}`}>
                <div 
                  className={`filter-option ${currentSort === 'latest' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSort('latest');
                    setDropdownOpen(false);
                  }}
                >
                  Latest First
                </div>
                <div 
                  className={`filter-option ${currentSort === 'oldest' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSort('oldest');
                    setDropdownOpen(false);
                  }}
                >
                  Oldest First
                </div>
                <div 
                  className={`filter-option ${currentSort === 'alphabetical' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSort('alphabetical');
                    setDropdownOpen(false);
                  }}
                >
                  A-Z
                </div>
              </div>
            </div>
          </div>

          {/* Projects Container */}
          <div className="projects-container">
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-text">No projects found matching your criteria</div>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`project-card ${expandedCardId === project.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedCardId(expandedCardId === project.id ? null : project.id)}
                  style={{ animationDelay: `${Math.min(index * 0.1, 0.6)}s` }}
                >
                  <div className="project-header">
                    <div>
                      <div className="project-title">{project.title}</div>
                      <div className="project-type">
                        {project.type === 'research' ? 'Research Paper' : 
                         project.type === 'patent' ? 'Patent' : 
                         'Workshop'}
                      </div>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-meta">
                    <div className="meta-item">
                      <div className="meta-label">Professor</div>
                      <div className="meta-value">{project.professor}</div>
                    </div>
                    <div className="meta-item">
                      <div className="meta-label">Detailed Description</div>
                      <div className="meta-value">{project.detailedDescription}</div>
                    </div>
                    {project.deadline && (
                      <div className="meta-item">
                        <div className="meta-label">Deadline</div>
                        <div className="meta-value">{project.deadline}</div>
                      </div>
                    )}
                    <button 
                      className="request-button" 
                      onClick={(e) => handleRequest(project.id, e)}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;