import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { authService, type AuthResponse } from '../services/authService'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получить текущего пользователя при инициализации
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

    // Слушать изменения состояния аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Регистрация нового пользователя
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
        error: error instanceof Error ? error.message : 'Ошибка регистрации' 
      }
    } finally {
      setLoading(false)
    }
  }

  // Вход в систему
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
        error: error instanceof Error ? error.message : 'Ошибка входа' 
      }
    } finally {
      setLoading(false)
    }
  }

  // Выход из системы
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
        error: error instanceof Error ? error.message : 'Ошибка выхода' 
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