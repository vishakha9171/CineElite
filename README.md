<div align="center">

# 🎬 CineElite

**A full-stack movie ticket booking platform built with the MERN stack.**

Browse movies • Watch trailers • Add to favorites • Select date and time slot • Book seats • Pay securely • check booking history • Manage shows,booking,users from an admin dashboard

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)](https://clerk.com/)

[Live Demo]( https://cineelite-j4ln.onrender.com)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Folder Structure](#-architecture--folder-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage Guide](#-usage-guide)
  - [User Flow](#user-flow)
  - [Admin Flow](#admin-flow)
- [Background Jobs (Inngest)](#-background-jobs-inngest)
- [Email Notifications](#-email-notifications)
- [Payment & Webhook Security](#-payment--webhook-security)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📌 About The Project

**CineElite** is a full-stack movie ticket booking web application I built as a personal learning project, inspired by platforms like BookMyShow and Fandango. The goal was to go beyond tutorials and build a complete, real-world product end to end — covering everything from browsing movies and trailers, to seat selection, secure payments, automated notifications, and an admin dashboard for managing shows and bookings.

I used this project to learn and practice integrating real third-party services into a MERN application — authentication, payments, webhook verification, and event-driven background jobs — rather than just building CRUD features in isolation.

---

## ✨ Features

### 🧑‍💻 User Features
- **Authentication** — Secure sign-up/login via [Clerk](https://clerk.com), with session and user management handled out of the box.
- **Live Movie Catalog** — Now-playing movies, posters, overviews, cast, and trailers pulled dynamically from the [TMDB API](https://www.themoviedb.org/documentation/api).
- **Movie Details Page** — Full cast list, trailer playback, and show details before booking.
- **Showtime & Date Selection** — Pick from available dates and times for any movie.
- **Interactive Seat Layout** — Visual seat map with real-time occupied/available status; users can select up to **5 seats** per booking.
- **Secure Checkout** — Payment processed via [Stripe](https://stripe.com), supporting card and other standard payment methods.
- **Booking History** — A dedicated "My Bookings" page listing all past and upcoming bookings with status.
- **Automated Seat Release** — Unpaid seat holds are automatically released back into inventory after **10 minutes** via a background job, preventing inventory lock-up.
- **Transactional Emails** — Automatic emails for booking confirmation, new movie releases, and showtime reminders.

### 🛠️ Admin Features
- **Role-Restricted Admin Panel** — Accessible only to authorized admin accounts.
- **Analytics Dashboard** — Real-time overview of active shows, total bookings, active users, and total revenue.
- **Show Management** — Add new shows (movie, date, time, theater) and view/manage all listed shows.
- **Booking Management** — View and track all bookings platform-wide.

---

## 🛠️ Tech Stack

| Category               | Technology                                                        |
|-------------------------|--------------------------------------------------------------------|
| **Frontend**            | React, Tailwind CSS                                                |
| **Backend**             | Node.js, Express.js                                                |
| **Database**            | MongoDB                                                            |
| **Authentication**      | Clerk                                                              |
| **Background Jobs / Events** | Inngest                                                       |
| **Payments**            | Stripe                                                             |
| **Webhook Verification**| Svix                                                               |
| **Transactional Email** | Nodemailer + Brevo                                                 |
| **External Movie Data** | TMDB API                                                           |

---

## 🏗️ Architecture & Folder Structure

```
cineElite/
├── backend/
│   ├── controllers/       # Route logic (showController.js, adminController, userController, stripeWebhook bookingController.js, etc.)
│   ├── models/             # Mongoose schemas (Movie, Show, Booking, User)
|   ├──middleware            # check for admin routes
│   ├── routes/              # Express route definitions
│   ├── inngest/              # Inngest background functions (seat release, emails,user sync, delete, update)
│   ├── configs/                 # DB connection, third-party service configs
│   └── index.js                   # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/            # Route-level pages (Home, Favorite, Theater, Releases MovieDetails, SeatLayout, MyBookings)
│   │   ├── admin/               # Admin dashboard pages
│   │   └── context/                 # Global state / auth context
│   └── index.html
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run CineElite locally.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- Accounts/API keys for: Clerk, Stripe, Inngest, TMDB, Brevo

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishakha9171/CineElite.git
   cd cineElite
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables** 

5. **Run the backend**
   ```bash
   cd backend
   npm run index
   ```

6. **Run the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

7. Visit `http://localhost:5173` (or your configured frontend port) in your browser.


## 📘 Usage Guide

### User Flow

1. **Sign up / Log in** using Clerk authentication on the homepage.
2. **Browse** the list of currently playing movies, complete with posters and trailers.
3. **Click a movie** to view full details — overview, cast, and trailer.
4. **Select a date and showtime** for that movie.
5. You'll be redirected to the **seat layout page** — choose up to 5 available seats.
6. Proceed to the **payment page**, select a payment method, and complete checkout via Stripe.
7. On successful payment, you'll receive a **confirmation email** and the booking will appear on your **My Bookings** page.
8. If payment isn't completed within 10 minutes, the selected seats are automatically released.
9. You'll receive a **reminder email 8 hours before** your show.

### Admin Flow

1. Log in with an authorized admin account to access `/admin`.
2. View the **Dashboard** for a snapshot of active shows, total bookings, active users, and total revenue.
3. Go to **Add Shows** to create a new show by selecting a movie (fetched from TMDB), date, time, and price.
4. Use **List Shows** to view and manage all currently scheduled shows.
5. Use **List Bookings** to view all bookings made across the platform.

---

## ⚙️ Background Jobs (Inngest)

CineElite uses [Inngest](https://www.inngest.com/) for reliable, event-driven background processing:

| Function | Trigger | Purpose |
|---|---|---|
| `release-seats-delete-booking` | Runs 10 minutes after seat selection | Checks if payment was completed; if not, releases the held seats back into inventory |
| `send-booking-confirmation-email` | Triggered on successful payment | Sends a confirmation email to the user |
| `send-new-show-notifications` | Triggered when a new show is added | Notifies users of newly released movies |
| `send-show-reminders` | Scheduled ~8 hours before showtime | Sends a reminder email to users with upcoming bookings |

---

## 📧 Email Notifications

Transactional emails are sent using **Nodemailer** with **Brevo** as the SMTP provider:
- ✅ Booking confirmation
- 🎬 New movie release announcements
- ⏰ Showtime reminders (8 hours before the show)

---

## 💳 Payment & Webhook Security

- Payments are processed through **Stripe Checkout**.
- Incoming Stripe webhook events are verified using **Svix** to ensure payloads are authentic and untampered, preventing spoofed payment confirmations.

---


## 🎓 What I Learned

Building CineElite as a student developer helped me get hands-on experience with:
- Integrating third-party authentication (Clerk) into a full-stack app instead of building auth from scratch
- Handling asynchronous, event-driven background jobs (Inngest) for tasks like delayed seat release and scheduled emails
- Working with real payment infrastructure (Stripe) and verifying webhook authenticity (Svix)
- Consuming and structuring data from a public REST API (TMDB) inside a MongoDB schema
- Sending transactional emails through an SMTP provider (Brevo) via Nodemailer
- Debugging real production issues — including flaky third-party network calls — beyond typical tutorial-level problems

This project is still evolving as I keep learning — feedback and suggestions are always welcome.

---

## 🗺️ Roadmap

- [ ] Add ratings & reviews
- [ ] Multi-city / multi-theater support
- [ ] Real theater seat inventory (replace dummy data)
- [ ] Coupon / promo code support
- [ ] Mobile app version

---

## 🤝 Contributing

This started as a solo learning project, but suggestions, code reviews, and feedback are very welcome — especially from other developers who spot better patterns or best practices I could learn from.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add new Code'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Vishakha Raghuwanshi** — Student Developer
📧 [vishakharaghuwanshi9171@gmail.com](mailto:vishakharaghuwanshi9171@gmail.com) · 🔗 [LinkedIn](https://www.linkedin.com/in/vishakha-raghuwanshi) · 

Project Link: [https://github.com/vishakha9171/CineElite](https://github.com/vishakha9171/CineElite)

⭐ If you found this project interesting or it helped you learn something, consider giving it a star!

