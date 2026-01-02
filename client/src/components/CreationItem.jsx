import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Image, FileText, Lightbulb } from 'lucide-react'

const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false)

    const getIcon = () => {
        switch(item.type) {
            case 'image': return <Image className='w-4 h-4'/>
            case 'article': return <FileText className='w-4 h-4'/>
            case 'blog-title': return <Lightbulb className='w-4 h-4'/>
            default: return <FileText className='w-4 h-4'/>
        }
    }

    const getTypeColor = () => {
        switch(item.type) {
            case 'image': return 'bg-emerald-50 border-emerald-200 text-emerald-700'
            case 'article': return 'bg-blue-50 border-blue-200 text-blue-700'
            case 'blog-title': return 'bg-amber-50 border-amber-200 text-amber-700'
            default: return 'bg-slate-50 border-slate-200 text-slate-700'
        }
    }

  return (
    <div onClick={()=> setExpanded(!expanded)} className='group relative p-5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-blue-300'>
      
      {/* Hover gradient effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300'></div>
      
      <div className='relative z-10'>
        <div className='flex justify-between items-start gap-4'>
          <div className='flex-1'>
            <div className='flex items-start gap-3'>
              <div className={`mt-1 w-8 h-8 rounded-lg ${getTypeColor()} flex items-center justify-center flex-shrink-0`}>
                {getIcon()}
              </div>
              <div className='flex-1 min-w-0'>
                <h2 className='font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                  {item.prompt}
                </h2>
                <p className='text-sm text-slate-500 flex items-center gap-2'>
                  <span className='capitalize'>{item.type.replace('-', ' ')}</span>
                  <span className='w-1 h-1 bg-slate-400 rounded-full'></span>
                  <span>{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className='flex items-center gap-2 flex-shrink-0'>
            <button className={`${getTypeColor()} border px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105`}>
              {getIcon()}
              {item.type}
            </button>
            <div className='w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors'>
              {expanded ? <ChevronUp className='w-4 h-4 text-slate-600'/> : <ChevronDown className='w-4 h-4 text-slate-600'/>}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className='mt-5 pt-5 border-t border-slate-200'>
            {item.type === 'image' ? (
              <div className='flex justify-center'>
                <img 
                  src={item.content} 
                  alt="AI Generated" 
                  className='rounded-xl shadow-xl max-w-md w-full border border-slate-200 hover:scale-105 transition-transform duration-300' 
                />
              </div>
            ) : (
              <div className='prose prose-slate max-w-none'>
                <div className='p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed'>
                  <Markdown>
                    {item.content}
                  </Markdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreationItem
