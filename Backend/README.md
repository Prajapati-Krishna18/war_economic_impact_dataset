# War Economic Impact API - Backend

This directory contains the robust, scalable, and secure Node.js & Express REST API for the War Economic Impact Dataset application. It utilizes MongoDB for high-performance data storage, JWT for role-based authentication, and a layered security architecture.

---

## 🚀 Features & Architecture

* **Advanced Authentication & RBAC:** JWT-based stateless authentication with strict Role-Based Access Control (`admin`, `researcher`, `user`).
* **MongoDB Aggregation Pipelines:** High-performance server-side data processing and analytics for economic metrics.
* **Granular Rate Limiting:** Segmented request limiting (strict limits for Auth, general limits for data endpoints) to prevent brute-force and DDoS attacks.
* **Comprehensive Security Layer:** Integrates Helmet, HPP, Express Mongo Sanitize, and strict CORS configuration.
* **Standardized JSON Responses:** A universal `ApiResponse` wrapper ensures identical success/error JSON shapes across all endpoints.
* **Automated Data Seeding:** Built-in MongoDB data seeding utilities for wiping and injecting development data.
* **API Versioning:** Clean, semantic `/api/v1/` routing architecture built to scale to future versions without breaking legacy clients.

---

## 📂 Folder Structure

```text
Backend/
├── data/                  # Mock data and JSON seed files
├── docs/                  # Postman Collections and API Documentation
├── src/
│   ├── controllers/       # Route logic and request handling (Auth, Datasets, Health)
│   ├── middlewares/       # Global utilities (Auth guards, Rate Limiters, Error Handlers, Logger)
│   ├── models/            # Mongoose Schemas (Dataset, User) with compound indexes
│   ├── routes/            # API Route definitions and versioning handlers
│   ├── services/          # Business logic and database interactions
│   ├── utils/             # Helper classes (ApiResponse, ErrorResponse, Logger)
│   ├── app.js             # Express application initialization and middleware mounting
│   ├── seeder.js          # MongoDB data injection script
│   └── server.js          # Main entry point and server startup
├── .env                   # Environment configuration (not committed)
├── .gitignore             # Git ignore rules
└── package.json           # Node.js dependencies and scripts
```

---

## ⚙️ Environment Setup

1. Clone the repository and navigate to the `Backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend/` directory and configure the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/war_economic_dataset?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d

# Security & CORS Settings
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX_REQUESTS=10
```

---

## 🛠️ Usage & Developer Onboarding

### Start the Server
* **Development Mode (Auto-restart on save):**
  ```bash
  npm run dev
  ```
* **Production Mode:**
  ```bash
  npm start
  ```

### Database Seeding
You can quickly populate your local MongoDB with mock data using the included seeder scripts:
* **Import Data:** `npm run data:import` (Warning: Wipes existing records first)
* **Destroy Data:** `npm run data:destroy`

### Postman API Documentation
To quickly test endpoints without building a frontend:
1. Access the **[Live Postman API Documentation](https://documenter.getpostman.com/view/50840969/2sBXwmRD8o)**.
2. Or import the local collection file located at: `Backend/docs/War_Economic_Impact_API.postman_collection.json`
*Includes automated JWT extraction tests and predefined JSON body payloads.*

---

## 🚢 Deployment Guide

When deploying to production platforms (AWS, Heroku, Render, Vercel), ensure the following checklist is completed:

1. **Environment Variables**: Update `NODE_ENV=production` and ensure `CORS_ORIGIN` precisely matches your live frontend domain.
2. **Database Security**: Whitelist your production server IP addresses inside MongoDB Atlas.
3. **Health Monitoring**: Configure your load balancer (or Kubernetes liveness probe) to hit `GET /api/health`. It returns a 200 OK when healthy, and a 503 if the database disconnects.
4. **Node Start Script**: Ensure your host uses `npm start` (which executes `node src/server.js`), and NOT the dev script.
