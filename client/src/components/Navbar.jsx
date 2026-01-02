import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { isDark, toggleTheme } = useTheme()
    
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl dark:bg-slate-900/80 flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=> navigate('/')}/>
      <div className='flex items-center gap-4'>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className='relative w-14 h-7 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50'
          aria-label='Toggle theme'
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
            {isDark ? <Moon className='w-3 h-3 text-indigo-600' /> : <Sun className='w-3 h-3 text-amber-500' />}
          </div>
        </button>
        {
          user ? <UserButton/> : (
                <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-2.5 hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105 transition-all duration-300 font-semibold'>Get Started <ArrowRight className='w-4 h-4'/> </button>
          )
        }
      </div>
    
    
    </div>
  )
}

export default Navbar
