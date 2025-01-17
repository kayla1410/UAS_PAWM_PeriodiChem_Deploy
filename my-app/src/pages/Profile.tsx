import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../supabaseClient';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        setUser(data.user);
      } catch (error) {
        alert('Error: Failed to fetch user data');
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/signin');
    } catch (error) {
      alert('Error: Failed to log out');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerText}>PeriodiChem</h1>
        <button style={styles.profileButton} onClick={() => navigate('/dashboard')}>
          <img
            src="https://img.icons8.com/ios-filled/50/home.png"
            alt="Home"
            style={styles.homeIcon}
          />
        </button>
      </div>

      {/* Profile Container */}
      <div style={styles.profileContainer}>
        <h2 style={styles.title}>Profile</h2>
        <img
          src="https://img.icons8.com/ios-filled/100/user-male-circle.png"
          alt="Profile Icon"
          style={styles.profileIcon}
        />
        <p style={styles.infoText}>Email: {user?.email || 'Loading...'}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          <span style={styles.logoutButtonText}>Log Out</span>
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100vh',
    padding: '0 20px',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    width: '100%',
    backgroundColor: '#F3C623',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#003366',
    margin: 0,
  },
  profileButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
  },
  homeIcon: {
    width: '30px',
    height: '30px',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    marginTop: '100px', // Adjust for header
    width: '80%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  profileIcon: {
    width: '100px',
    height: '100px',
    marginBottom: '20px',
  },
  infoText: {
    fontSize: '18px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#003366',
    padding: '15px 40px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
  logoutButtonText: {
    color: '#fff',
  },
};

export default Profile;
