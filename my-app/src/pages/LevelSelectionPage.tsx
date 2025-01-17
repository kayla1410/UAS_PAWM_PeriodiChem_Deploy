import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../supabaseClient';

const LevelSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const levels = [
    { id: '1', name: 'Level 1' },
    { id: '2', name: 'Level 2' },
    { id: '3', name: 'Level 3' },
  ];

  const [passedLevels, setPassedLevels] = useState<{ [key: string]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error(userError?.message || 'User not logged in');
        }

        const { data, error } = await supabase
          .from('user_progress')
          .select('level_1_passed, level_2_passed, level_3_passed')
          .eq('user_id', user.id)
          .single();

        setPassedLevels({
          1: data?.level_1_passed || false,
          2: data?.level_2_passed || false,
          3: data?.level_3_passed || false,
        });

        console.log('Fetched progress:', data);
      } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred.');
      }
    };

    fetchProgress();
  }, []);

  const handleLevelSelection = (level: string) => {
    console.log('Selected Level:', level);
    console.log('Passed Levels:', passedLevels);
    if (
      level === '1' || // Level 1 selalu bisa diakses
      (level === '2' && passedLevels[1]) || // Level 2 hanya jika level 1 lulus
      (level === '3' && passedLevels[2]) // Level 3 hanya jika level 2 lulus
    ) {
      navigate('/quizpage', { state: { level } });
    } else {
      alert('You must complete the previous level to unlock this level.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select Level</h1>
      <div style={styles.levelContainer}>
        {levels.map((level) => (
          <button
            key={level.id}
            style={{
              ...styles.levelButton,
              ...(passedLevels[parseInt(level.id) - 1] || level.id === '1'
                ? {}
                : styles.disabledButton),
            }}
            onClick={() => handleLevelSelection(level.id)}
            disabled={!passedLevels[parseInt(level.id) - 1] && level.id !== '1'}
          >
            {level.name}
          </button>
        ))}
      </div>

      <button
        style={styles.dashboardButton}
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    height: '100vh',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  levelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButton: {
    padding: '25px',
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '15px',
    margin: '0 15px',
    border: 'none',
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
    cursor: 'not-allowed',
  },
  dashboardButton: {
    marginTop: '40px',
    backgroundColor: '#F3C623',
    padding: '15px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LevelSelectionPage;
