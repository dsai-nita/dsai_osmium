import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import { Navigation } from './components/Navigation'
import { Homepage } from './components/Homepage'
import { EventsPage } from './components/EventsPage'
import { InnovationsPage } from './components/InnovationsPage'
import { SquadPage } from './components/SquadPage'
import { Footer } from './components/Footer'
import { AboutPage } from './components/AboutPage'
import { AIspirePage } from './components/AIspirePage'
import { AIspireFormPage } from './components/AIspireFormPage'
import { GalleryPage } from './components/GalleryPage'
import { LoginPage } from './components/LoginPage'
import { MemberDashboard } from './components/MemberDashboard'
import { AdminDashboard } from './components/AdminDashboard'
import { QuizPage } from './components/QuizPage'
import { FAQPage } from './components/FAQPage'
import { DevelopersPage } from './components/DevelopersPage'
import { BlogPage } from './components/BlogPage'
import { FoundersPage } from './components/FoundersPage'
import { RegisterPage } from './components/RegisterPage'
import { Toaster } from './components/ui/sonner'
import { ChatBot } from './components/ChatBot'
import { ScrollToTop } from './utility/ScrollToTop'
import {ProtectedRoute,useAuth } from './Context/AuthContext'

export function AppLayout() {
 const { userData, isLoggedIn } = useAuth()
  const dashboardRoute = userData?.role && (
    userData.role.toLowerCase().includes('president') ||
    userData.role.toLowerCase().includes('admin') ||
    userData.role.toLowerCase().includes('general secretary')
  ) ? '/admin-dashboard' : '/member-dashboard'

  return (
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Navigation/>
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/innovations" element={<InnovationsPage />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/aispire" element={<AIspirePage />} />
            <Route path="/aispire-form" element={<AIspireFormPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to={dashboardRoute || '/member-dashboard'} replace /> : <LoginPage />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to={dashboardRoute || '/member-dashboard'} replace /> : <RegisterPage />} />
            <Route
              path="/member-dashboard"
              element={
                <ProtectedRoute>
                  {userData?.role && 
                    (userData.role.toLowerCase().includes('president') || 
                     userData.role.toLowerCase().includes('admin') ||
                     userData.role.toLowerCase().includes('general secretary')) ? (
                    <AdminDashboard userData={userData} />
                  ) : (
                    <MemberDashboard userData={userData} />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard userData={userData} />
                </ProtectedRoute>
              }
            />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/founders" element={<FoundersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <Toaster />
      </div>
  )
}