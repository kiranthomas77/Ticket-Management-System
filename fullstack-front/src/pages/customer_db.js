import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CustomerDashboard = () => {
  const location = useLocation();
  const customer = location.state?.customer;
  const [tickets, setTickets] = useState([]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketSeverity, setNewTicketSeverity] = useState('LOW');

  const fetchTickets = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/tickets/customer/${customer.id}`); // Adjust to your backend endpoint
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, [customer.id]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreateTicket = async () => {
    if (newTicketTitle.trim() !== '') {
      try {
        const newTicket = {
          title: newTicketTitle,
          status: 'OPEN',
          severity: newTicketSeverity,
          customer: { id: customer.id } // Assign the logged-in customer
        };
        const response = await axios.post('http://localhost:8080/tickets', newTicket); // Adjust to your backend endpoint
        setTickets([...tickets, response.data]);
        setNewTicketTitle('');
        setNewTicketSeverity('LOW');
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
    }
  };

  const handleDeleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tickets/${id}`); // Adjust to your backend endpoint
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Dashboard</h2>
      <div style={styles.customerInfo}>
        <p><strong>Customer:</strong> {customer.name} ({customer.username})</p>
      </div>

      <div style={styles.section}>
        <h5>Create Ticket</h5>
        <hr />
        <input
          type="text"
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
          placeholder="Enter ticket title"
          style={styles.input}
        />
        <select
          value={newTicketSeverity}
          onChange={(e) => setNewTicketSeverity(e.target.value)}
          style={styles.input}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button onClick={handleCreateTicket} className="btn btn-primary" style={styles.button}>Create</button>
      </div>

      <div style={styles.section}>
        <h5>My Tickets</h5>
        <hr />
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Agent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.severity}</td>
                <td>{ticket.agent ? ticket.agent.name : 'Unassigned'}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
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
  customerInfo: {
    marginBottom: '20px',
  },
  section: {
    marginBottom: '40px',
  },
  input: {
    width: '70%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    width: '70%',
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

export default CustomerDashboard;
