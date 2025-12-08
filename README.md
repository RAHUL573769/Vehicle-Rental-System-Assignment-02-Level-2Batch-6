🚗 Vehicle Rental System (Backend API)

A complete backend solution for managing a vehicle rental service.
This project supports vehicle management, bookings, authentication, and secure user handling — all built with modern technologies.

🔗 Live API URL:
👉 https://nodeproject-rose.vercel.app/

📌 Project Overview

The Vehicle Rental System allows users to browse available vehicles, book rentals, manage bookings, and update vehicle status. Admins can create, update, or delete vehicles and oversee booking records. The project follows a modular and scalable architecture built using Node.js + TypeScript.

✨ Features
🔒 Authentication

JWT-based secure authentication

Password hashing using Bcrypt

Role-based secure API access (Admin & User)

🚘 Vehicle Management

Add, edit, delete, and view vehicles

Vehicles contain rental price, type, and availability status

Automatic availability update after booking actions

📅 Booking System

Create new bookings with start and end dates

Auto calculation of rental price

Auto-update vehicle availability when:

Booking is created → status = booked

Booking is returned / expired → status = available

Booking is cancelled → status = available

🛠 CRUD Operations

Complete CREATE, READ, UPDATE, DELETE APIs

Fully RESTful architecture

🗄 Database

PostgreSQL with optimised schema

Proper validation checks and constraints

🧰 Technology Stack
Layer	Technology
Runtime	Node.js
Language	TypeScript
Database	PostgreSQL
Authentication	JWT
Password Security	Bcrypt
ORM / Query	Native SQL with pg library
Deployment	Vercel
