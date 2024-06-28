import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    navigate('/admin-dashboard');
  };

  return (
    <div style={styles.loginContainer}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" style={styles.input}/>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" style={styles.input}/>
        </div>
        <button type="submit" className="btn btn-primary" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  loginContainer: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
  },
};

export default AdminLogin;
