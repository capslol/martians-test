import { createClient } from '@supabase/supabase-js'

// Замените эти значения на ваши реальные данные из Supabase проекта
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)