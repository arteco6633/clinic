import { useState, useEffect, useRef } from 'react'
import { 
  getHeroContent, 
  updateHeroContent, 
  createHeroContent,
  uploadImage,
  type HeroContent 
} from '../lib/supabase'

const defaultHero = {
  title: 'DESIGN FOR EVERYONE',
  subtitle_top: 'MADE IN FRAMER',
  tagline: 'THOUGHTFUL DESIGN ACROSS BRANDS, PRODUCTS, AND DIGITAL EXPERIENCES',
  description: 'WE HELP IDEAS BECOME CLEAR, USABLE, AND BEAUTIFULLY CRAFTED',
  button_text: 'SCHEDULE A CALL',
  background_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
}

export function AdminPage() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    subtitle_top: '',
    tagline: '',
    description: '',
    button_text: '',
    background_image: '',
  })

  useEffect(() => {
    fetchHero()
  }, [])

  async function fetchHero() {
    setLoading(true)
    const data = await getHeroContent()
    if (data) {
      setHero(data)
      setFormData({
        title: data.title || defaultHero.title,
        subtitle_top: data.subtitle_top || defaultHero.subtitle_top,
        tagline: data.tagline || defaultHero.tagline,
        description: data.description || defaultHero.description,
        button_text: data.button_text || defaultHero.button_text,
        background_image: data.background_image || defaultHero.background_image,
      })
    } else {
      setFormData(defaultHero)
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      let result
      if (hero?.id) {
        result = await updateHeroContent(hero.id, formData)
      } else {
        result = await createHeroContent(formData)
      }

      if (result) {
        setHero(result)
        setMessage({ type: 'success', text: 'Изменения сохранены!' })
      } else {
        setMessage({ type: 'error', text: 'Ошибка сохранения. Проверьте подключение к Supabase.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Произошла ошибка' })
    }

    setSaving(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    const url = await uploadImage(file, 'hero')
    
    if (url) {
      setFormData(prev => ({ ...prev, background_image: url }))
      setMessage({ type: 'success', text: 'Изображение загружено!' })
    } else {
      setMessage({ type: 'error', text: 'Ошибка загрузки изображения. Проверьте настройки Storage в Supabase.' })
    }

    setUploading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-neutral-400 hover:text-white transition-colors">
              ← На сайт
            </a>
            <h1 className="text-xl font-semibold">Админ-панель</h1>
          </div>
          <span className="text-sm text-neutral-500">SELENA CLINIC</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold mb-6">Hero секция</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Background Image */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Фоновое изображение
                </label>
                <div className="space-y-3">
                  {/* Current Image Preview */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-700">
                    <img 
                      src={formData.background_image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  {/* Upload Button */}
                  <div className="flex gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Загрузка...' : '📷 Загрузить новое фото'}
                    </button>
                  </div>

                  {/* URL Input */}
                  <input
                    type="url"
                    placeholder="Или вставьте URL изображения"
                    value={formData.background_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, background_image: e.target.value }))}
                    className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Главный заголовок (3 слова через пробел)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="DESIGN FOR EVERYONE"
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500"
                />
                <p className="mt-1 text-xs text-neutral-500">Последнее слово будет фиолетовым</p>
              </div>

              {/* Subtitle Top */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Подзаголовок сверху
                </label>
                <input
                  type="text"
                  value={formData.subtitle_top}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle_top: e.target.value }))}
                  placeholder="MADE IN FRAMER"
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Слоган
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="THOUGHTFUL DESIGN ACROSS..."
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="WE HELP IDEAS BECOME..."
                  rows={2}
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Текст кнопки
                </label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                  placeholder="SCHEDULE A CALL"
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold mb-6">Превью</h2>
            
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black">
              {/* Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="absolute w-full h-full opacity-60"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(57, 255, 20, 0.3) 0%, transparent 60%)',
                  }}
                />
                <img
                  src={formData.background_image}
                  alt="Preview"
                  className="w-2/3 h-4/5 object-cover object-top grayscale opacity-80"
                  style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                <p className="text-white/50 text-[8px] tracking-widest mb-1">
                  {formData.subtitle_top}
                </p>
                <p className="text-white/70 text-[6px] tracking-wider mb-4 max-w-[80%]">
                  {formData.tagline}
                </p>
                
                <div className="space-y-0">
                  {formData.title.split(' ').map((word, i, arr) => (
                    <div 
                      key={i}
                      className={`text-[24px] font-black leading-[0.9] ${
                        i === arr.length - 1 ? 'text-purple-400' : 'text-white'
                      }`}
                    >
                      {word}
                    </div>
                  ))}
                </div>

                <p className="text-white/60 text-[6px] tracking-wider mt-4 max-w-[80%]">
                  {formData.description}
                </p>
                
                <div className="mt-3 px-3 py-1 border border-white/30 text-[6px] text-white tracking-widest">
                  {formData.button_text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-neutral-800/30 rounded-2xl p-6 border border-neutral-700">
          <h3 className="text-lg font-semibold mb-4">📋 Настройка Supabase</h3>
          <p className="text-neutral-400 text-sm mb-4">
            Для работы админ-панели выполните следующие SQL-запросы в Supabase:
          </p>
          <pre className="bg-neutral-900 rounded-lg p-4 text-xs text-green-400 overflow-x-auto">
{`-- Создание таблицы hero_content
CREATE TABLE hero_content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'DESIGN FOR EVERYONE',
  subtitle_top TEXT DEFAULT 'MADE IN FRAMER',
  tagline TEXT,
  description TEXT,
  button_text TEXT DEFAULT 'SCHEDULE A CALL',
  background_image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Включить RLS
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (все могут читать)
CREATE POLICY "Allow public read" ON hero_content
  FOR SELECT USING (true);

-- Политика для записи (все могут писать - для теста)
CREATE POLICY "Allow public write" ON hero_content
  FOR ALL USING (true);

-- Создать bucket для изображений
-- Storage → New bucket → Name: images → Public: true`}
          </pre>
        </div>
      </main>
    </div>
  )
}
