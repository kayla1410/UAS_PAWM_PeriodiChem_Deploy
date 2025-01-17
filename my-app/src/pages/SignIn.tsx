import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../supabaseClient';
import logo from '../images/logo.png';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        alert(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFD700',
        margin: 0,
        padding: 0,
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
      }}
    >
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>
      <div style={{ marginBottom: '20px' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Sign In
      </h1>
      <div
        style={{
          width: '90%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <input
          type="email"
          placeholder="Enter Your Email Here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '92%',
            height: '50px',
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            padding: '0 15px',
            marginBottom: '15px',
            fontSize: '16px',
            border: 'none',
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Enter Your Password Here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '92%',
            height: '50px',
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            padding: '0 15px',
            marginBottom: '15px',
            fontSize: '16px',
            border: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#FFA500',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'none',
            marginBottom: '10px',
            outline: 'none',
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <p style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontSize: '14px', color: '#555' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{
              color: '#FFA500',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;