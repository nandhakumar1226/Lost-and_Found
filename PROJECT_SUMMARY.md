# 🎓 College Lost & Found Full-Stack Web Application — Project Summary & Handover Document

## 🌐 Live Cloud Application Links

* **Live Frontend Website (Vercel)**: [https://lost-and-found-acme-d3f0.vercel.app](https://lost-and-found-acme-d3f0.vercel.app)
* **Live Spring Boot API Backend (Render)**: `https://lost-and-found-nc49.onrender.com/api`
* **GitHub Repository**: [https://github.com/nandhakumar1226/Lost-and_Found](https://github.com/nandhakumar1226/Lost-and_Found)

---

## 🔑 Demo Access Credentials

| Account Role | Email Address | Password | Functionality |
| :--- | :--- | :--- | :--- |
| **Administrator 1** | `jegan@gmail.com` | `jegan123` | Admin Dashboard, Claim Approvals/Rejections, Item & User/Password Management |
| **Administrator 2** | `nandha@gmail.com` | `Nandha@2007` | Admin Dashboard, Claim Approvals/Rejections, Item & User/Password Management |
| **Student** | `student@college.edu` | `student123` | Report Lost Item, Report Found Item, Smart Match, Claim Item, Track Claims & Activity |

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Outfit/Plus Jakarta Sans Fonts
- **Backend**: Java 17 + Spring Boot 3 + Spring Data JPA + Spring Security (JWT)
- **Database**: H2 (In-memory zero-config for local development) / Cloud MySQL for production

---

## ✨ Features Added & Rectified

1. 🌐 **Public Landing Page (`LandingPage.tsx`)**: Served at `/` with hero banner, live stats, 3-step process guide, and active items directory.
2. 🎨 **Handcrafted Design System**: Glassmorphic cards, ambient gradient mesh background, custom typography, glowing borders.
3. 🌓 **Theme Switcher**: Instant toggling between **Bright / Light Mode**, **Dark Mode**, and **System Default Mode**.
4. 🔑 **Forgot Password & Identity Verification**: Self-service password reset modal using registered email and phone verification.
5. 🖼️ **Category Photo Placeholders**: Automatic category-aware placeholder artwork for items reported without photos.
6. 🛡️ **Admin User & Password Management**: Admins can view user registry, edit details, toggle active access, and directly **reset/override user passwords**.

---

## 🚀 How to Run Locally

### 1. Run Spring Boot Backend (Port 8080)
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### 2. Run React Frontend (Port 5173)
```powershell
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📤 How to Push to Your Own GitHub Repository

```powershell
git init
git add .
git commit -m "Complete College Lost & Found Web Application"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Lost-and-Found.git
git push -u origin main
```
