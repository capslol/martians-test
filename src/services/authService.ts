import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean;
  user?: User | null;
  error?: string;
}

// Сервис для аутентификации с Supabase
export const authService = {
  // Регистрация нового пользователя
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
          error: error.message || 'Ошибка регистрации' 
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
        error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
      }
    }
  },

  // Вход в систему
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
          error: error.message || 'Ошибка входа' 
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
        error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
      }
    }
  },

  // Выход из системы
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        return { 
          success: false, 
          error: error.message || 'Ошибка выхода' 
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
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