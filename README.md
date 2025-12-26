# InsightBoard — Real-Time Backend Observability Dashboard

InsightBoard is a real-time backend observability and monitoring platform built to give engineering teams visibility into API traffic, performance, and failures — similar to internal tools like Datadog or Grafana.

It passively monitors backend APIs, streams live logs and alerts via WebSockets, and visualizes system health through charts and metrics.

# Live Demo

🔗 Frontend: https://insight-board-metrics.vercel.app/

🔗 Backend: https://insightboard-metrics-1-8z38.onrender.com/


# Features

1. Real-time API logging using custom Express middleware

2. Live dashboard updates via Socket.IO (WebSockets)

3. Request metrics: total requests, error count, average response time

4. Time-series charts for traffic and server-side (5xx) errors

5. Automated alerts for backend error spikes

6. Role-Based Access Control (RBAC) with Admin & Developer roles

7. JWT-based authentication and protected routes

8. Production-safe architecture with controlled refresh intervals

9. Cloud deployment with environment-based configuration


# High-Level Flow

Client / API Consumer
        ↓
Node.js Backend (Express)
        ↓
Request Logger Middleware
        ↓
MongoDB Atlas (Logs Storage)
        ↓
Socket.IO (Real-Time Events)
        ↓
React Dashboard (Vercel)


## Tech Stack

# Frontend

- React.js

- Tailwind CSS

- Recharts

- Socket.IO Client

# Backend

- Node.js

- Express.js

- Socket.IO

- MongoDB (Atlas)

- JWT Authentication

# Deployment

- MongoDB Atlas (Cloud Database)

- Render (Backend)

- Vercel (Frontend)


# Authentication & Authorization

- JWT-based authentication

- Role-Based Access Control:
 
- Admin → Full access (logs, alerts, metrics)

- Developer → Read-only access (metrics & charts)

- Protected backend routes using authorization middleware

- Protected frontend routes with redirect-on-unauthenticated access

# Observability Design Principles

- Logs update in real time using WebSockets

- Metrics & charts update on controlled intervals (not per request)

- Server-side (5xx) errors tracked separately from client errors

- UTC timestamps stored in DB, converted to local timezone for display

##  Local Setup
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

# Create .env files in both frontend and backend as per deployment configuration

# License
MIT

