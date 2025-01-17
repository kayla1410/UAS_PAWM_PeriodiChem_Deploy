import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#fff',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
        `}
      </style>

      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F3C623',
          padding: '10px 20px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366', margin: 0 }}>PeriodiChem</h1>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
            alt="Profile Icon"
            style={{ width: '40px', height: '40px' }}
          />
        </button>
      </header>

      {/* Content */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', textAlign: 'center', marginBottom: '30px' }}>Happy Learning!</h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <button
            style={{
              backgroundColor: '#F5F5F5',
              padding: '20px 40px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              border: 'none',
              textAlign: 'center',
              width: '100%',
              height: '150px',
              fontFamily: 'Poppins, sans-serif',
            }}
            onClick={() => navigate('/periodictable')}
          >
            Periodic Table
          </button>

          <button
            style={{
              backgroundColor: '#F5F5F5',
              padding: '20px 40px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              border: 'none',
              textAlign: 'center',
              width: '100%',
              height: '150px',
              fontFamily: 'Poppins, sans-serif',
            }}
            onClick={() => navigate('/levelselectionpage')}
          >
            Quiz
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
