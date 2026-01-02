import React from 'react'
import { NavLink } from 'react-router-dom'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import {  Image, LogOut, House, SquarePen, Hash, Eraser, Scissors, FileText, Users } from 'lucide-react'

const navItems = [
  
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className={`w-60 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-indigo-800 flex flex-col
      max-sm:fixed max-sm:top-14 max-sm:left-0 max-sm:bottom-0 max-sm:z-50 max-sm:shadow-2xl
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out overflow-hidden`}>

      <div className="my-7 w-full flex-1 overflow-y-auto">
        <img src={user?.imageUrl} alt="User avatar" className="w-14 rounded-full mx-auto" />
        <h1 className="mt-1 text-center dark:text-white transition-colors">{user?.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 dark:text-gray-300 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded transition-all duration-300
                ${isActive ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-indigo-900/50'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-indigo-800 p-4 px-7 flex items-center justify-between flex-shrink-0">
        <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer">
          <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
             <div>
                <h1 className='text-sm font-medium dark:text-white transition-colors'>{user.fullName}</h1>
                <p className='text-xs text-gray-500 dark:text-gray-400 transition-colors'>
                      <Protect plan='premium' fallback="Free">Premium</Protect>
                      Plan 

                </p>
             </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition cursor-pointer"
        />
      </div>
       
       
    </div>
  )
}

export default Sidebar
