import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PeriodicTable from './pages/PeriodicTable';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LevelSelectionPage from './pages/LevelSelectionPage';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <div className="main-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="/signin" />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/periodictable" element={<PeriodicTable />} />
                    <Route path="/levelselectionpage" element={<LevelSelectionPage />} />
                    <Route path="/quizpage" element={<QuizPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
