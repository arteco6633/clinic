import { useState } from 'react'

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#price', label: 'Прайс' },
  { href: '#specials', label: 'Спецпредложения' },
  { href: '#about', label: 'О нас' },
  { href: '#journal', label: 'Журнал' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary">
                <path d="M16 2L4 8v8c0 7.732 5.268 14.936 12 17 6.732-2.064 12-9.268 12-17V8L16 2z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-neutral-900">my level</span>
            </div>
            <div className="hidden sm:block text-xs text-neutral-500 border-l border-neutral-200 pl-3">
              Перманентный макияж<br/>и косметология
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2">
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                </svg>
              </a>
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="VKontakte">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.368 1.259 2.183 1.815.616.421 1.085.329 1.085.329l2.175-.03s1.137-.07.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.264-1.183-1.059.462-3.245.999-1.328 1.398-2.139 1.273-2.485-.119-.33-.858-.243-.858-.243l-2.449.015s-.182-.025-.317.056c-.131.079-.216.262-.216.262s-.387 1.028-.903 1.903c-1.089 1.848-1.525 1.946-1.702 1.832-.413-.267-.309-1.073-.309-1.645 0-1.789.272-2.535-.529-2.729-.266-.064-.461-.107-1.14-.114-.872-.009-1.611.003-2.029.208-.278.136-.493.44-.362.457.162.022.529.099.724.363.251.341.243 1.105.243 1.105s.145 2.106-.337 2.368c-.331.18-.785-.187-1.76-1.865-.499-.859-.877-1.809-.877-1.809s-.073-.178-.203-.274c-.158-.116-.378-.153-.378-.153l-2.326.015s-.349.01-.477.161c-.114.135-.009.414-.009.414s1.821 4.258 3.882 6.403c1.889 1.967 4.035 1.838 4.035 1.838h.973z"/>
                </svg>
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            {/* Phone */}
            <a href="tel:+79391128469" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <div className="text-sm">
                <div className="font-semibold">+7 (939) 112-84-69</div>
                <div className="text-xs text-primary-light">Получить консультацию</div>
              </div>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-100">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="nav-link block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
