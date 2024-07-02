# Ticket Management System

## Project Overview

The Ticket Management System is a web application designed to help an organization manage support tickets efficiently. It allows support agents to track and resolve customer issues, and customers to create and manage their tickets. The system is divided into four modules: Admin, Agent, Customer, and Tickets.

## Technologies Used

- **Backend:** Java with Spring Boot
- **Frontend:** React
- **Database:** MySQL

## Project Structure

### Backend

- **Controllers:** Handle HTTP requests and responses
- **Models:** Define the data structures
- **Repositories:** Interface for database operations
- **Services:** Contain business logic

### Frontend

- **Components:** React components for the UI
- **Pages:** Different pages for Admin, Agent, and Customer views
- **Services:** Handle API calls

## Database Design

### Tables

1. **User**
   - `id`: Primary key, auto-increment
   - `username`: String
   - `password`: String
   - `role`: Enum (`AGENT`, `CUSTOMER`)
   - `name`: String

2. **Ticket**
   - `id`: Primary key, auto-increment
   - `title`: String
   - `status`: Enum (`OPEN`, `IN_PROGRESS`, `CLOSED`)
   - `severity`: Enum (`LOW`, `MEDIUM`, `HIGH`)
   - `agent_id`: Foreign key to `User` table

## API Endpoints

### User Management

#### Admin

- **Create User:** `POST /admin/users`
- **Get All Users:** `GET /admin/users`
- **Get User by ID:** `GET /admin/users/{id}`
- **Update User:** `PUT /admin/users/{id}`
- **Delete User:** `DELETE /admin/users/{id}`

### Ticket Management

#### Agent

- **Create Ticket:** `POST /agent/tickets`
- **Get All Tickets:** `GET /agent/tickets`
- **Get Ticket by ID:** `GET /agent/tickets/{id}`
- **Update Ticket:** `PUT /agent/tickets/{id}`
- **Delete Ticket:** `DELETE /agent/tickets/{id}`

#### Customer

- **Create Ticket:** `POST /customer/tickets`
- **Get All Tickets:** `GET /customer/tickets`
- **Get Ticket by ID:** `GET /customer/tickets/{id}`
- **Update Ticket:** `PUT /customer/tickets/{id}`
- **Delete Ticket:** `DELETE /customer/tickets/{id}`

## Diagrams

### Use Case Diagram
![Use Case Diagram](path/to/TMS Use Case Diagram.jpg)

### ER Diagram
![ER Diagram](path/to/TMS ERD.jpg)

## Testing

### Postman: Used to test the backend endpoints.

You can use the provided Postman collection to test the API endpoints. Import the collection into Postman and execute the requests to interact with the Ticket Management System. The Postman collection is located in the `postman` folder of the repository.

## Contributors

- Kiran Thomas George Tharakan

