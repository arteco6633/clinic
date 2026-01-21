import type { HeroContent } from '../lib/supabase'

interface HeroProps {
  hero: HeroContent | null
}

// Дефолтные данные
const defaultHero = {
  subtitle_top: 'SELENA CLINIC',
  tagline: 'ПРОФЕССИОНАЛЬНАЯ КОСМЕТОЛОГИЯ И ПЕРМАНЕНТНЫЙ МАКИЯЖ',
  title: 'DESIGN FOR EVERYONE',
  description: 'МЫ ПОМОГАЕМ ИДЕЯМ СТАТЬ ЯСНЫМИ, УДОБНЫМИ И КРАСИВО ОФОРМЛЕННЫМИ',
  button_text: 'ЗАПИСАТЬСЯ',
  background_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
}

export function Hero({ hero }: HeroProps) {
  const data = {
    subtitle_top: hero?.subtitle_top || defaultHero.subtitle_top,
    tagline: hero?.tagline || defaultHero.tagline,
    title: hero?.title || defaultHero.title,
    description: hero?.description || defaultHero.description,
    button_text: hero?.button_text || defaultHero.button_text,
    background_image: hero?.background_image || defaultHero.background_image,
  }

  // Разбиваем заголовок на слова
  const titleWords = data.title.split(' ')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Green Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Green Glow Background */}
        <div 
          className="absolute w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.4) 0%, rgba(57, 255, 20, 0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Main Image */}
        <div 
          className="relative w-[500px] h-[600px] md:w-[600px] md:h-[750px] lg:w-[700px] lg:h-[850px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)',
          }}
        >
          <img
            src={data.background_image}
            alt="Hero"
            className="w-full h-full object-cover object-top grayscale"
            style={{
              filter: 'grayscale(100%) contrast(1.1)',
              mixBlendMode: 'luminosity',
            }}
          />
          {/* Green Tint Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(57, 255, 20, 0.15) 0%, rgba(57, 255, 20, 0.05) 50%, rgba(57, 255, 20, 0.2) 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Top Subtitle */}
          <p className="text-white/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            {data.subtitle_top}
          </p>

          {/* Tagline */}
          <p className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase max-w-xl mb-12 md:mb-20">
            {data.tagline}
          </p>

          {/* Main Title - Dynamic words */}
          <div className="space-y-0 md:space-y-[-20px] lg:space-y-[-30px]">
            {titleWords.map((word, index) => (
              <h1 
                key={index}
                className={`text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-black leading-[0.85] tracking-tight ${
                  index === titleWords.length - 1 
                    ? 'text-gradient-purple text-glow-purple' 
                    : 'text-white'
                }`}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Bottom Description */}
          <p className="text-white/60 text-xs md:text-sm tracking-[0.15em] uppercase max-w-md mt-12 md:mt-20 mb-8">
            {data.description}
          </p>

          {/* CTA Button */}
          <a href="#contact" className="btn-outline">
            {data.button_text}
          </a>
        </div>
      </div>
    </section>
  )
}
