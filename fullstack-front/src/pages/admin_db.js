import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentUsername, setNewAgentUsername] = useState('');
  const [newAgentPassword, setNewAgentPassword] = useState('');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/users'); // Adjust to your backend endpoint
      const agents = response.data.filter(user => user.role === 'AGENT');
      setAgents(agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleCreateAgent = async () => {
    if (newAgentName.trim() !== '' && newAgentUsername.trim() !== '' && newAgentPassword.trim() !== '') {
      try {
        const newAgent = {
          username: newAgentUsername,
          password: newAgentPassword,
          role: 'AGENT',
          name: newAgentName,
        };
        const response = await axios.post('http://localhost:8080/admin/users', newAgent); // Adjust to your backend endpoint
        setAgents([...agents, response.data]);
        setNewAgentName('');
        setNewAgentUsername('');
        setNewAgentPassword('');
      } catch (error) {
        console.error('Error creating agent:', error);
      }
    }
  };

  const handleDeleteAgent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${id}`); // Adjust to your backend endpoint
      setAgents(agents.filter(agent => agent.id !== id));
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.section}>
        <h5>Create Agent</h5>
        <hr />
        <input
          type="text"
          value={newAgentUsername}
          onChange={(e) => setNewAgentUsername(e.target.value)}
          placeholder="Enter agent username"
          style={styles.input}
        />
        <input
          type="password"
          value={newAgentPassword}
          onChange={(e) => setNewAgentPassword(e.target.value)}
          placeholder="Enter agent password"
          style={styles.input}
        />
        <input
          type="text"
          value={newAgentName}
          onChange={(e) => setNewAgentName(e.target.value)}
          placeholder="Enter agent name"
          style={styles.input}
        />
        <button onClick={handleCreateAgent} className="btn btn-primary" style={styles.button}>Create</button>
      </div>

      <div style={styles.section}>
        <h5>Agent List</h5>
        <hr />
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td>{agent.id}</td>
                <td>{agent.username}</td>
                <td>{agent.name}</td>
                <td>
                  <button
                    onClick={() => handleDeleteAgent(agent.id)}
                    className="btn btn-danger"
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: '40px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
  },
  deleteButton: {
    marginLeft: '10px',
  },
};

export default AdminDashboard;
