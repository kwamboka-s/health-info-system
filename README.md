# Health Information Management System

A comprehensive health information management system built with Express.js and Firebase for the backend and a frontend client application.

## Project Structure

The project is organized into two main directories:
- `server`: Contains the Express.js backend with Firebase integration
- `client`: Contains the frontend application

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Firebase account with a configured project

## Getting Started

Follow these steps to get the project up and running:

### Setting up the Backend Server

1. Open a terminal and navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The server will start running on `http://localhost:5000`. The API documentation will be available at `http://localhost:5000/api-docs`.

### Setting up the Frontend Client

1. Open a different terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the client development server:
```bash
npm run server
```

The client application will be available at `http://localhost:3000` (or the port specified by your client setup).

## API Endpoints

The server provides the following API endpoints:

### Authentication
- `POST /api/login`: User login
- `POST /api/register`: User registration
- `GET /api/user`: Get user information

### Clients
- `GET /api/clients`: Get all clients
- `GET /api/clients/:id`: Get client by ID
- `POST /api/clients`: Create a new client
- `PUT /api/clients/:id`: Update a client
- `GET /api/clients/search`: Search for clients

### Programs
- `GET /api/programs`: Get all programs
- `GET /api/programs/:id`: Get program by ID
- `POST /api/programs`: Create a new program
- `PUT /api/programs/:id`: Update a program

### Enrollments
- `GET /api/enrollments`: Get all enrollments
- `GET /api/clients/:clientId/enrollments`: Get client enrollments
- `GET /api/programs/:programId/enrollments`: Get program enrollments
- `POST /api/enroll`: Create a new enrollment

## Technologies Used

### Backend
- Express.js
- Firebase (Authentication & Firestore)
- TypeScript
- Swagger for API documentation

### Frontend
- Modern JavaScript/TypeScript framework
- API communication with the backend

## Development

The project uses nodemon for the backend development, which automatically restarts the server when file changes are detected.

## License

ISC