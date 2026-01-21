import type { HeroContent } from '../lib/supabase'

interface HeroProps {
  hero: HeroContent | null
}

// Дефолтные данные
const defaultHero = {
  subtitle_top: 'MADE IN FRAMER',
  tagline: 'THOUGHTFUL DESIGN ACROSS BRANDS, PRODUCTS, AND DIGITAL EXPERIENCES',
  title_line1: 'DESIGN',
  title_line2: 'FOR',
  title_line3: 'EVERYONE',
  description: 'WE HELP IDEAS BECOME CLEAR, USABLE, AND BEAUTIFULLY CRAFTED',
  button_text: 'SCHEDULE A CALL',
  background_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
}

export function Hero({ hero }: HeroProps) {
  const data = hero ? {
    ...defaultHero,
    title_line1: hero.title?.split(' ')[0] || defaultHero.title_line1,
    title_line2: hero.title?.split(' ')[1] || defaultHero.title_line2,
    title_line3: hero.title?.split(' ')[2] || defaultHero.title_line3,
    description: hero.subtitle || defaultHero.description,
    background_image: hero.background_image || defaultHero.background_image,
  } : defaultHero

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
            alt="Design Hero"
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

          {/* Main Title */}
          <div className="space-y-0 md:space-y-[-20px] lg:space-y-[-30px]">
            <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-black leading-[0.85] tracking-tight text-white">
              {data.title_line1}
            </h1>
            <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-black leading-[0.85] tracking-tight text-white">
              {data.title_line2}
            </h1>
            <h1 className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-black leading-[0.85] tracking-tight text-gradient-purple text-glow-purple">
              {data.title_line3}
            </h1>
          </div>

          {/* Bottom Description */}
          <p className="text-white/60 text-xs md:text-sm tracking-[0.15em] uppercase max-w-md mt-12 md:mt-20 mb-8">
            <span className="text-purple">WE HELP</span> {data.description.replace('WE HELP ', '')}
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
