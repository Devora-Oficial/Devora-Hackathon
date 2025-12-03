import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

export default function App() {
  return (
    <div className="bg-[#07060a] text-white font-sans min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}