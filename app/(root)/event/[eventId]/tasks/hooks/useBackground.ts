import { useEffect, useState } from 'react'

const backgrounds = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1280&q=80',
]

export const useBackground = () => {
  const [background, setBackground] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('boardBackground')
    if (saved) setBackground(saved)
  }, [])

  useEffect(() => {
    if (background) localStorage.setItem('boardBackground', background)
    else localStorage.removeItem('boardBackground')
  }, [background])

  return { background, setBackground, backgrounds }
}
