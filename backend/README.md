
# Safi Seaside Tours - Backend

This directory contains the Node.js, Express, and MongoDB backend for the Safi Seaside Tours application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community). You can install it locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

## Setup Instructions

### 1. Install Dependencies

Navigate into the `backend` directory and install the required npm packages.

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a file named `.env` in the `backend` directory. You can copy the example file to get started:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required values:

- `PORT`: The port number for the backend server (e.g., `5000`).
- `MONGO_URI`: Your MongoDB connection string.
  - If running MongoDB locally, it will likely be `mongodb://localhost:27017/safiseasidetours`.
  - If using MongoDB Atlas, get the connection string from your cluster dashboard.
- `JWT_SECRET`: A long, random, secret string used for signing authentication tokens (e.g., `a_very_long_and_secret_string_for_jwt`).
- `API_KEY`: Your Google Gemini API Key. This is now used securely on the server-side.

### 3. Populate the Database (Data Seeding)

This project includes a seeder script to import all the initial tour data from the JSON files into your MongoDB database.

**Important:** Make sure your MongoDB server is running and your `MONGO_URI` in the `.env` file is correct before running this script.

To import the data, run:

```bash
npm run data:import
```

This command will connect to your database, clear any existing collections, and insert the data from the `/data` directory. You only need to run this once.

If you need to clear the data later, you can run:
```bash
npm run data:destroy
```

### 4. Start the Backend Server

Once the setup is complete, you can start the backend server.

```bash
npm start
```

For development, you can use `nodemon` to automatically restart the server when files change:

```bash
npm run dev
```

The server will start, connect to the database, and will be ready to accept API requests, by default on `http://localhost:5000`.

## API Endpoints

The server exposes a RESTful API for the frontend to consume. All endpoints are prefixed with `/api`.

- **Authentication**: `POST /api/auth/login`
- **Tours**: `GET /api/tours`, `GET /api/tours/:id`, `POST /api/tours`, `PUT /api/tours/:id`, `DELETE /api/tours/:id`
- **Bookings**: `GET /api/bookings/tours`, `POST /api/bookings/tour`, `GET /api/bookings/airport`, `POST /api/bookings/airport`
- **Reviews**: `GET /api/tours/:id/reviews`, `POST /api/tours/:id/reviews`

Admin-only routes (like POST, PUT, DELETE for tours) are protected and require a valid JWT token in the `Authorization` header.
