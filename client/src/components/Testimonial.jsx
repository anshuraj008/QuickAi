import { useEffect, useRef, useState } from "react"
import { assets } from "../assets/assets"

const Testimonial = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <div ref={sectionRef} className='px-4 sm:px-20 xl:px-32 py-24'>
            <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className='text-slate-700 dark:text-white text-[42px] font-semibold transition-colors'>
                    <span className='bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text'>Loved by Creators</span>
                </h2>
                <p className='text-gray-500 dark:text-gray-400 max-w-lg mx-auto transition-colors'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className={`p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] dark:bg-indigo-900/50 dark:border-indigo-700 shadow-lg border border-gray-100 hover:-translate-y-2 hover:scale-105 dark:hover:shadow-purple-500/30 transition-all duration-500 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <div className="flex items-center gap-1">
                             {Array(5).fill(0).map((_, index)=> (<img key={index}  src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon} className='w-4 h-4' alt="star"/>))}
                        </div>
                        <p className='text-gray-500 dark:text-gray-300 text-sm my-5 transition-colors'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300 dark:border-gray-600' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600 dark:text-gray-300 transition-colors'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
