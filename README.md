# PeerMatch – Backend API

PeerMatch is a backend REST API for a professional networking platform.
It supports user authentication, profile management, connection requests,
and personalized user feed generation.

#Features
- User Signup & Login (JWT + Cookies)
- Secure Logout
- Profile View & Edit
- Send / Accept / Reject Connection Requests
- User Feed (excluding already connected users)
- Pagination support
- Input validation & error handling

#Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt
- Cookie-based auth

#API Modules
- /auth – Signup, Login, Logout
- /profile – View & Edit Profile
- /request – Send & Receive Connection Requests
- /user – Connections & Feed APIs

#API Testing
All APIs were tested using Postman.
(Postman collection can be added if required.)

#How to Run Locally
npm install
npm start

