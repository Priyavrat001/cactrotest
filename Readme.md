# 🎟️ Event Booking System

A scalable backend API for an **Event Booking System** built with **Node.js**, **Express.js**, and **MongoDB**.

The platform supports two types of users:

- 👨‍💼 Event Organizers
- 👥 Customers

Event Organizers can create and manage events, while Customers can browse events and book tickets securely.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- User Registration & Login
- JWT Authentication
- Role-Based Access Control
- Secure Password Hashing using bcrypt
- HTTP-Only Cookie Authentication

---

## 👨‍💼 Organizer Features
- Create Events
- Update Event Details
- Delete Events
- View All Created Events
- Manage Ticket Availability

---

## 👥 Customer Features
- Browse All Events
- View Single Event Details
- Book Tickets
- Cancel Bookings
- View Booking History

---

## ⚙️ Background Jobs
- Async Job Queue Support
- Email Notifications
- Ticket Confirmation Processing
- Scheduled Event Reminders

---

# 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Backend Runtime |
| Express.js | API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Handling |

---

# 📂 Folder Structure

```bash
project/
│
├── controllers/
├── middleware/
├── features/
├── models/
├── routes/
├── config/
├── app.js
└── package.json
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

# 📦 Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 🌐 API Base URL

```bash
http://localhost:5000/api/v1
```

---

# 🔐 Authentication Routes

## Register User

### Endpoint

```http
POST /user/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456", //minmum length should be 6
  "role": "customer"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```http
POST /user/login
```

### Request Body

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
}
```

---

## Logout User

### Endpoint

```http
GET /user/logout
```

### Response

```json
{
  "success": true,
  "message": "Logout successful",
}
```

---

# 🎫 Event Routes

## Create Event

### Endpoint

```http
POST /event/create-event
```

### Protected Route
- Organizer Only

### Request Body

```json
{
  "title": "Music Concert",
  "description": "Live concert event",
  "date": "2026-05-20",
  "location": "Delhi",
  "totalTickets": 200,
  "price:: 100
}
```

### Response

```json
{
  "success": true,
  "message": "Event created successfully"
}
```

---

## Get All Events

### Endpoint

```http
GET /event/get-events
```

### Response

```json
{
  "success": true,
  "events": []
}
```

---

## Get Single Event

### Endpoint

```http
GET /event/get-event/:id
```
---
### Response

```json
{
  "success": true,
  "event": {}
}
```
---

## Update Event

### Endpoint

```http
PUT /event/update-event/:id
```

---

### Request Body

```json
{
  //anything you want to update like title price
}
```

### Response

```json
{
  //here i updated the title
  "success": true,
  "message": "Event updated successfully",
  "event": {
    "_id": "6a1309824a10e7f006b00df7",
    "title": "Comedy Show",
    "description": "Live concert event",
    "date": "2026-05-20T00:00:00.000Z",
    "location": "Delhi",
    "totalTickets": 200,
    "availableTickets": 194,
    "organizer": "6a0db6df9aea832a755744e9",
    "price": 100,
    "createdAt": "2026-05-24T14:21:54.385Z",
    "updatedAt": "2026-05-25T12:51:48.135Z",
    "__v": 0
  }
```
---

## Delete Event

### Endpoint

```http
DELETE /event/delete-event/:id
```

---

# 🎟️ Booking Routes

## Coustomer Only

## Book Ticket

### Endpoint

// How many ticket do you want to book i took that from req.query
```http
POST /ticket-booking/book-ticket/:eventId?quantity
```

### Protected Route
- Customer Only

### Response

```json
{
  "success": true,
  "message": "Ticket booked successfully"
}
```

---

## Cancel Booking

### Endpoint

```http
DELETE /ticket-booking/cancel-ticket/:id
```

---

## My Bookings

### Endpoint

```http
GET /ticket-booking/my-bookings
```

---

# 🛡️ Authorization Roles

| Role | Permissions |
|------|-------------|
| Organizer | Manage Events |
| Customer | Book Tickets | Browse All The Events |

---

# 🔄 Background Job Examples

- Sending confirmation emails
- Sending Update Event Email/Notifactions

---

# 📌 Future Improvements

- Real Email And Notifaction Functionalty Integration
- Payment Gateway Integration
- Real-Time Seat Selection
- QR Code Tickets
- Event Analytics Dashboard
- Admin Panel
- Redis Queue Integration
- Rate Limiting

---

# 👨‍💻 Author

Developed by **Priyavrat Kumar**
