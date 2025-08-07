import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean;
  user?: User | null;
  error?: string;
}

// Authentication service with Supabase
export const authService = {
  // Register new user
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('Registration error:', error)
        return { 
          success: false, 
          error: error.message || 'Registration error' 
        }
      }

      return { 
        success: true, 
        user: data.user 
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  },

  // Sign in user
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Login error:', error)
        return { 
          success: false, 
          error: error.message || 'Login error' 
        }
      }

      return { 
        success: true, 
        user: data.user 
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  },

  // Sign out user
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        return { 
          success: false, 
          error: error.message || 'Sign out error' 
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  },

  // Получить текущего пользователя
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error getting current user:', error)
        return null
      }

      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }
}

// Для обратной совместимости (если используется в других местах)
export const registerUser = async (email: string, password: string): Promise<boolean> => {
  const result = await authService.signUp(email, password)
  return result.success
}

export const loginUser = async (email: string, password: string): Promise<boolean> => {
  const result = await authService.signIn(email, password)
  return result.success
} 