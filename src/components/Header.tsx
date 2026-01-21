import { useState, useEffect } from 'react'

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = days[date.getDay()]
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    })
    return `${day}, ${time}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-start gap-1.5 group"
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Logo - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="/" className="text-white text-lg md:text-xl font-medium tracking-[0.3em] uppercase">
              NIVORA
            </a>
          </div>

          {/* Time - Right */}
          <div className="hidden md:block text-white/70 text-sm tracking-wide">
            {formatTime(currentTime)}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 pt-24">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {['Work', 'About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-4xl md:text-5xl font-bold text-white hover:text-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
