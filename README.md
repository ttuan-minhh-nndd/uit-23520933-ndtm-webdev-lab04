# Lab 04 Exercises: Blog Dash - React Capstone Project

A comprehensive multi-page blog dashboard application built with React, demonstrating modern React concepts and best practices.

## 🎯 Project Overview

Blog Dash is a feature-rich blog management dashboard that integrates key React concepts including:

- ✅ **React Router v6** - Multi-page navigation with dynamic routes
- ✅ **useEffect Hook** - Data fetching and side effects management
- ✅ **useRef Hook** - DOM manipulation and input focus
- ✅ **Context API** - Global authentication state management
- ✅ **Protected Routes** - Authentication-based route protection
- ✅ **Data Fetching** - Async API calls with loading states
- ✅ **Form Architecture** - Controlled components and validation

## 🚀 Features

### 1. Authentication System
- Login page with form validation
- Global authentication state using Context API
- Protected routes that require authentication
- Automatic redirect on login/logout

### 2. Blog Post Management
- View all blog posts in a responsive grid layout
- Click to view detailed post information
- Dynamic routing to individual post pages
- Display post comments with author information

### 3. Modern UI/UX
- Clean, professional design with gradient accents
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Loading states and error handling

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar with logout
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── contexts/
│   └── AuthContext.jsx      # Global auth state management
├── pages/
│   ├── Login.jsx            # Login page with form
│   ├── Dashboard.jsx        # Main dashboard layout
│   ├── PostList.jsx         # All posts grid view
│   └── PostDetail.jsx       # Individual post detail view
├── styles/
│   ├── Login.css
│   ├── Dashboard.css
│   ├── Navbar.css
│   ├── PostList.css
│   └── PostDetail.css
├── App.jsx                  # Router configuration
└── main.jsx                 # App entry point
```

## 🛠️ Technical Implementation

### React Router Setup
```javascript
// Routes structure:
/ (Login page)
/dashboard (Protected)
  └── /dashboard (Post List)
  └── /dashboard/post/:postId (Post Detail - Dynamic Route)
```

### Key Concepts Demonstrated

#### 1. **useEffect Hook**
- Fetching blog posts on component mount
- Fetching post details and comments in parallel
- Auto-focus on login input field
- Automatic redirect after authentication

#### 2. **useRef Hook**
- DOM reference for input focus management
- Persistent value storage without re-renders

#### 3. **Context API**
- `AuthContext` for global authentication state
- `isAuthenticated` boolean flag
- `login` and `logout` functions
- User data management

#### 4. **Protected Routes**
- `<ProtectedRoute>` wrapper component
- Conditional rendering based on auth state
- Automatic redirect to login if not authenticated
- Uses `<Outlet>` for nested routes

#### 5. **Data Fetching Strategies**
- Async/await with fetch API
- Loading state management
- Error handling and display
- Parallel data fetching with `Promise.all()`

#### 6. **Form Architecture**
- Controlled components
- Client-side validation
- Error message display
- Form submission handling

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Usage

1. **Login**: Enter any username and a password with at least 6 characters
2. **View Posts**: Browse all available blog posts
3. **Read Details**: Click on any post to view full details and comments
4. **Logout**: Click the logout button in the navbar

## 🎨 Styling

The application uses custom CSS with:
- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS animations and transitions
- Custom color scheme with purple gradient accents
- Mobile-first responsive design

## 📚 Learning Outcomes

This project demonstrates:
- Modern React development patterns
- Component composition and reusability
- State management strategies
- Routing in single-page applications
- Asynchronous data handling
- User authentication flow
- Protected route implementation
- Clean code architecture

## 🔗 API

Uses JSONPlaceholder API for demo data:
- Posts: `https://jsonplaceholder.typicode.com/posts`
- Comments: `https://jsonplaceholder.typicode.com/posts/:id/comments`

## 📝 License

MIT License - Feel free to use this project for learning purposes!

---

**Built with ❤️ using React + Vite**
