import { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('')
  useEffect(() => {
    if (window.matchMedia('prefer-color-scheme: dark').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemeSwitch = (element) => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <button
      onClick={handleThemeSwitch}
      className='text-yellow-200'
    >
      {theme === 'dark' ? <FaMoon className={`${theme === 'dark' ? 'text-white' : ''}`} /> : <BsSunFill />}
    </button>
  )
}
export default ThemeSwitcher
