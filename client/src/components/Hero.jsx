import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

    const navigate = useNavigate()
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center
     bg-[url(/gradientBackground.png)] dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 bg-cover bg-no-repeat min-h-screen transition-colors duration-300'>

     <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
        font-semibold mx-auto leading-[1.2] dark:text-white transition-colors'>Use AI Tools to <br/> craft <span className='bg-gradient-to-r  dark:from-pink-500 dark:to-purple-500 text-transparent bg-clip-text font-bold animate-pulse'> stunning content</span></h1>
        <p className='mt-4 max-w-x5 sm:max-w-lg 2xl:max-w-xl m-auto
        max-sm:text-xs text-gray-600 dark:text-gray-300 transition-colors'>Create smarter, faster, and better with our premium AI tools—write content, generate visuals, and boost your productivity.</p>
     </div>

     <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
      <button onClick={() => navigate('/ai')}  className='bg-gradient-to-r  dark:from-pink-500 dark:to-purple-500 text-white px-10 py-3 rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-pink-300/50 active:scale-95 transition-all duration-300 cursor-pointer font-semibold'>Start Creating Now </button>
      <button className='bg-white dark:bg-indigo-900 dark:text-white dark:border-indigo-700 px-10 py-3 rounded-lg border-2 border-gray-300 hover:scale-105 hover:shadow-xl hover:border-pink-300 dark:hover:border-purple-500 active:scale-95 transition-all duration-300 cursor-pointer font-medium'>Watch Demo</button>
     </div>
     <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600 dark:text-gray-300 transition-colors'>
          <img src={assets.user_group} alt="" className='h-8'/> Trusted by 10k+ users
     </div>
      
    </div>
  )
}

export default Hero
