import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../supabaseClient';

const QuizPage: React.FC = () => {
    const navigate = useNavigate();
    const gridSize = 40;
    const periodicTable = [
        { symbol: 'H', name: 'Hydrogen', row: 0, col: 0 },
        { symbol: '3', name: 'Helium', row: 0, col: 17 },
        { symbol: 'Li', name: 'Lithium', row: 1, col: 0 },
        { symbol: 'Be', name: 'Beryllium', row: 1, col: 1 },
        { symbol: 'B', name: 'Boron', row: 1, col: 12 },
        { symbol: 'C', name: 'Carbon', row: 1, col: 13 },
        { symbol: '1', name: 'Nitrogen', row: 1, col: 14 },
        { symbol: '4', name: 'Oxygen', row: 1, col: 15 },
        { symbol: 'F', name: 'Fluorine', row: 1, col: 16 },
        { symbol: 'Ne', name: 'Neon', row: 1, col: 17 },
        { symbol: 'Na', name: 'Sodium', row: 2, col: 0 },
        { symbol: '2', name: 'Magnesium', row: 2, col: 1 },
        { symbol: 'Al', name: 'Aluminium', row: 2, col: 12 },
        { symbol: 'Si', name: 'Silicon', row: 2, col: 13 },
        { symbol: 'P', name: 'Phosphorus', row: 2, col: 14 },
        { symbol: 'S', name: 'Sulfur', row: 2, col: 15 },
        { symbol: 'Cl', name: 'Chlorine', row: 2, col: 16 },
        { symbol: 'Ar', name: 'Argon', row: 2, col: 17 },
        { symbol: 'K', name: 'Potassium', row: 3, col: 0 },
        { symbol: 'Ca', name: 'Calcium', row: 3, col: 1 },
        { symbol: 'Sr', name: 'Strontium', row: 4, col: 1 },
        { symbol: '8', name: 'Barium', row: 5, col: 1 },
        { symbol: 'Ra', name: 'Radium', row: 6, col: 1 },
        { symbol: 'Sc', name: 'Scandium', row: 3, col: 2 },
        { symbol: 'Y', name: 'Yttrium', row: 4, col: 2 },
        { symbol: 'La', name: 'Lanthanum', row: 5, col: 2 },
        { symbol: 'Ac', name: 'Actinium', row: 6, col: 2 },
        { symbol: 'Ga', name: 'Gallium', row: 3, col: 12 },
        { symbol: 'In', name: 'Indium', row: 4, col: 12 },
        { symbol: 'Ti', name: 'Titanium', row: 3, col: 3 },
        { symbol: 'Nh', name: 'Nihonium', row: 6, col: 12 },
        { symbol: 'Si', name: 'Silicon', row: 2, col: 13 },
        { symbol: 'Ge', name: 'Germanium', row: 3, col: 13 },
        { symbol: 'Sn', name: 'Tin', row: 4, col: 13 },
        { symbol: 'Pb', name: 'Lead', row: 5, col: 13 },
        { symbol: 'Fl', name: 'Flerovium', row: 6, col: 13 },
        { symbol: 'As', name: 'Arsenic', row: 3, col: 14 },
        { symbol: 'Sb', name: 'Antimony', row: 4, col: 14 },
        { symbol: 'Bi', name: 'Bismuth', row: 5, col: 14 },
        { symbol: 'Mc', name: 'Moscovium', row: 6, col: 14 },
        { symbol: '7', name: 'Selenium', row: 3, col: 15 },
        { symbol: 'Te', name: 'Tellurium', row: 4, col: 15 },
        { symbol: 'Po', name: 'Polonium', row: 5, col: 15 },
        { symbol: 'Lv', name: 'Livermorium', row: 6, col: 15 },
        { symbol: 'Br', name: 'Bromine', row: 3, col: 16 },
        { symbol: 'I', name: 'Iodine', row: 4, col: 16 },
        { symbol: 'At', name: 'Astatine', row: 5, col: 16 },
        { symbol: 'Ts', name: 'Tennessine', row: 6, col: 16 },
        { symbol: '5', name: 'Rubidium', row: 4, col: 0 },
        { symbol: 'Cs', name: 'Cesium', row: 5, col: 0 },
        { symbol: 'Fr', name: 'Francium', row: 6, col: 0 },
        { symbol: 'Zr', name: 'Zirconium', row: 4, col: 3 },
        { symbol: 'Hf', name: 'Hafnium', row: 5, col: 3 },
        { symbol: 'Rf', name: 'Rutherfordium', row: 6, col: 3 },
        { symbol: 'Tl', name: 'Thallium', row: 5, col: 12 },
        { symbol: 'Kr', name: 'Krypton', row: 3, col: 17 },
        { symbol: '11', name: 'Xenon', row: 4, col: 17 },
        { symbol: 'Rn', name: 'Radon', row: 5, col: 17 },
        { symbol: 'Og', name: 'Oganesson', row: 6, col: 17 },
        { symbol: 'V', name: 'Vanadium', row: 3, col: 4 },
        { symbol: '6', name: 'Niobium', row: 4, col: 4 },
        { symbol: 'Ta', name: 'Tantalum', row: 5, col: 4 },
        { symbol: 'Db', name: 'Dubnium', row: 6, col: 4 },
        { symbol: 'Cr', name: 'Chromium', row: 3, col: 5 },
        { symbol: 'Mo', name: 'Molybdenum', row: 4, col: 5 },
        { symbol: 'W', name: 'Tungsten', row: 5, col: 5 },
        { symbol: 'Sg', name: 'Seaborgium', row: 6, col: 5 },
        { symbol: 'Mn', name: 'Manganese', row: 3, col: 6 },
        { symbol: 'Tc', name: 'Technetium', row: 4, col: 6 },
        { symbol: 'Re', name: 'Rhenium', row: 5, col: 6 },
        { symbol: 'Bh', name: 'Bohrium', row: 6, col: 6 },
        { symbol: '12', name: 'Iron', row: 3, col: 7 },
        { symbol: 'Co', name: 'Cobalt', row: 3, col: 8 },
        { symbol: 'Rh', name: 'Rhodium', row: 4, col: 8 },
        { symbol: 'Ir', name: 'Iridium', row: 5, col: 8 },
        { symbol: 'Mt', name: 'Meitnerium', row: 6, col: 8 },
        { symbol: 'Ni', name: 'Nickel', row: 3, col: 9 },
        { symbol: 'Pd', name: 'Palladium', row: 4, col: 9 },
        { symbol: '10', name: 'Platinum', row: 5, col: 9 },
        { symbol: 'Ds', name: 'Darmstadtium', row: 6, col: 9 },
        { symbol: 'Ru', name: 'Ruthenium', row: 4, col: 7 },
        { symbol: 'Os', name: 'Osmium', row: 5, col: 7 },
        { symbol: 'Hs', name: 'Hassium', row: 6, col: 7 },
        { symbol: '9', name: 'Copper', row: 3, col: 10 },
        { symbol: 'Ag', name: 'Silver', row: 4, col: 10 },
        { symbol: 'Au', name: 'Gold', row: 5, col: 10 },
        { symbol: 'Rg', name: 'Roentgenium', row: 6, col: 10 },
        { symbol: 'Zn', name: 'Zinc', row: 3, col: 11 },
        { symbol: 'Cd', name: 'Cadmium', row: 4, col: 11 },
        { symbol: 'Hg', name: 'Mercury', row: 5, col: 11 },
        { symbol: 'Cn', name: 'Copernicium', row: 6, col: 11 }
    ];  

    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const [selectedElements, setSelectedElements] = useState<(string | null)[]>(Array(4).fill(null));
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      const checkUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate('/signin');
        }
      };
      checkUser();
    }, [navigate]);
  
    const handleSelectSlot = (index: number) => {
      if (selectedElement) {
        const updatedElements = [...selectedElements];
        updatedElements[index] = selectedElement;
        setSelectedElements(updatedElements);
        setSelectedElement(null);
      } else {
        alert('Please select an element first!');
      }
    };
  
    const handleSubmit = async () => {
      const correctAnswers = ['H', 'He', 'Li', 'Be']; // Jawaban benar
      let calculatedScore = 0;
  
      selectedElements.forEach((element, index) => {
        if (element === correctAnswers[index]) {
          calculatedScore++;
        }
      });
  
      setScore(calculatedScore);
      setShowModal(true);
  
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          console.error('User not found or error occurred:', error);
          alert('Failed to retrieve user information.');
          return;
        }
  
        const updates = {
          user_id: data.user.id,
          score: calculatedScore,
          updated_at: new Date().toISOString(),
        };
  
        const { error: upsertError } = await supabase.from('quiz_scores').upsert(updates);
        if (upsertError) {
          console.error('Error saving score:', upsertError);
          alert('Failed to save your score. Please try again.');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    };
  
    const handleRestart = () => {
      setSelectedElements(Array(4).fill(null));
      setScore(0);
      setShowModal(false);
    };
  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Periodic Table Quiz</h1>
  
        {/* Periodic Table */}
        <div style={styles.tableContainer}>
          <div style={styles.table}>
            {periodicTable.map((element, index) => (
              <div
                key={index}
                style={{
                  ...styles.elementBox,
                  top: `${element.row * gridSize}px`,
                  left: `${element.col * gridSize}px`,
                }}
                onClick={() => setSelectedElement(element.symbol)}
              >
                <span style={styles.elementText}>{element.symbol}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Quiz Slots */}
        <div style={styles.gridContainer}>
          {selectedElements.map((element, index) => (
            <div
              key={index}
              style={styles.gridSlot}
              onClick={() => handleSelectSlot(index)}
            >
              {element || index + 1}
            </div>
          ))}
        </div>
  
        {/* Submit Button */}
        <button style={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
  
        {/* Modal for Score */}
        {showModal && (
          <div style={styles.modalContainer}>
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>Your Score</h2>
              <p style={styles.scoreText}>{score} / {selectedElements.length} Correct</p>
              <button style={styles.restartButton} onClick={handleRestart}>
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      height: '100vh',
      fontFamily: 'Poppins, sans-serif',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    tableContainer: {
      position: 'relative',
      width: `${40 * 18}px`,
      height: `${40 * 7}px`,
      marginBottom: '20px',
    },
    table: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    elementBox: {
      position: 'absolute',
      width: `${40 - 5}px`,
      height: `${40 - 5}px`,
      backgroundColor: '#e0e0e0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    elementText: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    gridSlot: {
      width: '60px',
      height: '60px',
      backgroundColor: '#e0e0e0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      border: '1px solid #000',
      margin: '5px',
      cursor: 'pointer',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    modalContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    modalTitle: {
      fontSize: '20px',
      marginBottom: '10px',
    },
    scoreText: {
      fontSize: '16px',
      marginBottom: '20px',
    },
    restartButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };
  
  export default QuizPage;