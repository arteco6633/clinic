import { useState } from 'react'
import type { PromoBlock } from '../lib/supabase'

interface PromoFormProps {
  promo: PromoBlock | null
}

// Дефолтные данные если нет данных из Supabase
const defaultPromo: PromoBlock = {
  id: 1,
  title: 'на первое посещение до 31 января',
  highlight_text: 'До -10 000 ₽',
  description: 'Количество мест — 20. Только для новых клиентов. Оставьте контактные данные и мы перезвоним вам в ближайшие 5 минут.',
  deadline: '2025-01-31',
  button_text: 'Забронировать скидку',
  places_left: 20,
  is_active: true,
  created_at: '',
  updated_at: '',
}

export function PromoForm({ promo }: PromoFormProps) {
  const data = promo || defaultPromo
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreed: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreed) {
      alert('Пожалуйста, согласитесь с политикой конфиденциальности')
      return
    }
    
    setIsSubmitting(true)
    // Здесь будет отправка данных
    console.log('Form submitted:', formData)
    
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
      setFormData({ name: '', phone: '', agreed: false })
    }, 1000)
  }

  return (
    <div className="bg-cream rounded-3xl p-6 md:p-8 shadow-form w-full max-w-md">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
        <span className="text-accent">{data.highlight_text}</span>{' '}
        {data.title}
      </h2>

      {/* Description */}
      <p className="text-neutral-600 text-sm mb-6">
        {data.description}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Имя Фамилия
          </label>
          <input
            type="text"
            id="name"
            placeholder="Мария Иванова"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Номер телефона
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <span className="text-lg">🇷🇺</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <input
              type="tel"
              id="phone"
              placeholder="+7 (000) 000-00-00"
              className="input-field pl-20"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreement"
            className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
            checked={formData.agreed}
            onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
          />
          <label htmlFor="agreement" className="text-sm text-neutral-600">
            Я соглашаюсь с{' '}
            <a href="/privacy" className="text-primary underline hover:no-underline">
              политикой конфиденциальности
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : data.button_text}
        </button>
      </form>
    </div>
  )
}
