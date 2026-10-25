# EcoRoute 🌱

**EcoRoute — A Greener Way to Travel**

EcoRoute is a web application designed to help users explore travel options and make more environmentally friendly transportation choices. The project aims to make route information easier to access while encouraging sustainable travel.

## 📌 Project Overview

Transportation contributes to pollution and carbon emissions. EcoRoute aims to support greener travel by providing route information and highlighting alternative transportation options.

## 🎯 Objectives

- Provide route information between selected locations.
- Explore different transportation options.
- Encourage walking, cycling, and other eco-friendly travel choices.
- Build a user-friendly interface for route exploration.
- Develop a web application using React.js and Node.js technologies.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- CORS and dotenv

## ✨ Project Features

- Interactive web interface for exploring routes.
- Backend REST API for route-related operations.
- Route data management using the backend.
- Frontend and backend developed as separate components.
- Foundation for comparing transportation options and supporting sustainable travel.

*Note: Features should be described as completed only when they have been implemented and tested.*

## 📁 Project Structure

```text
EcoRoute/
├── backend/
│   ├── data/
│   │   └── routes.js
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   └── Route.js
│   ├── routes/
│   │   └── routeRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── models/
│   └── Route.js
└── .gitignore
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB, if required by the configured backend
- Git

### 1. Clone the repository

```bash
git clone https://github.com/lokesh4417/EcoRoute.git
cd EcoRoute
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Configure the backend environment variables in a local `.env` file according to the requirements in the backend code. Never upload database credentials or secret keys to GitHub.

Run the backend using the start command defined in `backend/package.json`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd EcoRoute/frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

### 4. Test the application

- Confirm that the frontend starts successfully.
- Confirm that the backend starts successfully.
- Test the API endpoints.
- Verify that the frontend communicates with the backend correctly.

## 🚀 Deployment Status

**Current status: Running locally only.**

The project has been pushed to GitHub. Cloud deployment and production configuration remain future tasks unless completed separately.

## 🔮 Future Enhancements

- Integrate a maps service for route visualization.
- Compare available transportation options.
- Add reliable distance and travel-time calculations.
- Estimate environmental impact using a documented calculation method.
- Improve responsive design for mobile devices.
- Deploy the frontend and backend to cloud platforms.
- Configure a cloud-hosted database if required.

## 👥 Project Team

- **G. Lokesh** — Team Member
- **N. Govedhan** — Team Member
- **A. Chatinaya** — Team Member

## 📄 License

A license has not yet been specified. Add an appropriate license if required by the project guidelines.

---

*EcoRoute — Encouraging smarter and more sustainable travel choices.*
