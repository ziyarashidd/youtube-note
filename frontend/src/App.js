// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Signup from './Signup';
import './App.css'; // You can add your custom styles here

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AdminLogin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;