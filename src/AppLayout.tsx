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
import { QuizPage } from './components/QuizPage'
import { FAQPage } from './components/FAQPage'
import { DevelopersPage } from './components/DevelopersPage'
import { BlogPage } from './components/BlogPage'
import { FoundersPage } from './components/FoundersPage'
import { Toaster } from './components/ui/sonner'
import { ChatBot } from './components/ChatBot'
import { ScrollToTop } from './utility/ScrollToTop'
import {ProtectedRoute,useAuth } from './Context/AuthContext'

export function AppLayout() {
 const { userData } = useAuth()

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
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/member-dashboard"
              element={
                <ProtectedRoute>
                  <MemberDashboard userData={userData} />
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