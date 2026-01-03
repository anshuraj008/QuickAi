import { Image, Sparkles, Hash, Download } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyle = [
    'Realistic',
    'Cartoon style',
    '3D style',
    'Ghibli style',
    'Pixel Art',
    'Anime',
    'Sketch',
    'Fantasy style'
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`


      const {data} = await axios.post('/api/ai/generate-image', {prompt, publish}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
      setContent(data.content)
      } else {
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
    setLoading(false)
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

      {/* LEFT COLUMN */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 h-6 text-[#00AD25]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='Describe what you want to see in the image...'
          required
        />

        <p className='mt-4 text-sm font-medium'>Style</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {imageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer
                ${selectedStyle === item
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : 'text-gray-500 border-gray-300'
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* PUBLISH TOGGLE */}
        <div className='my-6 flex items-center gap-3'>
          <label className='relative cursor-pointer'>
            <input
              type='checkbox'
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className='sr-only peer'
            />
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make this Image Public</p>
        </div>

        <button
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2
            bg-gradient-to-b from-[#00AD25] to-[#04FF50]
            text-white px-4 py-2 mt-6 text-sm rounded-lg ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'} transition-opacity`}
        >
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin'></span> 
          : <Image className='w-5 h-5' />}
          {loading ? 'Generating Image...' : 'Generate Image'}
        </button>
      </form>

      {/* RIGHT COLUMN */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 text-[#00AD25]' />
            <h1 className='text-xl font-semibold'>Generated Image</h1>
          </div>
          {content && (
            <button
              onClick={downloadImage}
              className='flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors'
            >
              <Download className='w-4 h-4' />
              Download
            </button>
          )}
        </div>

        { loading ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
              <div className='w-12 h-12 rounded-full border-4 border-gray-200 border-t-green-500 animate-spin'></div>
              <p>Generating image, please wait...</p>
            </div>
          </div>
        ) : !content ? (
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Image className='w-9 h-9' />
            <p>Enter a prompt and click "Generate Image"</p>
          </div>
        </div>
        ) : (
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full'/>
          </div>
        ) }
      </div>
    </div>
  )
}

export default GenerateImages;
