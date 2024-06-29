import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AgentDashboard = () => {
  const location = useLocation();
  const agent = location.state?.agent;
  const [customers, setCustomers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketSeverity, setNewTicketSeverity] = useState('LOW');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    fetchCustomers();
    fetchTickets();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users'); // Adjust to your backend endpoint
      const customers = response.data.filter(user => user.role === 'CUSTOMER');
      setCustomers(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`); // Adjust to your backend endpoint
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tickets'); // Adjust to your backend endpoint
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleCreateTicket = async () => {
    if (newTicketTitle.trim() !== '' && selectedCustomer) {
      try {
        const newTicket = {
          title: newTicketTitle,
          status: 'OPEN',
          severity: newTicketSeverity,
          customer: { id: selectedCustomer },
          agent: { id: agent.id } // Assign the agent creating the ticket
        };
        const response = await axios.post('http://localhost:8080/tickets', newTicket); // Adjust to your backend endpoint
        setTickets([...tickets, response.data]);
        setNewTicketTitle('');
        setNewTicketSeverity('LOW');
        setSelectedCustomer('');
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
      <h2>Agent Dashboard</h2>

      <div style={styles.section}>
        <h3>Customer List</h3>
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
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.username}</td>
                <td>{customer.name}</td>
                <td>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
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

      <div style={styles.section}>
        <h3>Create Ticket</h3>
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
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
        <button onClick={handleCreateTicket} className="btn btn-primary" style={styles.button}>Create</button>
      </div>

      <div style={styles.section}>
        <h3>Ticket List</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Agent</th>
              <th>Customer</th>
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
                <td>{ticket.customer ? ticket.customer.name : 'Unassigned'}</td>
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
  section: {
    marginBottom: '20px',
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

export default AgentDashboard;
