# 🎬 Movie App Backend

This is the **backend API** for the Movie App. It provides authentication, movie management, user management, and favorites management for both **Admin** and **User** roles.

---

## 🌟 Features

### **User Features**
- Register and login
- Search movies by **title** 
- Add and remove movies from **favorites**
- View favorite movies list

### **Admin Features**
- Add new movies
- Edit or delete movies
- Manage users (**view, edit role, delete**)
- View users’ favorite movies

---

## 🛠️ Technologies Used
- **Backend Framework:** Node.js NestJS 
- **Database:** PostgreSQL
- **ORM:** TypeORM 
- **Authentication:** JWT Token
- **Password Security:** bcrypt
- **API Docs:** Swagger

---

## 🚀 Getting Started

## Install dependencies
npm install


## Start the server

npm run start:dev   

Backend runs on:
http://localhost:5000

---

## 📡 API Endpoints

**Auth**

- POST /auth/register → Register new user
- POST /auth/login → Login and get token

**Movies**

- POST /movies/movies → create movie
- GET /movies/get-all-movies → get all movies
- GET /movies/genres/:genre → get movies by genre
- GET /movies/findOne/:id → get single movie
- PATCH /movies/update/:id → update movie
- DELETE /movies/delete/:id → delete movie

**Mail**

- POST /mail/send → send emai

**Users**

- GET /users → Get all users (Admin only)
- PUT /users/:id → Update user role (Admin only)
- DELETE /users/:id → Delete user (Admin only)

**Favorites**

- GET /favorites → get all favorites
- GET /favorites/:userId → get favorites by userId
- POST /favorites/add → add favorite
- DELETE /favorites/remove → remove favorite

**Users**

- POST /users/register-user → Create user
- GET /users/get-all-users → Get all users
- GET /users/find-one/:id → Get user by ID
- PATCH /users/update/:id → Update user
- DELETE /users/delete/:id → Delete user
- GET /users/profile/me → Get logged-in user profile (JWT required)
  
---

## ⚙️ Usage

- Run the backend server with npm run start:dev.
- Connect the frontend app to http://localhost:5000.
- Use Postman or Swagger Docs (if enabled) to test API endpoints.

--- 

## 💻 Author

Abeera Raghib – https://github.com/abeeraraghib/



