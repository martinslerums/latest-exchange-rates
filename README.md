# Currency Exchange Rate Table

## Description
This project uses [AnyAPI.io](https://anyapi.io) for API services and a SQLite database for local development.

It also features a `cron` job that fetches API data daily at 12:00 PM. Since the project doesn't run 24/7, the cron job is triggered on each project start.
Before running, it checks a log in the database to see if it has already run that day. 
If the job has already been executed, it won't run again until the next day.

---

## Prerequisites

1. **Create an account** on [AnyAPI.io](https://anyapi.io).
2. **Create a `.env` file** in the `backend` folder with the following content:

    ```bash
    ANYAPI_KEY='AddYourAnyApiKey'
    ANYAPI_BASE_CURRENCY='EUR'
    PORT='3001'
    NODE_ENV='development'
    ```

    - Replace `'AddYourAnyApiKey'` with your actual API key from AnyAPI.
    - Keep the `ANYAPI_BASE_CURRENCY`, `PORT`, and `NODE_ENV` values as provided.

---

## Setup Instructions
### Backend Setup
1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Frontend Setup
1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

---

## Running the Project

### Backend
1. In the backend folder, start the backend server:

    ```bash
    npm run start
    ```

2. The backend will run on:

    ```bash
    Local: http://localhost:3001/
    ```

### Frontend
1. In the frontend folder, start the frontend development server:

    ```bash
    npm run dev
    ```

2. The frontend will run on:

    ```bash
    Local: http://localhost:5173/
    ```
