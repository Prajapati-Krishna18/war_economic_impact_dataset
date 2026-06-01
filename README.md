  <a name="readme-top"></a>
<div align="center">

# 🚀 War Economic Impact Analytics API
**The ultimate production-grade backend solution for analyzing the global economic impact of conflicts.**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/50840969/2sBXwmRD8o)

[Explore Docs](https://documenter.getpostman.com/view/50840969/2sBXwmRD8o) · [Report Bug](#) · [Request Feature](#)

</div>

## 🌟 Project Vision
"Empowering researchers, economists, and organizations with data-driven insights to understand and mitigate the economic repercussions of global conflicts through advanced dataset aggregation and API analysis."

## 📖 Introduction
The War Economic Impact Analytics API is a high-performance, scalable backend engine designed to process, analyze, and serve complex datasets related to the economic effects of wars. Built with a focus on production-grade reliability, it provides deep insights into inflation trends, GDP fluctuations, supply chain disruptions, and global market shifts.

This system isn't just a CRUD application; it's a comprehensive analytics platform that leverages modern backend architecture to deliver sub-second response times, advanced querying, and robust security.

## 🛠 Tech Stack
| Technology | Purpose |
| ---------- | ------- |
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Primary Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **JWT** | Secure Authentication |
| **Bcrypt.js** | Password Hashing |
| **Morgan** | HTTP Request Logging |
| **Helmet** | Security Header Management |
| **Express-Rate-Limit** | API Rate Limiting |
| **Dotenv** | Environment Variable Management |

## ✨ Key Features
- **👤 Advanced User Management**: Role-based access control (RBAC) for researchers and admins.
- **📊 Real-time Economic Analytics**: Dynamic calculation of inflation, GDP impact, and market variations.
- **🛡️ Proactive Security**: JWT-based auth, password hashing, and data protection.
- **🚀 High Performance**: Optimized MongoDB queries and indexing strategies for massive datasets.
- **📡 RESTful API**: Clean, intuitive, and standard-compliant API design.
- **🔄 Advanced Aggregation**: Powerful MongoDB aggregation pipelines to extract meaningful insights.

## 🔐 Authentication & Security
We take security seriously. This API implements industry-standard security practices:
- **JWT Authentication**: Stateless authentication using signed tokens.
- **Password Hashing**: Bcrypt with a salt factor of 12 for maximum entropy.
- **Rate Limiting**: Preventing Brute-force attacks by limiting requests per IP.
- **Security Headers**: Integrated helmet for protection against common web vulnerabilities.
- **CORS Protection**: Controlled cross-origin resource sharing.
- **Input Validation**: Strict schema-based validation using Mongoose and custom middleware.

## 📊 Analytics & Economic Insights
The API computes several critical metrics:
- **Inflation Impact Score**: Calculated based on historical and current CPI data.
- **GDP Fluctuation**: Analysis of economic growth/contraction across affected regions.
- **Supply Chain Disruption Index**: Weighted metric tracking trade flow interruptions.
- **Cohort Analysis**: Segregation of economic data based on regions and timelines.

## ⚙️ Advanced API Features

### 🔍 Filtering, Sorting, & Pagination
Every list endpoint supports advanced query parameters:
- **Filter**: `?region=europe&inflationRate[gte]=5.0`
- **Sort**: `?sort=-year,gdpImpact`
- **Pagination**: `?page=1&limit=20`
- **Fields Selection**: `?fields=country,year,inflationRate`

### 🛡️ Middleware Architecture
- `authMiddleware`: Validates JWT and attaches user to the request.
- `roleMiddleware`: Restricts access based on user roles (Admin, Researcher, User).
- `errorMiddleware`: Centralized error handling for consistent API responses.
- `requestLogger`: Logs detailed request metadata for auditing.

## 📂 Project Structure
```text
war_economic_impact_dataset/
├── src/
│   ├── config/             # Database & environment configurations
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Custom Express middleware
│   ├── models/             # Mongoose schemas & models
│   ├── routes/             # API route definitions
│   ├── utils/              # Helper functions & constants
│   ├── services/           # External service integrations
│   └── app.js              # Express application setup
├── tests/                  # Unit & Integration tests
├── .env.example            # Template for environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies & scripts
└── server.js               # Entry point for the server
```

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Prajapati-Krishna18/war_economic_impact_dataset.git
cd war_economic_impact_dataset
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/warEconomyDB
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=90d
RATE_LIMIT_MAX=100
```

4. **Run the application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🛣 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| POST | `/api/v1/auth/register` | Register a new user | Public |
| POST | `/api/v1/auth/login` | Login user & get token | Public |
| GET | `/api/v1/auth/me` | Get current user info | Private |

### 🌍 Economic Data
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| GET | `/api/v1/data` | Get all economic records | Researcher/Admin |
| POST | `/api/v1/data` | Add a new record | Admin |
| GET | `/api/v1/data/:id` | Get single record details | Private |
| PATCH | `/api/v1/data/:id` | Update record data | Admin |

### 📈 Analytics
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| GET | `/api/v1/analytics/inflation-stats` | Get overall inflation statistics | Admin |
| GET | `/api/v1/analytics/impact-report` | Get severe economic impact report | Admin |
| GET | `/api/v1/analytics/gdp-trends` | Get GDP trends | Admin |

## 🗄 Database Schema (Example)

**Economic Impact Schema**
```javascript
{
  country: { type: String, required: true },
  region: { type: String, required: true },
  year: { type: Number, required: true },
  inflationRate: { type: Number }, 
  gdpGrowth: { type: Number },
  unemploymentRate: { type: Number },
  status: { type: String, enum: ['stable', 'at-risk', 'crisis'] }
}
```

## 🚨 Error Handling
The API uses a global error-handling middleware to ensure consistent responses:
```json
{
  "status": "error",
  "message": "Resource not found",
  "stack": "..." // Only in development mode
}
```

## ⚡ Performance Optimizations
- **Indexing**: Critical fields like `country`, `year`, and `region` are indexed in MongoDB.
- **Lean Queries**: Using `.lean()` for read-only operations to reduce overhead.
- **Compression**: Gzip compression for all HTTP responses.

## 🔮 Future Enhancements
- 🤖 **Machine Learning Integration**: Predictive models for economic recovery.
- 📊 **Dashboard UI**: A React-based admin dashboard for visual analytics.
- 📥 **Automated Data Imports**: Integration with World Bank and IMF APIs.
- 🔔 **Webhook Support**: Notify external systems when critical data changes.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>