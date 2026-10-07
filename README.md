# Online Quiz System

A full-stack online quiz application built using HTML, CSS, JavaScript, Node.js, Express.js and MySQL.

## Features

- Multiple-choice online quiz
- Server-controlled timer
- Automatic score calculation
- Result storage in MySQL
- Admin question management
- Add and delete questions
- Server-side validation
- REST APIs
- Responsive user interface

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL

## Project Structure

online-quiz-system/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── style.css
│   └── script.js
│
└── README.md

## How to Run

1. Install Node.js and MySQL.
2. Create the `online_quiz` database.
3. Configure MySQL credentials in `.env`.
4. Install dependencies using:

npm install express mysql2 cors dotenv

5. Start the backend:

node backend/server.js

6. Open `frontend/index.html` using Live Server.

## Database

The system contains:

- Questions table
- Results table

## Author

Kaniha T