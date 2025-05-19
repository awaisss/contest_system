# 🏆 Contest Participation System

A full-stack Node.js + MySQL-based backend system for managing user participation in contests, role-based access control, question handling, scoring, leaderboards, and prize distribution.

---

## 📦 Tech Stack

- **Node.js** with **Express.js**
- **MySQL** (local instance)
- **Sequelize ORM**
- **JWT Authentication**
- **Role-based Access Control**
- **Rate Limiting**
- **Postman** (for testing APIs)

---

## 👥 User Roles

| Role   | Description | Access |
|--------|-------------|--------|
| Admin  | Full control over all contests and users | All contests (Normal + VIP) |
| VIP    | Premium access | All contests |
| Normal | Standard registered user | Normal contests only |
| Guest  | Unauthenticated | Can only view contest details |

---

## ✅ Features

- 🔒 Role-based contest access
- ❓ Contest types with single-select, multi-select, and true/false questions
- 🧮 Auto score calculation upon submission
- 🏆 Prizes awarded to top scorers
- 📊 Leaderboard and ranking logic
- 📜 Participation history and in-progress tracking
- 🚫 Rate limiting to prevent abuse
- ⚙️ Full API documentation via Postman

---

## 🛠️ Installation & Setup

### 1. ✅ Prerequisites

- Node.js (v18+ recommended)
- MySQL installed locally
- npm

---

### 2. 🧾 Create MySQL Database

Open your MySQL client and create an empty schema:

```sql
CREATE DATABASE contest_participation_db;
```

### 3. 🧾 Installed the dependencies via
npm install


### 4. 🧾 Run the seeder via 
npm run seed (and provide your local mysql password)

### 5. 🧾 Run the application via 
npm run dev(watch mode with nodemon) OR npm start

### 6. 🧾 Import the postman collection via ContestParticipationSystem.postman_collection.json kept at root directory


