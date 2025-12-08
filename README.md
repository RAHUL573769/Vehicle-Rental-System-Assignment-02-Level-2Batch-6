Vehicle Rental System (Backend)

A backend API built with Node.js, TypeScript, PostgreSQL, and JWT
Authentication for managing vehicles, users, and rental bookings.

Setup & Installation

1. Clone the Repository

git clone cd vehicle-rental-system-backend

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file and add:

POSTGRES_DB_URL=your_postgres_connection_url JWT_SECRET=your_secret_key

4. Run the Project (Development Mode)

npm run dev

5. Build & Run in Production

npm run build npm start

API Overview

Authentication APIs

User roles: - Admin – Manage vehicles, users, and all bookings -
Customer – Register, view vehicles, create/manage own bookings

Endpoints: POST /api/v1/auth/signup POST /api/v1/auth/signin

Vehicle APIs

GET /api/v1/vehicles POST /api/v1/vehicles GET
/api/v1/vehicles/:vehicleId PUT /api/v1/vehicles/:vehicleId DELETE
/api/v1/vehicles/:vehicleId

Live API

https://nodeproject-rose.vercel.app/
