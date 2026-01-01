# 🎓 StudoSphere

**StudoSphere** is an all-in-one campus productivity and placement platform designed for students and placement heads. It offers role-based features like forums, smart job filtering, a collaborative todo list, real-time chat, faculty management, and a scalable mailing system—all backed by modern web technologies and AI integrations.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Role-based login for **Students** and **Placement Heads**
- OAuth 2.0 with Google via Passport.js
- Secure session handling with Passport Sessions
- Authorization middleware to protect routes and features

---

### 🎨 Theme & Personalization
- Multiple color themes including **Dark** and **Light** mode
- User settings for theme selection and personalization

---

## 👨‍🎓 Student Dashboard

### 📁 Profile
- View and update profile info (name, CGPA, skills)
- Update profile picture
- Upload resume up to 100MB via Cloudinary
- Skill management with duplicate prevention

### 💬 Forums
- Real-time messaging with **Socket.IO**
- Message categorization using **Hugging Face LLaMA API**:
  - *General, Lost & Found, Career, Campus Life*
- Replies allowed only to original (top-level) messages — no nested replies
- Image sharing up to 100MB
- Copy, quote, and manage messages

### 🏫 Faculty Cabins
- Upload/download faculty data via Excel
- Smart search by name, department, designation
- Apply dynamic filters for quick lookup

### ✅ ToDo List
- Add, edit, delete todos
- Time slot grid for quick deadline selection
- FullCalendar integration for day/week/month views
- Share todos with peers (auto-syncs to their **Google Calendar**)
- Mark todos as complete/incomplete
- Tag-based search and filtering

### 🤖 Chatbot
- Casual chatbot using LLaMA API
- Real-time socket streaming
- Copy prompts or responses

### 💼 Jobs
- Browse jobs posted by the placement head
- Apply with a single click (resume auto-attached if available)
- View job status: **In Review**, **Shortlisted**, **Rejected**
- Smart filter: by skills, CGPA, applied jobs
- Search jobs by title, company, batch, and more

---

## 🧑‍💼 Placement Head Dashboard

### 📬 Bulk Mailer System
- Upload Excel list of recipients (must contain `"Email"` field)
- Add **CC**, **BCC**, and file attachments (up to 100MB)
- Compose messages in a built-in **Monaco Code Editor** (HTML or plain text)
- Live preview of HTML content
- Uses:
  - **Nodemailer** for email sending
  - **BullMQ** with **Redis** for background job queueing
- Robust delivery and scalable email dispatch

### 💼 Job Management
- Post new jobs with validation
- Smart search and filter by job attributes
- View applicants and their resumes
- Shortlist or reject candidates
  - Sends automated emails based on decision
  - Status reflected on student dashboards
- **See number of applicants per job**

### 🏫 Shared Features
- Faculty Cabin management
- ToDo List with calendar integration
- Chatbot access

---

## 🛡 Security
- Secure role-based access via middleware
- OAuth 2.0 for authenticated login
- Protected APIs and UI components

---

## 🧰 Tech Stack

| Layer       | Tech Stack |
|-------------|------------|
| Frontend    | React, Tailwind CSS, Socket.IO, Monaco Editor |
| Backend     | Node.js, Express.js, Passport.js |
| Database    | MongoDB with Mongoose |
| Auth        | Google OAuth 2.0 (Passport) |
| File Upload | Cloudinary |
| Calendar    | Google Calendar API |
| AI          | Hugging Face LLaMA API |
| Mailing     | Nodemailer, Redis, BullMQ |
| Deployment  | Render |

---

## 📸 Live Demo

🔗 [StudoSphere on Render](https://studosphere.onrender.com)

---

## 👤 Author

**Mayank Arora**  
GitHub: [@MayankA25](https://github.com/MayankA25)

---

All rights reserved.

This project is proprietary and confidential. Unauthorized copying, modification, or distribution is strictly prohibited.

