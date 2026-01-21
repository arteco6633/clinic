import { PromoForm } from '../components/PromoForm'
import type { HeroContent, PromoBlock } from '../lib/supabase'

interface HeroProps {
  hero: HeroContent | null
  promo: PromoBlock | null
}

// Дефолтные данные
const defaultHero: HeroContent = {
  id: 1,
  title: 'Ведущий центр перманентного макияжа и косметологии в Москве',
  subtitle: '',
  address: 'ул. Мантулинская 9к2',
  metro_station: 'Деловой центр',
  background_image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
  rating: 5.0,
  rating_text: 'только реальные отзывы',
  created_at: '',
  updated_at: '',
}

export function Hero({ hero, promo }: HeroProps) {
  const data = hero || defaultHero

  return (
    <section className="relative min-h-screen pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${data.background_image})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 lg:px-8 py-16 lg:py-24 min-h-[calc(100vh-80px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left Column - Text */}
          <div className="text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-hero font-bold leading-tight">
              {data.title}
            </h1>

            {/* Metro Address */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">М</span>
              </div>
              <span className="text-lg">
                {data.metro_station}, {data.address}
              </span>
            </div>

            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-semibold">Рейтинг {data.rating},</span>
              <a href="#reviews" className="underline hover:no-underline">
                {data.rating_text}
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:justify-end">
            <PromoForm promo={promo} />
          </div>
        </div>
      </div>
    </section>
  )
}
