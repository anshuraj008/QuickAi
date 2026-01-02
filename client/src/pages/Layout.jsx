import React, { useState} from 'react'
import { Outlet , useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import {SignIn, useUser} from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen dark:bg-slate-900 transition-colors duration-300'>
       
       <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 dark:border-indigo-800 dark:bg-slate-900 transition-colors duration-300'>
         <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt="" onClick={()=>navigate('/')}/>
         {
          sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-gray-60 dark:text-gray-300 sm:hidden'/>
          : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-gray-60 dark:text-gray-300 sm:hidden'/>
         }
       </nav>
       <div className='flex-1 w-full flex h-[calc(100vh-64px)] overflow-hidden relative'>
       {/* Mobile Overlay */}
       {sidebar && (
         <div 
           className='sm:hidden fixed inset-0 bg-black/50 z-40 top-14'
           onClick={() => setSidebar(false)}
         />
       )}
       <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='flex-1 bg-[#F4F7F8] dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 overflow-y-auto transition-colors duration-300'>
              <Outlet/>
            </div>
       </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout;
