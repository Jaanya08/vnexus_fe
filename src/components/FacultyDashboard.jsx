import React, { useState, useEffect } from 'react';
import { apiFetch } from '../App';

const dashboardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --cream: #FBF8F3;
  --cream-dark: #F5EFE6;
  --coffee-light: #C8B8A8;
  --coffee: #8B735A;
  --coffee-dark: #6B5644;
  --accent: #A67C52;
  --green: #7B9971;
  --shadow: rgba(107, 86, 68, 0.1);
}

body { font-family: 'DM Sans', sans-serif; }

.faculty-wrapper {
  font-family: 'DM Sans', sans-serif;
  background: linear-gradient(135deg, var(--cream) 0%, var(--cream-dark) 100%);
  color: var(--coffee-dark);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.bg-decoration {
  position: fixed;
  width: 300px; height: 300px;
  border-radius: 50%;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}
.bg-decoration:nth-child(1) { background: var(--coffee); top: -100px; right: -100px; }
.bg-decoration:nth-child(2) { background: var(--accent); bottom: -150px; left: -150px; width: 400px; height: 400px; }

.fac-container {
  position: relative; z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  min-height: 100vh;
}

/* ── SIDEBAR ── */
.fac-sidebar {
  position: sticky; top: 2rem;
  height: fit-content;
  animation: slideInLeft 0.6s ease-out;
}

.fac-profile-card {
  background: white;
  border: 2px solid var(--coffee-light);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}
.fac-profile-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px var(--shadow); }

.fac-avatar {
  width: 100px; height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--coffee));
  margin: 0 auto 1rem;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem; font-weight: 700;
  color: white;
  border: 4px solid var(--cream-dark);
  box-shadow: 0 5px 15px var(--shadow);
  animation: fadeIn 0.8s ease-out 0.2s both;
}
.fac-avatar-img {
  width: 100px; height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  display: block;
  border: 4px solid var(--cream-dark);
  box-shadow: 0 5px 15px var(--shadow);
  animation: fadeIn 0.8s ease-out 0.2s both;
}
.fac-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 700;
  color: var(--coffee-dark);
  margin-bottom: 0.3rem;
  animation: fadeIn 0.8s ease-out 0.4s both;
}
.fac-title {
  color: var(--accent);
  font-size: 0.85rem; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
  margin-bottom: 0.4rem;
  animation: fadeIn 0.8s ease-out 0.5s both;
}
.fac-dept {
  color: var(--coffee);
  font-size: 0.88rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.8s ease-out 0.6s both;
}

/* View Profile Button */
.view-profile-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(166, 124, 82, 0.3);
  animation: fadeIn 0.8s ease-out 0.7s both;
}
.view-profile-btn:hover {
  background: var(--coffee-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 124, 82, 0.4);
}
.view-profile-btn:active {
  transform: translateY(0);
}

/* Stats mini row */
.fac-stats-row {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0.75rem; margin-top: 1.5rem;
  animation: fadeIn 0.8s ease-out 0.8s both;
}
.fac-stat-chip {
  background: var(--cream);
  border: 1px solid var(--coffee-light);
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  text-align: center;
}
.fac-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 700;
  color: var(--accent); line-height: 1;
}
.fac-stat-label {
  font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--coffee); margin-top: 3px;
}

/* Filter section */
.fac-filter-section {
  background: white;
  border: 2px solid var(--coffee-light);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px var(--shadow);
  animation: fadeIn 0.8s ease-out 0.9s both;
}
.fac-filter-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem; font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--coffee-dark);
  display: flex; align-items: center; gap: 0.5rem;
}
.fac-filter-title::before { content: '◆'; color: var(--accent); }

.checkbox-group { display: flex; flex-direction: column; gap: 1rem; }
.checkbox-item {
  display: flex; align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.checkbox-item:hover { transform: translateX(5px); }
.checkbox-item input[type="checkbox"] {
  width: 20px; height: 20px;
  cursor: pointer; appearance: none;
  border: 2px solid var(--coffee-light);
  border-radius: 6px; margin-right: 0.75rem;
  position: relative; transition: all 0.3s ease;
}
.checkbox-item input[type="checkbox"]:checked { background: var(--accent); border-color: var(--accent); }
.checkbox-item input[type="checkbox"]:checked::after {
  content: '✓'; position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  color: white; font-size: 14px; font-weight: bold;
}
.checkbox-label { font-size: 0.95rem; color: var(--coffee-dark); user-select: none; }

/* ── MAIN CONTENT ── */
.fac-main { animation: slideInRight 0.6s ease-out; }

/* ── HEADER BAR ── */
.fac-header {
  background: white;
  border: 2px solid var(--coffee-light);
  border-radius: 20px;
  padding: 1.25rem 1.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px var(--shadow);
  display: flex;
  gap: 1rem; align-items: center;
  animation: fadeIn 0.8s ease-out 0.4s both;
  position: relative;
  z-index: 10;
}

/* Shorter search */
.fac-search-wrapper {
  flex: 0 0 320px;
  position: relative;
}
.fac-search-input {
  width: 100%;
  padding: 0.8rem 1.2rem 0.8rem 2.8rem;
  border: 2px solid var(--cream-dark);
  border-radius: 14px;
  font-size: 0.95rem;
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--coffee-dark);
  transition: all 0.3s ease;
}
.fac-search-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(166,124,82,0.1); }
.fac-search-input::placeholder { color: var(--coffee-light); }
.fac-search-icon {
  position: absolute; left: 0.9rem; top: 50%;
  transform: translateY(-50%);
  color: var(--coffee); pointer-events: none;
}

/* Spacer */
.fac-header-spacer { flex: 1; }

/* Sort button */
.fac-sort-wrap { position: relative; }
.fac-sort-btn {
  padding: 0.8rem 1.4rem;
  background: var(--coffee);
  color: white; border: none;
  border-radius: 14px; cursor: pointer;
  font-size: 0.95rem; font-weight: 500;
  display: flex; align-items: center; gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(107,86,68,0.2);
}
.fac-sort-btn:hover { background: var(--coffee-dark); transform: translateY(-2px); }

.fac-dropdown {
  position: absolute; top: calc(100% + 0.5rem); right: 0;
  background: white; border: 2px solid var(--coffee-light);
  border-radius: 15px; padding: 1rem;
  box-shadow: 0 10px 30px var(--shadow);
  display: none; z-index: 100; min-width: 180px;
}
.fac-dropdown.active { display: block; animation: dropdownSlide 0.3s ease-out; }
.fac-opt {
  padding: 0.7rem 1rem; cursor: pointer;
  border-radius: 10px; transition: all 0.2s ease;
  color: var(--coffee-dark); font-size: 0.9rem;
}
.fac-opt:hover { background: var(--cream); transform: translateX(4px); }
.fac-opt.active { background: var(--accent); color: white; font-weight: 500; }

/* ADD POST BUTTON */
.fac-add-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, var(--accent), #8B6030);
  color: white; border: none;
  border-radius: 14px; cursor: pointer;
  font-size: 0.95rem; font-weight: 600;
  display: flex; align-items: center; gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 18px rgba(166,124,82,0.35);
  white-space: nowrap;
  letter-spacing: 0.02em;
}
.fac-add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(166,124,82,0.45);
  background: linear-gradient(135deg, #8B6030, var(--accent));
}
.fac-add-btn:active { transform: translateY(0); }
.fac-add-icon { font-size: 1.1rem; font-weight: 400; line-height: 1; }

/* ── POSTS GRID ── */
.fac-posts-container {
  display: grid; gap: 1.5rem;
  max-height: calc(100vh - 170px);
  overflow-y: auto; padding-right: 0.5rem;
}
.fac-posts-container::-webkit-scrollbar { width: 8px; }
.fac-posts-container::-webkit-scrollbar-track { background: var(--cream-dark); border-radius: 10px; }
.fac-posts-container::-webkit-scrollbar-thumb { background: var(--coffee-light); border-radius: 10px; }
.fac-posts-container::-webkit-scrollbar-thumb:hover { background: var(--coffee); }

/* POST CARD */
.fac-post-card {
  background: white;
  border: 2px solid var(--coffee-light);
  border-radius: 20px;
  padding: 1.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow);
  animation: fadeInUp 0.6s ease-out both;
  position: relative; overflow: hidden;
}
.fac-post-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; width: 4px; height: 100%;
  background: var(--accent);
  transform: scaleY(0); transition: transform 0.3s ease;
}
.fac-post-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px var(--shadow); border-color: var(--accent); }
.fac-post-card:hover::before { transform: scaleY(1); }
.fac-post-card.expanded { grid-column: 1 / -1; }

.fac-post-top {
  display: flex; justify-content: space-between;
  align-items: flex-start; margin-bottom: 0.75rem;
  gap: 1rem;
}
.fac-post-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 700;
  color: var(--coffee-dark); margin-bottom: 0.5rem;
}
.fac-post-type {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: var(--cream);
  color: var(--coffee);
  border-radius: 20px;
  font-size: 0.78rem; font-weight: 500;
  border: 1px solid var(--coffee-light);
  white-space: nowrap;
}
.fac-post-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
.fac-action-btn {
  width: 32px; height: 32px; border-radius: 8px; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.9rem;
  transition: all 0.2s ease; background: var(--cream);
  color: var(--coffee);
}
.fac-action-btn:hover { background: var(--cream-dark); transform: scale(1.1); }
.fac-action-btn.delete:hover { background: #FDEAEA; color: #C0392B; }

.fac-post-desc { color: var(--coffee); line-height: 1.6; margin-bottom: 1rem; }

.fac-post-meta {
  display: none; margin-top: 1.5rem; padding-top: 1.5rem;
  border-top: 2px solid var(--cream-dark);
  animation: expandDown 0.4s ease-out;
}
.fac-post-card.expanded .fac-post-meta { display: block; }
.fac-meta-item { margin-bottom: 1rem; }
.fac-meta-label {
  font-weight: 600; color: var(--coffee-dark);
  margin-bottom: 0.25rem; font-size: 0.88rem;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.fac-meta-value { color: var(--coffee); line-height: 1.6; }
.fac-deadline-chip {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  background: #FFF3E6; color: #A0622A;
  border: 1px solid #F0C898;
  border-radius: 20px; font-size: 0.82rem; font-weight: 500;
  margin-top: 0.5rem;
}

/* Requests received counter badge */
.fac-requests-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  background: #EBF5E8; color: #4A7A42;
  border: 1px solid #B0D8A8;
  border-radius: 20px; font-size: 0.82rem; font-weight: 600;
  margin-top: 1rem; cursor: default;
}

/* ── ADD POST MODAL ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(107, 86, 68, 0.35);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease;
  padding: 2rem;
}
.modal-card {
  background: white;
  border: 2px solid var(--coffee-light);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%; max-width: 560px;
  box-shadow: 0 24px 80px rgba(107,86,68,0.22);
  animation: modalSlideUp 0.3s ease;
  max-height: 90vh; overflow-y: auto;
}
@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; font-weight: 700;
  color: var(--coffee-dark); margin-bottom: 0.5rem;
}
.modal-subtext {
  font-size: 0.88rem; color: var(--coffee);
  margin-bottom: 2rem; line-height: 1.5;
}
.modal-divider { height: 2px; background: var(--cream-dark); margin-bottom: 1.75rem; border-radius: 2px; }

.form-row { margin-bottom: 1.4rem; }
.form-label {
  display: block; font-size: 0.85rem; font-weight: 600;
  color: var(--coffee-dark); margin-bottom: 0.5rem;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.form-input, .form-select, .form-textarea {
  width: 100%; padding: 0.875rem 1rem;
  border: 2px solid var(--cream-dark); border-radius: 12px;
  font-size: 0.95rem; font-family: 'DM Sans', sans-serif;
  background: var(--cream); color: var(--coffee-dark);
  transition: all 0.3s ease;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(166,124,82,0.1);
  background: white;
}
.form-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
.form-select { cursor: pointer; }
.form-input::placeholder, .form-textarea::placeholder { color: var(--coffee-light); }

.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.4rem; }

.modal-actions { display: flex; gap: 1rem; margin-top: 2rem; justify-content: flex-end; }
.modal-cancel {
  padding: 0.875rem 1.75rem;
  background: var(--cream); color: var(--coffee-dark);
  border: 2px solid var(--coffee-light); border-radius: 12px;
  font-size: 0.95rem; font-weight: 500;
  cursor: pointer; transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;
}
.modal-cancel:hover { border-color: var(--coffee); background: var(--cream-dark); }
.modal-submit {
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--accent), #8B6030);
  color: white; border: none; border-radius: 12px;
  font-size: 0.95rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease;
  font-family: 'DM Sans', sans-serif; 
  box-shadow: 0 4px 16px rgba(166,124,82,0.3);
}
.modal-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(166,124,82,0.4); }

/* Empty state */
.fac-empty {
  text-align: center; padding: 4rem 2rem; color: var(--coffee);
}
.fac-empty-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.3; }
.fac-empty-text { font-size: 1.25rem; font-family: 'Cormorant Garamond', serif; margin-bottom: 0.5rem; }
.fac-empty-sub { font-size: 0.9rem; color: var(--coffee-light); }

/* Animations */
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideInLeft  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInRight { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }
@keyframes dropdownSlide { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
@keyframes expandDown {
  from{opacity:0;max-height:0} to{opacity:1;max-height:600px}
}

@media (max-width: 1024px) {
  .fac-container { grid-template-columns: 1fr; }
  .fac-sidebar { position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .fac-profile-card { margin-bottom: 0; }
}
@media (max-width: 640px) {
  .fac-sidebar { grid-template-columns: 1fr; }
  .fac-header { flex-wrap: wrap; }
  .fac-search-wrapper { flex: 1 1 100%; }
}
`;

const EMPTY_FORM = {
  title: '', type: 'research', shortDesc: '', fullDesc: '',
  slots: '', deadline: '', requirements: '',
};

const FacultyDashboard = ({ onNavigateToProfile, profileData, onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts and received requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await apiFetch('/posts');
        const reqs = await apiFetch('/requests/received');
        setPosts(fetchedPosts);
        setReceivedRequests(reqs);
      } catch (err) {
        console.error("Failed to load faculty data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['research', 'patent', 'workshop']);
  const [sortBy, setSortBy] = useState('latest');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // View requests modal state
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [activeRequestsPost, setActiveRequestsPost] = useState(null);

  const openAddModal = () => { setEditPost(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEditModal = (post, e) => {
    e.stopPropagation();
    setEditPost(post);
    setForm({
      title: post.title, type: post.type, shortDesc: post.shortDesc,
      fullDesc: post.fullDesc, slots: post.slots,
      deadline: post.deadline || '', requirements: post.requirements,
    });
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditPost(null); setForm(EMPTY_FORM); };

  const handleFormChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDesc) { alert("Please fill in at least the title and description."); return; }
    
    try {
      if (editPost) {
        const updated = await apiFetch(`/posts/${editPost._id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...form, slots: Number(form.slots) || 0, deadline: form.deadline || null })
        });
        setPosts(prev => prev.map(p => p._id === editPost._id ? updated : p));
      } else {
        const created = await apiFetch('/posts', {
          method: 'POST',
          body: JSON.stringify({ ...form, slots: Number(form.slots) || 0, deadline: form.deadline || null })
        });
        setPosts(prev => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this post?")) {
      try {
        await apiFetch(`/posts/${id}`, { method: 'DELETE' });
        setPosts(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      const updatedReq = await apiFetch(`/requests/${requestId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      setReceivedRequests(prev => prev.map(r => r._id === requestId ? updatedReq : r));
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = posts
    .filter(p => {
      if (!selectedCategories.includes(p.type)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return `${p.title} ${p.shortDesc}`.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return b.date - a.date;
      if (sortBy === 'oldest') return a.date - b.date;
      return a.title.localeCompare(b.title);
    });

  useEffect(() => {
    const close = () => setDropdownOpen(false);
    if (dropdownOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdownOpen]);

  const typeLabel = { research: 'Research Paper', patent: 'Patent', workshop: 'Workshop' };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : "PS";
  };

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="faculty-wrapper">
        <div className="bg-decoration" />
        <div className="bg-decoration" />

        <div className="fac-container">
          {/* ── SIDEBAR ── */}
          <aside className="fac-sidebar">
            <div className="fac-profile-card">
              {profileData.profilePicture ? (
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="fac-avatar-img"
                />
              ) : (
                <div className="fac-avatar">{getInitials(profileData.name)}</div>
              )}
              <div className="fac-name">{profileData.name}</div>
              <div className="fac-title">{profileData.title}</div>
              <div className="fac-dept">{profileData.department}</div>
              
              {/* View Profile Button */}
              <button className="view-profile-btn" onClick={onNavigateToProfile}>
                View Profile
              </button>
              
              {/* <div className="fac-stats-row">
                <div className="fac-stat-chip">
                  <div className="fac-stat-num">{posts.length}</div>
                  <div className="fac-stat-label">Posts</div>
                </div>
                <div className="fac-stat-chip">
                  <div className="fac-stat-num">{posts.reduce((s, p) => s + p.requests, 0)}</div>
                  <div className="fac-stat-label">Requests</div>
                </div>
              </div> */}
            </div>

            <div className="fac-filter-section">
              <h3 className="fac-filter-title">Categories</h3>
              <div className="checkbox-group">
                {[['research','Research Papers'],['patent','Patents'],['workshop','Workshops']].map(([val, label]) => (
                  <label className="checkbox-item" key={val}>
                    <input type="checkbox" value={val}
                      checked={selectedCategories.includes(val)}
                      onChange={() => handleCategoryChange(val)}
                    />
                    <span className="checkbox-label">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sign Out */}
            <button 
              onClick={onLogout}
              style={{
                width: '100%',
                marginTop: '1.0rem',
                background: 'transparent',
                color: 'var(--coffee)',
                border: '2px solid var(--coffee-light)',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--coffee-light)'; e.target.style.color = 'var(--coffee)'; }}
            >
              Sign Out
            </button>
          </aside>

          {/* ── MAIN ── */}
          <main className="fac-main">
            {/* Header bar */}
            <div className="fac-header">
              {/* Shorter search */}
              <div className="fac-search-wrapper">
                <span className="fac-search-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
                <input className="fac-search-input" type="text"
                  placeholder="Search your posts..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="fac-header-spacer" />

              {/* Sort */}
              <div className="fac-sort-wrap">
                <button className="fac-sort-btn"
                  onClick={e => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 6h18M7 12h10M11 18h2"/>
                  </svg>
                  Sort
                </button>
                <div className={`fac-dropdown ${dropdownOpen ? 'active' : ''}`}>
                  {[['latest','Latest First'],['oldest','Oldest First'],['alphabetical','A–Z']].map(([val, label]) => (
                    <div key={val}
                      className={`fac-opt ${sortBy === val ? 'active' : ''}`}
                      onClick={e => { e.stopPropagation(); setSortBy(val); setDropdownOpen(false); }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Post */}
              <button className="fac-add-btn" onClick={openAddModal}>
                <span className="fac-add-icon">＋</span>
                Add Post
              </button>
            </div>

            {/* Posts */}
            <div className="fac-posts-container">
              {filteredPosts.length === 0 ? (
                <div className="fac-empty">
                  <div className="fac-empty-icon">📭</div>
                  <div className="fac-empty-text">No posts found</div>
                  <div className="fac-empty-sub">Click "Add Post" to create your first opportunity.</div>
                </div>
              ) : filteredPosts.map((post, idx) => (
                <div key={post._id}
                  className={`fac-post-card ${expandedId === post._id ? 'expanded' : ''}`}
                  onClick={() => setExpandedId(expandedId === post._id ? null : post._id)}
                  style={{ animationDelay: `${Math.min(idx * 0.1, 0.6)}s` }}>

                  <div className="fac-post-top">
                    <div>
                      <div className="fac-post-title">{post.title}</div>
                      <span className="fac-post-type">{typeLabel[post.type]}</span>
                    </div>
                    <div className="fac-post-actions">
                      <button className="fac-action-btn" title="Edit"
                        onClick={e => openEditModal(post, e)}>✏️</button>
                      <button className="fac-action-btn delete" title="Delete"
                        onClick={e => handleDelete(post._id, e)}>🗑️</button>
                    </div>
                  </div>

                  <p className="fac-post-desc">{post.shortDesc}</p>

                  <div className="fac-post-meta">
                    <div className="fac-meta-item">
                      <div className="fac-meta-label">Full Description</div>
                      <div className="fac-meta-value">{post.fullDesc}</div>
                    </div>
                    <div className="fac-meta-item">
                      <div className="fac-meta-label">Requirements</div>
                      <div className="fac-meta-value">{post.requirements}</div>
                    </div>
                    {post.slots > 0 && (
                      <div className="fac-meta-item">
                        <div className="fac-meta-label">Open Slots</div>
                        <div className="fac-meta-value">{post.slots}</div>
                      </div>
                    )}
                    {post.deadline && (
                      <div className="fac-meta-item">
                        <div className="fac-meta-label">Deadline</div>
                        <span className="fac-deadline-chip">{post.deadline}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                      <button
                        className="fac-requests-badge"
                        style={{
                          background: post.requests > 0 ? 'var(--coffee)' : 'var(--cream)',
                          color: post.requests > 0 ? 'white' : 'var(--coffee)',
                          border: post.requests > 0 ? 'none' : '1px solid var(--coffee-light)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          cursor: post.requests > 0 ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          opacity: post.requests === 0 ? 0.7 : 1
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (post.requests > 0) {
                            setActiveRequestsPost(post);
                            setShowRequestsModal(true);
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (post.requests > 0) e.target.style.background = 'var(--coffee-dark)';
                        }}
                        onMouseLeave={(e) => {
                          if (post.requests > 0) e.target.style.background = 'var(--coffee)';
                        }}
                      >
                        👥 {post.requests} student request{post.requests !== 1 ? 's' : ''} received
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* ── ADD / EDIT MODAL ── */}
        {showModal && (
          <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <h2 className="modal-heading">{editPost ? 'Edit Post' : 'Create New Post'}</h2>
              <p className="modal-subtext">
                {editPost ? 'Update the details of your opportunity.' : 'Share a new research, patent, or workshop opportunity with students.'}
              </p>
              <div className="modal-divider" />

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-label">Title *</label>
                  <input className="form-input" type="text" placeholder="e.g. Machine Learning for Climate Prediction"
                    value={form.title} onChange={e => handleFormChange('title', e.target.value)} />
                </div>

                <div className="form-row-2">
                  <div>
                    <label className="form-label">Type *</label>
                    <select className="form-select" value={form.type}
                      onChange={e => handleFormChange('type', e.target.value)}>
                      <option value="research">Research Paper</option>
                      <option value="patent">Patent</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Open Slots</label>
                    <input className="form-input" type="number" min="0" placeholder="e.g. 3"
                      value={form.slots} onChange={e => handleFormChange('slots', e.target.value)} />
                  </div>
                </div>

                <div className="form-row">
                  <label className="form-label">Short Description *</label>
                  <input className="form-input" type="text"
                    placeholder="One-line summary shown on the card"
                    value={form.shortDesc} onChange={e => handleFormChange('shortDesc', e.target.value)} />
                </div>

                <div className="form-row">
                  <label className="form-label">Full Description</label>
                  <textarea className="form-textarea"
                    placeholder="Detailed description of the project, goals, and expected outcomes..."
                    value={form.fullDesc} onChange={e => handleFormChange('fullDesc', e.target.value)} />
                </div>

                <div className="form-row">
                  <label className="form-label">Requirements</label>
                  <input className="form-input" type="text"
                    placeholder="e.g. Python, PyTorch, prior ML experience"
                    value={form.requirements} onChange={e => handleFormChange('requirements', e.target.value)} />
                </div>

                <div className="form-row">
                  <label className="form-label">Deadline (optional)</label>
                  <input className="form-input" type="text" placeholder="e.g. March 30, 2026"
                    value={form.deadline} onChange={e => handleFormChange('deadline', e.target.value)} />
                </div>

                <div className="modal-actions">
                  <button type="button" className="modal-cancel" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="modal-submit">
                    {editPost ? '✓ Save Changes' : '+ Publish Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ── View Requests Modal ── */}
        {showRequestsModal && activeRequestsPost && (
          <div className="modal-backdrop" onClick={() => setShowRequestsModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <h2 className="modal-heading">Requests for "{activeRequestsPost.title}"</h2>
              <div className="modal-divider" />
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {receivedRequests.filter(r => r.post._id === activeRequestsPost._id || r.post === activeRequestsPost._id).length === 0 ? (
                  <p style={{ color: 'var(--ink-soft)' }}>No requests received yet.</p>
                ) : (
                  receivedRequests
                    .filter(r => r.post._id === activeRequestsPost._id || r.post === activeRequestsPost._id)
                    .map(req => (
                      <div key={req._id} style={{ 
                        padding: '16px', background: 'var(--cream)', borderRadius: '12px', 
                        marginBottom: '12px', border: '1px solid var(--border)' 
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{req.student.name}</strong>
                            <div style={{ fontSize: '13px', color: 'var(--ink-soft)', marginTop: '4px' }}>
                              Email: {req.student.email}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>
                              Course: {req.student.course} | Reg No: {req.student.registrationNumber}
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 600 }}>
                              Status: <span style={{ 
                                color: req.status === 'approved' ? '#4CAF50' : req.status === 'rejected' ? '#F44336' : '#FF9800',
                                textTransform: 'uppercase'
                              }}>{req.status}</span>
                            </div>
                          </div>
                          {req.status === 'pending' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleStatusChange(req._id, 'approved')}
                                style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                                Approve
                              </button>
                              <button onClick={() => handleStatusChange(req._id, 'rejected')}
                                style={{ background: '#F44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
              <div className="modal-actions" style={{ marginTop: '20px' }}>
                <button type="button" className="modal-cancel" onClick={() => setShowRequestsModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FacultyDashboard;