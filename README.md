# News App

A practice web application designed for managing news articles, featuring full CRUD operations, user authentication, local file uploading, and an admin dashboard. This app is intended for learning and experimentation, but with minor enhancements, it can become a robust news management platform.

## Features

- **User Authentication**: Secure user registration and login.
- **News Management**:
  - **Create**: Add new news articles.
  - **Read**: View all articles.
  - **Update**: Edit existing articles.
  - **Delete**: Remove articles.
- **File Uploading**: Upload images and files locally for news articles.
- **Admin Dashboard**: Access a dedicated admin interface for managing news articles and users.

## Project Structure

- **Frontend**: Contains the user interface, built with React.
- **Backend**: Handles the server-side logic, built with Node.js and Express.

## Requirements

- Node.js
- Visual Studio Code

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd your-news-app
   ```

3. **Install dependencies**:

   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

## Running the Application

1. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to explore the app.

## Accessing the Admin Dashboard

- The backend is accessible at `http://localhost:3000/admin`.
- Use the following credentials to log in:
  - **Email**: `admin@gmail.com`
  - **Password**: `admin`

## Environment Variables

Ensure the following environment variables are set in the `backend/.env` file:

```
PORT = 4000
JWT_SECRET = JFLEfelfj33JLFEJFL777
FRONTEND_URL = http://localhost:3000
```

## Notes

- **Local File Uploading**: Files are stored locally in your computer. This setup is suitable for development and testing.
- **Practice Application**: This project is primarily for learning purposes and is not intended for deployment in its current form. However, with a few adjustments, it can be enhanced into a production-ready application.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests for improvements.

## License

This project is licensed under the MIT License.
