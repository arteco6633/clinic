import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { getHeroContent, type HeroContent } from './lib/supabase'

function App() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const hero = await getHeroContent()
        setHeroContent(hero)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero hero={heroContent} />
      </main>
    </div>
  )
}

export default App
