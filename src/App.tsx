import { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { AdminDashboard } from './components/AdminDashboard'
import { CaregiverDashboard } from './components/CaregiverDashboard'
import { GuardianDashboard } from './components/GuardianDashboard'
import { createClient } from './utils/supabase/client'
import { apiRequest } from './utils/api'
import { Toaster } from './components/ui/sonner'

export default function App( ) {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string>('')
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()

      if (session && session.user) {
        setUser(session.user)
        setToken(session.access_token)
        await loadUserProfile(session.access_token)
      }
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (accessToken: string) => {
    try {
      const data = await apiRequest('/profile', {}, accessToken)
      setUserProfile(data.user)
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const handleLoginSuccess = async (loggedInUser: any, accessToken: string) => {
    setUser(loggedInUser)
    setToken(accessToken)
    await loadUserProfile(accessToken)
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setToken('')
      setUserProfile(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!user || !token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  // Get role from user metadata or profile
  const role = userProfile?.role || user.user_metadata?.role

  // Render dashboard based on role
  if (role === 'admin') {
    return (
      <>
        <AdminDashboard user={userProfile || user} token={token} onLogout={handleLogout} />
        <Toaster />
      </>
    )
  }

  if (role === 'caregiver') {
    return (
      <>
        <CaregiverDashboard user={userProfile || user} token={token} onLogout={handleLogout} />
        <Toaster />
      </>
    )
  }

  if (role === 'guardian') {
    return (
      <>
        <GuardianDashboard user={userProfile || user} token={token} onLogout={handleLogout} />
        <Toaster />
      </>
    )
  }

  // Default fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Rol no reconocido</h1>
        <p className="text-muted-foreground">
          Tu cuenta no tiene un rol válido asignado. Por favor contacta al administrador.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
