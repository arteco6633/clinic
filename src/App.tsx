import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { getHeroContent, getActivePromoBlock, type HeroContent, type PromoBlock } from './lib/supabase'

function App() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [promoBlock, setPromoBlock] = useState<PromoBlock | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [hero, promo] = await Promise.all([
          getHeroContent(),
          getActivePromoBlock()
        ])
        setHeroContent(hero)
        setPromoBlock(promo)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero hero={heroContent} promo={promoBlock} />
        
        {/* Placeholder sections */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Услуги</h2>
            <p className="text-center text-neutral-500">Секция услуг будет добавлена</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
