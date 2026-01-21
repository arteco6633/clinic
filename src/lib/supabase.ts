import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ypkzkcwykjnnreydeyde.supabase.co'
const supabaseAnonKey = 'sb_publishable_MUs0vV-ZATqbX6y4f8jd8A_zjWH9SfH'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для данных
export interface HeroContent {
  id: number
  title: string
  subtitle?: string
  address: string
  metro_station: string
  background_image: string
  rating: number
  rating_text: string
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
    .single()
  
  if (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
  return data
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
