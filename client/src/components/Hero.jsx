import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      // Trigger animations after component mounts
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }, [])

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center
     bg-[url(/gradientBackground.png)] dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 bg-cover bg-no-repeat min-h-screen transition-colors duration-300 overflow-hidden'>

     {/* Floating decorative elements */}
     <div className='absolute inset-0 overflow-hidden pointer-events-none'>
       <div className='absolute top-20 left-10 w-72 h-72 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl animate-pulse'></div>
       <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
     </div>

     <div className={`text-center mb-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
        font-semibold mx-auto leading-[1.2] dark:text-white transition-colors'>
          <span className={`inline-block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>Use AI Tools to</span>
          <br/>
          <span className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>craft</span>{' '}
          <span className={`bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text font-bold inline-block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>stunning content</span>
        </h1>
        <p className={`mt-4 max-w-x5 sm:max-w-lg 2xl:max-w-xl m-auto
        max-sm:text-xs text-gray-600 dark:text-gray-300 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Create smarter, faster, and better with our premium AI tools—write content, generate visuals, and boost your productivity.
        </p>
     </div>

     <div className={`flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs relative z-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <button 
        onClick={() => navigate('/ai')} 
        className='bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-3 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-300/50 active:scale-95 transition-all duration-300 cursor-pointer font-semibold group relative overflow-hidden'
      >
        <span className='relative z-10'>Start Creating Now</span>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </button>
      <button className='bg-white dark:bg-indigo-900 dark:text-white dark:border-indigo-700 px-10 py-3 rounded-lg border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:border-pink-300 dark:hover:border-purple-500 active:scale-95 transition-all duration-300 cursor-pointer font-medium hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-indigo-900 dark:hover:to-purple-900'>
        Watch Demo
      </button>
     </div>
     <div className={`flex items-center gap-4 mt-8 mx-auto text-gray-600 dark:text-gray-300 relative z-10 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <img src={assets.user_group} alt="" className='h-8 animate-bounce' style={{animationDuration: '3s'}}/> 
          <span className='font-medium'>Trusted by <span className='font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text'>10k+</span> users</span>
     </div>
      
    </div>
  )
}

export default Hero
