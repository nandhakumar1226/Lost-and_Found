# 🎓 Campus Lost & Found — Full-Stack Web Application

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)

An official college web platform designed to streamline reporting lost items, submitting found property, calculating automated smart matches, and managing admin verification workflows.

---

## ✨ Features

- 🌐 **Public Landing Page**: Modern homepage with hero section, live stats, 3-step process guide, and recent reports directory.
- 🎨 **Handcrafted Design System**: Glassmorphism, ambient gradient mesh background, custom typography (*Outfit* & *Plus Jakarta Sans*), and glowing cards.
- 🌓 **Theme Switcher**: Instant toggling between **Bright / Light Mode**, **Dark Mode**, and **System Default**.
- 🔍 **Automated Smart Matching**: Jaccard token similarity engine that matches lost items with reported found property based on category, location, and description.
- 🔑 **Forgot Password & Verification**: Self-service password reset modal using registered email and phone verification.
- 🖼️ **Category Photo Placeholders**: Automatic category-aware placeholder artwork for items reported without photos.
- 🛡️ **Comprehensive Admin Portal**:
  - Dashboard analytics & item statistics.
  - Approve or reject student claim requests.
  - **User & Password Management**: View student registry, edit contact details, toggle active access, and directly **reset/override user passwords**.

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Java 17+, Spring Boot 3, Spring Data JPA, Spring Security (JWT).
- **Database**: H2 (In-memory zero-config local testing) / MySQL (Production cloud database).

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Administrator 1** | `jegan@gmail.com` | `jegan123` | Full Admin Dashboard, User & Password Management, Claim Verification |
| **Administrator 2** | `nandha@gmail.com` | `Nandha@2007` | Full Admin Dashboard, User & Password Management, Claim Verification |
| **Student** | `student@college.edu` | `student123` | Report Lost/Found, Browse Directory, Submit Claims, Track Activity |

---

## 🚀 How to Run Locally

### Prerequisites
- **Java JDK 17+**
- **Node.js (v18+)**

### 1. Run Backend (Spring Boot API)
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
*API runs on `http://localhost:8080/api` with embedded H2 database and pre-seeded demo data.*

### 2. Run Frontend (Vite React UI)
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173/`.*

---

## 🌐 Cloud Deployment Instructions

### 1. Push to GitHub
```powershell
git init
git add .
git commit -m "Initial commit of Lost and Found project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### 2. Deploy Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set Environment Variable `VITE_API_BASE_URL` = `https://your-backend-url/api`.
4. Deploy!

### 3. Deploy Backend on Render
1. Create Web Service on [Render](https://render.com).
2. Set Root Directory to `backend`.
3. Build Command: `./mvnw clean package -DskipTests`
4. Start Command: `java -jar target/lostfound-backend-1.0.0.jar`
5. Deploy!

---

## 📄 License
This project is open-source and available for college educational and administrative deployment.
