import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import {AppLayout} from './AppLayout'
import { AuthProvider } from './Context/AuthContext'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  return (
    <>{
      showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      )}</>)
}