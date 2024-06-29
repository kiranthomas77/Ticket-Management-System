import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="App-header">
        <div className="button-box">
          <nav className="nav-buttons">
            <Link className="btn btn-outline-primary btn-lg" to="/admin-login">
              Admin Login
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/agent-login">
              Agent Login
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/customer-login">
              Customer Login
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
