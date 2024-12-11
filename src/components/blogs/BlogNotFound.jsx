import React from 'react'
import schoolNotFound from '../../assets/school-not-found.png'
const SchoolNotFound = () => {
    return (
        <div className='flex flex-col md:flex-row md:gap-x-5 lg:gap-x-14  justify-center items-center'>
            <div className='bg-normal_bg rounded-md'>
                <img src={schoolNotFound} alt="blog not found in school dekho website" />
            </div>
            <div className='mt-4'>
                <h1 className=' mb-5 font-roboto tracking-wide text-3xl md:text-4xl lg:text-5xl font-semibold text-brand_text'>Oops!</h1>
                <small className='font-roboto tracking-wide text-lg text-gray-500 md:ml-1'>Blogs Not Found !</small>
            </div>

        </div>
    )
}

export default SchoolNotFound