# 🔥 fireChat

A modern, real-time chat application designed for language learners to connect, practice, and improve their language skills together.

![fireChat](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 📖 About

fireChat is a full-stack chat application that brings language learners together. Users can sign up, complete an onboarding process to share their native language and the language they're learning, connect with friends, and chat in real-time. Built with modern web technologies and powered by Stream Chat for seamless messaging.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 👤 **User Profiles** - Customizable profiles with avatar, bio, and language preferences
- 🌍 **Language Learning Focus** - Connect with learners based on native and learning languages
- 👥 **Friend System** - Send and accept friend requests
- 💬 **Real-time Chat** - Instant messaging powered by Stream Chat
- 🔔 **Notifications** - Stay updated with friend requests and messages
- 🎨 **Theme Support** - Multiple theme options with DaisyUI
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Onboarding Flow** - Guided setup for new users

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Stream Chat React** - Pre-built chat UI components
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stream Chat** - Real-time messaging API
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse cookies

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Stream Chat Account** - Get API credentials from [getstream.io](https://getstream.io/)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Digvijay-x1/fireChat.git
cd fireChat
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Stream Chat API
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

## 🎮 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
fireChat/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   ├── env.config.js      # Environment variables
│   │   │   └── stream.config.js   # Stream Chat configuration
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Authentication logic
│   │   │   ├── chat.controller.js # Chat operations
│   │   │   └── user.controller.js # User management
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # JWT verification
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── FriendRequest.js   # Friend request schema
│   │   ├── routes/
│   │   │   ├── auth.route.js      # Auth endpoints
│   │   │   ├── chat.route.js      # Chat endpoints
│   │   │   └── user.route.js      # User endpoints
│   │   └── server.js              # App entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── CallButton.jsx
│   │   │   ├── ChatLoader.jsx
│   │   │   ├── FriendCard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ThemeSelector.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── CallPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotificationPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand stores
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # App entry point
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/onboard` - Complete user onboarding (protected)

### User Routes (`/api/users`)

- `GET /api/users/me` - Get current user profile (protected)
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/update` - Update user profile (protected)
- `GET /api/users/suggestions` - Get friend suggestions (protected)

### Chat Routes (`/api/chats`)

- `POST /api/chats/token` - Get Stream Chat token (protected)

## 🎯 Key Features Explained

### User Onboarding
New users go through an onboarding process where they provide:
- Full name
- Bio
- Native language
- Language they're learning
- Location

This information helps connect users with similar language learning goals.

### Friend System
Users can:
- Send friend requests
- Accept/reject friend requests
- View notifications for pending requests
- See all friends on the home page

### Real-time Chat
Powered by Stream Chat API:
- One-on-one messaging
- Message history
- Online status
- Typing indicators
- Read receipts

## 🎨 Themes

fireChat supports multiple themes via DaisyUI. Users can switch themes from the theme selector component.

## 🧪 Development

### Backend Development

```bash
cd backend
npm run dev
```

Uses `nodemon` for automatic server restart on file changes.

### Frontend Development

```bash
cd frontend
npm run dev
```

Vite provides hot module replacement for instant updates.

### Linting

```bash
cd frontend
npm run lint
```

### Build for Production

```bash
cd frontend
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Digvijay-x1**

- GitHub: [@Digvijay-x1](https://github.com/Digvijay-x1)

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/) for the amazing chat API
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon library
- All contributors who help improve this project

## 📧 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ for language learners worldwide
