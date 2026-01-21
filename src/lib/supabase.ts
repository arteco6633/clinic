import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ypkzkcwykjnnreydeyde.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3prY3d5a2pubnJleWRleWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTI0NTAsImV4cCI6MjA1MzA2ODQ1MH0.sB3spQCkJ0S8SY-3EfJJBRmJ8a9f_r8PIpqwL60sLhE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для данных
export interface HeroContent {
  id: number
  title: string
  subtitle?: string
  subtitle_top?: string
  tagline?: string
  description?: string
  button_text?: string
  background_image: string
  created_at: string
  updated_at: string
}

export interface PromoBlock {
  id: number
  title: string
  highlight_text: string
  description: string
  deadline: string
  button_text: string
  places_left: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Функции для работы с данными
export async function getHeroContent(): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single()
  
  if (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
  return data
}

export async function updateHeroContent(id: number, updates: Partial<HeroContent>): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('hero_content')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating hero content:', error)
    return null
  }
  return data
}

export async function createHeroContent(content: Omit<HeroContent, 'id' | 'created_at' | 'updated_at'>): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('hero_content')
    .insert([content])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating hero content:', error)
    return null
  }
  return data
}

// Загрузка изображений
export async function uploadImage(file: File, folder: string = 'hero'): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    console.error('Error uploading image:', error)
    return null
  }
  
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)
  
  return data.publicUrl
}

export async function getActivePromoBlock(): Promise<PromoBlock | null> {
  const { data, error } = await supabase
    .from('promo_blocks')
    .select('*')
    .eq('is_active', true)
    .single()
  
  if (error) {
    console.error('Error fetching promo block:', error)
    return null
  }
  return data
}
