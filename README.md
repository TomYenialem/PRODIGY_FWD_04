# Real-Time Chat Application

Visit the live application here: [Real-Time Chat App](https://prodigy-fwd-04-1.onrender.com)
<img width="941" alt="Screenshot 2025-04-01 213724" src="https://github.com/user-attachments/assets/af99c74f-f448-424f-b62a-cabc1441080d" />

This is a real-time chat application built with **React** for the frontend and **Node.js** with **Express** and **Socket.IO** for the backend. The application supports user authentication, real-time messaging, emoji integration, and toast notifications.

## Features

- **Real-time Messaging**: Powered by Socket.IO for seamless communication between users.
- **User Authentication**: Secure login and registration system with JWT and bcryptjs for password encryption.
- **Emoji Picker**: Integration with the emoji-picker-react library to add fun emoji support to messages.
- **Responsive UI**: Built using React, ensuring a smooth and responsive chat interface across all devices.
- **Notifications**: Real-time notifications for incoming messages using react-toastify.
- **Persistent Data**: MongoDB is used to store user data and chat history.

## Tech Stack

### Frontend

- **React**: The core framework used to build the user interface.
- **React Router DOM**: For handling routing in the application.
- **Axios**: To manage API requests between the frontend and backend.
- **React Spinners**: For displaying loading animations.
- **Emoji Picker React**: For adding emoji support in the chat.
- **React Toastify**: To display real-time notifications for messages.

### Backend

- **Node.js & Express**: Server-side framework for building REST APIs.
- **Socket.IO**: For establishing a WebSocket connection for real-time messaging.
- **MongoDB & Mongoose**: Database for storing user and chat data.
- **bcryptjs**: For hashing passwords before storing them in the database.
- **jsonwebtoken (JWT)**: For secure authentication and token generation.

### Utilities

- **dotenv**: For managing environment variables.
- **cors**: For handling Cross-Origin Resource Sharing (CORS).
- **cookie-parser**: For parsing cookies, mainly used for authentication tokens.
- **http-status-codes**: For handling HTTP status codes in responses.

## Installation

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a .env file and adding your MongoDB URI and JWT secret:
    ```dotenv
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the backend server:
    ```bash
    nodemon index.js
    ```

### Running the App

- Once both the frontend and backend servers are running, you can access the chat application at http://localhost:3000.
- Users can register, log in, and start chatting with other users in real-time.

## Features Overview

- **User Registration**: Users can create an account with their email and password. Passwords are hashed before being stored in the database.
- **User Login**: JWT tokens are used for user authentication. Tokens are stored in cookies for persistence across sessions.
- **Chat Room**: Real-time messaging between users using WebSockets via Socket.IO. New messages appear instantly for both the sender and recipient.
- **Emoji Picker**: The user can pick emojis from a pop-up dialog to enhance their messages.
- **Notifications**: When a new message is received, a toast notification is shown to the user.

