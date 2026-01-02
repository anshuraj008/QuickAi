import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div  className='text-center'>
           <h2 className='text-slate-700 dark:text-white text-[42px] font-semibold transition-colors'>
              <span className='bg-gradient-to-r  dark:from-pink-500 dark:to-purple-500 text-transparent bg-clip-text'>Choose Your Plan</span>
           </h2>
           <p className='text-gray-500 dark:text-gray-400 max-w-lg max-auto transition-colors'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
        </div>

        <div className='mt-14 max-sm:mx-8'>
            <PricingTable/>
        </div>
    </div>
  )
}

export default Plan
