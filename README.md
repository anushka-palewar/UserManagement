# User Management System

This is a full-stack User Management application built using React, TypeScript, Node.js, Express, and MySQL.  
It allows users to perform basic operations such as adding, viewing, updating, and deleting user data.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript

### Database
- MySQL

---

## Features

- Add new user
- View all users
- Update user details
- Delete user
- Form validation

---

## Project Structure


UserManagement
│
├── backend
│ ├── database
│ │ └── schema.sql
│ │
│ ├── src
│ │ ├── config
│ │ ├── controllers
│ │ ├── models
│ │ ├── repositories
│ │ ├── routes
│ │ ├── services
│ │ └── index.ts
│ │
│ ├── .env
│ ├── package.json
│ └── tsconfig.json
│
├── frontend
│ ├── public
│ ├── src
│ │ ├── assets
│ │ ├── components
│ │ ├── hooks
│ │ ├── pages
│ │ ├── types
│ │ ├── utils
│ │ ├── App.tsx
│ │ └── main.tsx
│ │
│ ├── index.html
│ ├── package.json
│ └── vite.config.ts
│
├── screenshots
│ ├── ui1.png
│ └── ui2.png
│
├── .gitignore
├── package.json
└── README.md


---

## Setup Instructions

### 1. Clone the Repository


git clone https://github.com/anushka-palewar/UserManagement

cd UserManagement


---

### 2. Backend Setup


cd backend
npm install
npm run dev


---

### 3. Frontend Setup

Open a new terminal:


cd frontend
npm install
npm run dev


---

## Environment Variables

Create a `.env` file inside the backend folder:


PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=usermanagement


---

## Database Setup

Run the SQL file located at:


backend/database/schema.sql


This will create the required database and users table.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| POST   | /users       | Add user |
| GET    | /users       | Get all users |
| PUT    | /users/:id   | Update user |
| DELETE | /users/:id   | Delete user |

---

## Screenshots

![UI](./screenshots/ui1.png)  
![UI](./screenshots/ui2.png)

---

## Flow


Frontend → Backend → Database → Backend → Frontend


---

## Notes

- Backend follows route → controller → service → repository structure.
- Frontend is divided into components, hooks, and pages.
- Data is stored in MySQL and fetched through APIs.