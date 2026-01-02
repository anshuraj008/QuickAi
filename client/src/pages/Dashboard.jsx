import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles, TrendingUp, Zap, Calendar, Image, FileText } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {


    const [creations, setCreations] = useState([])
    const [loading, setLoading] = useState(true)
  
      const {getToken} = useAuth()

     const getDashboardData = async () => {

        try{
      const {data} = await axios.get('/api/user/get-user-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
       } 
    setLoading(false)
    }

     useEffect(()=>{
        getDashboardData()
     }, [])

     // Calculate statistics
     const imageCount = creations.filter(c => c.type === 'image').length
     const articleCount = creations.filter(c => c.type === 'article').length
     const blogCount = creations.filter(c => c.type === 'blog-title').length

  return (
    <div className='min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8'>
      
      {/* Header Section */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
          Welcome Back!
        </h1>
        <p className='text-slate-600 flex items-center gap-2'>
          <Calendar className='w-4 h-4'/> 
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        
        {/* Total Creations Card */}
        <div className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:scale-105 overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg'>
                <Sparkles className='w-7 h-7 text-white'/>
              </div>
              <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                <TrendingUp className='w-3 h-3 inline mr-1'/>
                Total
              </span>
            </div>
            <p className='text-sm text-slate-500 font-medium mb-1'>Total Creations</p>
            <h2 className='text-4xl font-bold text-slate-800'>{creations.length}</h2>
          </div>
        </div>

        {/* Active Plan Card */}
        <div className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:scale-105 overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg'>
                <Gem className='w-7 h-7 text-white'/>
              </div>
              <span className='text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full'>
                <Zap className='w-3 h-3 inline mr-1'/>
                Active
              </span>
            </div>
            <p className='text-sm text-slate-500 font-medium mb-1'>Current Plan</p>
            <h2 className='text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
              <Protect plan='premium' fallback="Free">Premium</Protect>
            </h2>
          </div>
        </div>

        {/* Images Generated Card */}
        <div className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:scale-105 overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg'>
                <Image className='w-7 h-7 text-white'/>
              </div>
              <span className='text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full'>
                Images
              </span>
            </div>
            <p className='text-sm text-slate-500 font-medium mb-1'>Images Created</p>
            <h2 className='text-4xl font-bold text-slate-800'>{imageCount}</h2>
          </div>
        </div>

        {/* Articles Generated Card */}
        <div className='group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:scale-105 overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg'>
                <FileText className='w-7 h-7 text-white'/>
              </div>
              <span className='text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full'>
                Content
              </span>
            </div>
            <p className='text-sm text-slate-500 font-medium mb-1'>Articles & Blogs</p>
            <h2 className='text-4xl font-bold text-slate-800'>{articleCount + blogCount}</h2>
          </div>
        </div>

      </div>

      {/* Recent Creations Section */}
      
      <div className='bg-white rounded-2xl shadow-lg p-6 border border-slate-200'>
        <div className='flex items-center justify-between mb-6'>
        {
        loading ? (
          <div className='flex justify-center items-center h-3/4'>
            <span className='w-11 h-11 my-1 rounded-full border-3 border-purple-500 border-t-transparent animate-spin'></span>
          </div>
        ) : (
           <div>
            <h3 className='text-2xl font-bold text-slate-800'>Recent Creations</h3>
            <p className='text-sm text-slate-500 mt-1'>Your latest AI-generated content</p>
          </div>
        )
        }
          <div className='flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-lg'>
            <Sparkles className='w-4 h-4 text-blue-500'/>
            {creations.length} Total
          </div>
        </div>
        
        <div className='space-y-4'>
          {creations.length > 0 ? (
            creations.map((item)=> <CreationItem key={item.id} item={item}/>)
          ) : (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Sparkles className='w-8 h-8 text-slate-400'/>
              </div>
              <p className='text-slate-500 text-lg'>No creations yet</p>
              <p className='text-slate-400 text-sm mt-2'>Start creating amazing content with AI!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
