import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { apiFetch } from '../App';

const Dashboard = ({ onNavigateToProfile, profileData, onLogout }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts and user's sent requests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await apiFetch('/posts');
        const requests = await apiFetch('/requests/sent');
        setProjectsData(posts);
        setSentRequests(requests);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // State management
  const [currentSort, setCurrentSort] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState(['research', 'patent', 'workshop']);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "";
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
        const professorName = project.faculty?.name || "";
        const searchText = `${project.title} ${project.shortDesc} ${professorName}`.toLowerCase();
        if (!searchText.includes(searchQuery.toLowerCase())) return false;
      }

      return true;
    });

    // Sort
    switch (currentSort) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
  const handleRequest = async (projectId, event) => {
    event.stopPropagation();
    try {
      const newRequest = await apiFetch('/requests', {
        method: 'POST',
        body: JSON.stringify({ postId: projectId })
      });
      setSentRequests(prev => [newRequest, ...prev]);
      alert("Request sent successfully! You will be notified once the professor reviews your request.");
    } catch (err) {
      alert("Failed to send request: " + err.message);
    }
  };

  const getRequestStatus = (postId) => {
    return sentRequests.find(req => req.post?._id === postId || req.post === postId);
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

          {/* Sign Out */}
          <button
            className="view-profile-btn"
            onClick={onLogout}
            style={{
              width: '100%',
              marginTop: '1rem',
              background: 'transparent',
              color: '#8B735A',
              border: '2px solid #E4DBD0',
              padding: '0.7rem 1rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = '#C4603A'; e.target.style.color = '#C4603A'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = '#E4DBD0'; e.target.style.color = '#8B735A'; }}
          >
            Sign Out
          </button>
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
              filteredProjects.map((project, index) => {
                const reqStatus = getRequestStatus(project._id);
                const isRequested = !!reqStatus;

                return (
                  <div
                    key={project._id}
                    className={`project-card ${expandedCardId === project._id ? 'expanded' : ''}`}
                    onClick={() => setExpandedCardId(expandedCardId === project._id ? null : project._id)}
                    style={{ animationDelay: `${Math.min(index * 0.1, 0.6)}s` }}
                  >
                    <div className="project-header">
                      <div>
                        <div className="project-title">{project.title}</div>
                        <div className="project-type" style={{ marginBottom: '8px' }}>
                          {project.type === 'research' ? 'Research Paper' :
                            project.type === 'patent' ? 'Patent' :
                              'Workshop'}
                        </div>
                        {isRequested && (
                           <div style={{
                             display: 'inline-block',
                             padding: '2px 8px',
                             background: 'var(--cream-dark)',
                             border: '1px solid var(--border)',
                             borderRadius: '12px',
                             fontSize: '11px',
                             fontWeight: 600,
                             textTransform: 'uppercase',
                             color: reqStatus.status === 'approved' ? '#4CAF50' : reqStatus.status === 'rejected' ? '#F44336' : '#FF9800',
                             marginLeft: '8px'
                           }}>
                             Status: {reqStatus.status}
                           </div>
                        )}
                      </div>
                    </div>
                    <p className="project-description">{project.shortDesc}</p>

                    <div className="project-meta">
                      <div className="meta-item">
                        <div className="meta-label">Professor</div>
                        <div className="meta-value">{project.faculty?.name || 'Unknown'}</div>
                      </div>
                      <div className="meta-item">
                        <div className="meta-label">Professor Email</div>
                        <div className="meta-value">
                          {project.faculty?.email ? (
                            <a href={`mailto:${project.faculty.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                              {project.faculty.email}
                            </a>
                          ) : 'Not available'}
                        </div>
                      </div>
                      <div className="meta-item">
                        <div className="meta-label">Detailed Description</div>
                        <div className="meta-value">{project.fullDesc || "No additional details provided."}</div>
                      </div>
                      {project.requirements && (
                        <div className="meta-item">
                          <div className="meta-label">Requirements</div>
                          <div className="meta-value">{project.requirements}</div>
                        </div>
                      )}
                      {project.deadline && (
                        <div className="meta-item">
                          <div className="meta-label">Deadline</div>
                          <div className="meta-value">{project.deadline}</div>
                        </div>
                      )}
                      <button
                        className="request-button"
                        disabled={isRequested}
                        onClick={(e) => handleRequest(project._id, e)}
                        style={{
                          opacity: isRequested ? 0.6 : 1,
                          cursor: isRequested ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isRequested ? 'Request Sent' : 'Send Request'}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;