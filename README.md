---

# MERN Stack News App

This is a news application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), designed to practice production-grade application development. Though not intended for deployment, this project follows best practices for structuring, scaling, and maintaining a full-stack application, offering a comprehensive look into how production-ready MERN applications are built.

## Key Features
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for managing news articles and user data.
- **File Upload**: Supports image and media file uploads to enhance content.
- **Stunning Admin Dashboard**: An intuitive dashboard where admins can control and manage site content, users, and settings seamlessly.

This application provides a valuable foundation for understanding how to structure and manage a scalable MERN stack project that can be production-ready with further adjustments.

---

## Getting Started

To test this application on your machine, follow these steps:

### Prerequisites
1. **Tools Required**:
   - [VS Code](https://code.visualstudio.com/) for code editing.
   - [Node.js](https://nodejs.org/) and npm for package management.
   - [MongoDB GUI](https://www.mongodb.com/products/compass) (optional) for visual database management.

### 1. Set Up Environment Variables
   - In the root directory, create a `.env` file with the following details:
     ```plaintext
     PORT=4000
     JWT_SECRET=JFLEfelfj33JLFEJFL777
     FRONTEND_URL=http://localhost:3000
     ```

### 2. Install Dependencies
   - Navigate to the `backend` folder and run:
     ```bash
     npm install
     ```

### 3. Running the Application
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

### 4. Access the Application
   - Frontend URL (for users): [http://localhost:3000](http://localhost:3000)
   - Backend Admin URL: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Testing the Admin Dashboard
   - Use the following credentials to log in:
     - **Email**: `khan@gmail.com`
     - **Password**: `khan123`

---
