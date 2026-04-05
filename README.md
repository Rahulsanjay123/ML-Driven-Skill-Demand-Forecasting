# ML Skill Forecasting Ultimate

A full-stack web application for predicting skill demand using machine learning.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally on port 27017)

### Installation

1. **Clone or navigate to the project directory**

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers simultaneously.

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# or
node server.js
```
The backend will run on http://localhost:5001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

### Usage

1. Open http://localhost:5173 in your browser
2. Register a new account or login
3. Access the dashboard and other features

## API Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/predict` - Skill predictions (requires authentication)

## Technologies Used

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **ML Service:** Python, Flask (in ml-service directory)</content>
<parameter name="filePath">c:\Users\Rahul sanjay\OneDrive\Documents\ML-Skill-Forecasting-Ultimate\README.md