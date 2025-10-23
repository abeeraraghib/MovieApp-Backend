# 🎬 Movie App Backend

This is the backend API for the Movie App, built with NestJS and TypeORM. It handles user authentication, movie management (CRUD), and serves data to the frontend.

🚀 Features

- User registration and login (JWT-based authentication)
- CRUD operations for movies
- Search movies by title or genre
- Filter movies by categories
- Manage favorite movies
- RESTful API with structured routes
- Error handling and validation

🛠 Tech Stack

- Backend Framework: NestJS
- Database: PostgreSQL 
- Authentication: JWT
- Environment Management: dotenv
- Hosting: Local

🛠 Base URL

```
http://localhost:5000
```


---

## **Auth / Users Endpoints**

### **Register User**

* **POST** `/users/register-user`
* **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

* **Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### **Get All Users**

* **GET** `/users/get-all-users`
* **Response:**

```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" }
]
```

### **Get User by ID**

* **GET** `/users/find-one/:id`
* **Response:**

```json
{ "id": 1, "name": "John Doe", "email": "john@example.com" }
```

### **Update User**

* **PATCH** `/users/update/:id`
* **Body:**

```json
{ "name": "John Updated", "email": "johnupdated@example.com" }
```

* **Response:**

```json
{ "id": 1, "name": "John Updated", "email": "johnupdated@example.com" }
```

### **Delete User**

* **DELETE** `/users/delete/:id`
* **Response:**

```json
{ "message": "User deleted successfully" }
```

### **Get Profile (Logged-in User)**

* **GET** `/users/profile/me`
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`
* **Response:**

```json
{ "id": 1, "name": "John Doe", "email": "john@example.com" }
```

---

## **Movies Endpoints**

### **Create Movie**

* **POST** `/movies/movies`
* **Body:**

```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "description": "A mind-bending thriller",
  "releaseDate": "2010-07-16"
}
```

* **Response:**

```json
{ "id": 1, "title": "Inception", "genre": "Sci-Fi" }
```

### **Get All Movies**

* **GET** `/movies/get-all-movies`
* **Response:** Array of movies.

### **Get Movies by Genre**

* **GET** `/movies/genres/:genre`
* **Response:** Array of movies matching the genre.

### **Get Movie by ID**

* **GET** `/movies/findOne/:id`
* **Response:** Movie object.

### **Update Movie**

* **PATCH** `/movies/update/:id`
* **Body:** Movie fields to update.
* **Response:** Updated movie object.

### **Delete Movie**

* **DELETE** `/movies/delete/:id`
* **Response:** Confirmation message.

---

## **Favorites Endpoints**

### **Get All Favorites**

* **GET** `/favorites`
* **Response:** Array of all favorites.

### **Get User Favorites**

* **GET** `/favorites/:userId`
* **Response:** Array of favorite movies for that user.

### **Add Favorite**

* **POST** `/favorites/add`
* **Body:**

```json
{ "userId": 1, "movieId": 5 }
```

* **Response:**

```json
{ "message": "Movie added to favorites" }
```

### **Remove Favorite**

* **DELETE** `/favorites/remove`
* **Body:**

```json
{ "userId": 1, "movieId": 5 }
```

* **Response:**

```json
{ "message": "Movie removed from favorites" }
```

---

## **Mail Endpoints**

### **Send Email**

* **POST** `/mail/send`
* **Body:**

```json
{
  "to": "user@example.com",
  "subject": "Hello from Movie App",
  "text": "This is a test email."
}
```

* **Response:**

```json
{ "message": "Email sent successfully!" }
```

---

## **Notes**

* JWT authentication is required for protected routes (like `/users/profile/me`).
* Use **Postman** to test API endpoints.
* All IDs in endpoints are integers.


