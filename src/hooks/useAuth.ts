import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { authService, type AuthResponse } from '../services/authService'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current user on initialization
    const getInitialUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting initial user:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialUser()

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Register new user
  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true)
      const result = await authService.signUp(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration error' 
      }
    } finally {
      setLoading(false)
    }
  }

  // Sign in user
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true)
      const result = await authService.signIn(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login error' 
      }
    } finally {
      setLoading(false)
    }
  }

  // Sign out user
  const signOut = async (): Promise<AuthResponse> => {
    try {
      setLoading(true)
      const result = await authService.signOut()
      
      if (result.success) {
        setUser(null)
      }
      
      return result
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign out error' 
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  }
}