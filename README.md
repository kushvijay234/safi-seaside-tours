<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Safi Seaside Tours

Welcome to Safi Seaside Tours, a full-stack web application for browsing and booking exciting tours. This project features a React frontend and a Node.js/Express backend, with AI-powered features provided by the Google Gemini API.

## Features

*   **Tour Management:** Admins can create, read, update, and delete tour packages.
*   **User Authentication:** Secure login for administrators to manage site content.
*   **Tour Bookings:** Users can book tours and airport transfers.
*   **Customer Reviews:** Users can leave reviews and ratings for tours they've experienced.
*   **AI-Powered Content:** Utilizes Google's Gemini API for generating engaging content (e.g., tour descriptions).

## Technology Stack

*   **Frontend:** React
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)
*   **AI:** Google Gemini API

## Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (v16 or later recommended)
*   MongoDB. You can install it locally or use a cloud service like MongoDB Atlas.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/safi-seaside-tours.git
cd safi-seaside-tours
```

### 2. Backend Setup

First, navigate to the backend directory and set up the server.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory by copying the example file:

```bash
cp .env.example .env
```

Open the `.env` file and provide the necessary values:

*   `PORT`: The port for the backend server (e.g., `5000`).
*   `MONGO_URI`: Your MongoDB connection string.
*   `JWT_SECRET`: A long, random string for signing JWTs.
*   `API_KEY`: Your Google Gemini API Key.

With the backend configured, seed the database with initial tour data. Make sure your MongoDB server is running.

```bash
npm run data:import
```

Now, start the backend development server:

```bash
npm run dev
```

The backend server will be running on `http://localhost:5000` (or your specified `PORT`).

### 3. Frontend Setup

Open a new terminal window, navigate to the `frontend` directory, and install its dependencies.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory. You will need to specify the backend API endpoint.

```
VITE_API_URL=http://localhost:5000
```

Finally, start the frontend development server:

```bash
npm run dev
```

Your React application will now be running, and you can view it in your browser, typically at `http://localhost:5173`.
