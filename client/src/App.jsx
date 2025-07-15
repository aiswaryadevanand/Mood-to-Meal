// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";

import MoodLog from "./pages/MoodLog";
import MealSuggestions from "./pages/MealSuggestions";
import Journal from "./pages/Journal";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/*  Default page for /dashboard */}
        <Route index element={<MoodLog />} />
        <Route path="moods" element={<MoodLog />} />
        <Route path="meals" element={<MealSuggestions />} />
        <Route path="journals" element={<Journal />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
