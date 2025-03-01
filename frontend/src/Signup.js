// src/Signup.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import logo from './img/logo.jpg'; // Ensure this path is correct
import signupImage from './img/signup.png'; // Ensure this path is correct

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false); // State for dark mode

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://youtube-note-2.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            // If registration is successful, redirect the user
        if (result.success) {
            window.location.href = 'https://youtube-note.vercel.app/'; // Redirect to external URL
        } catch (error) {
            console.error('Signup Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
            {/* Top navbar start */}
            <section className="sticky-top navSection">
                <nav className="container navbar topnav navbar-expand-lg">
                    <a className="navbar-brand ms-2 commoncolor fs-2" href="/" style={{ color: '#7e22ce' }}><b>codewith_ziya</b></a>
                    <button id="darkModeToggle" className="border border-0 bg-transparent fs-3 me-2" aria-label="Toggle Dark Mode" onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} id="darkModeIcon" />
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-2 my-2" id="navmenu">
                            <Link className="nav-link textunderline" to="/">Home</Link>
                            <Link className="nav-link textunderline" to="/">Code</Link>
                            <Link className="nav-link textunderline" to="/">Videos</Link>
                            <Link className="nav-link textunderline" to="/">Contact Us</Link>
                            <Link to="/" className="nav-link mb-2 me-2 rounded-2 mybtn">Login</Link>
                            <Link to="/signup" className="nav-link mb-2 me-2 rounded-2 mybtn">Signup</Link>
                        </div>
                        <form className="d-flex" id="searchForm" role="search" method="get" action="search.html">
                            <input className="form-control me-2 mx-2" id="searchInput" name="query" type="search" placeholder="Search.." aria-label="Search" />
                            <button className="nav-link mb-2 me-2 rounded-2 mybtn text-light p-2" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </form>
                    </div>
                </nav>
                <hr />
            </section>

            {/* Signup Section */}
            <section className="mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <img src={signupImage} className="img-fluid bg-white" alt="Signup" />
                        </div>
                        <div className="col-sm-7 my-auto shadow p-3 rounded">
                            <h2>Create An Account</h2>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-12">
                                    <label htmlFor="validationCustomUsername" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            className="form-control" 
                                            placeholder="Enter Username" 
                                            id="validationCustomUsername" 
                                            aria-describedby="inputGroupPrepend" 
                                            required 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Create a Password" 
                                        required 
                                        className="form-control" 
                                        id="inputPassword4" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button type="submit" className="mybtn text-light p-2 rounded-2 border border-0 w-100">Register</button>
                                </div>
                            </form>
                            <div className="mt-3">
                                <Link to="/" className="nav-link">Already have an account? Login here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Start */}
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-around">
                        <div className="col-sm-7 d-flex">
                            <img src={logo} className="img-fluid" height="60px" width="60px" alt="Logo" />
                            <p className="my-auto">&nbsp;Copyright &copy; 2025 by codewith_ziya</p>
                        </div>
                        <div className="col-sm-5 d-flex justify-content-center my-auto">
                            <h5 className="me-2 my-auto">Follow <span className="commoncolor" style={{ color: '#7e22ce' }}>Us on :</span></h5>
                            <a href="https://www.instagram.com/codewith_ziya/profilecard/?igsh=eHR6Zzc1NWxodjE4" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="fs-2 me-3 commoncolor" />
                            </a>
                            <a href="https://www.youtube.com/@codewith_ziya" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} className="fs-2 me-3 commoncolor" />
                            </a>
                            <a href="https://github.com/ziyarashidd" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="fs-2 commoncolor" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer End */}
        </div>
    );
};

export default Signup;
