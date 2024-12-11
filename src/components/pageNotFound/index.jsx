import React from 'react'
import notFoundImg from '../../assets/page-not-found.gif'
import { FaHome } from "react-icons/fa";
import {Link} from 'react-router-dom'
const index = () => {
  return (
    <div className='py-4 md:py-6 lg:py-7 xl:py-14'>
     <div className='container flex flex-col items-center justify-center gap-x-3 md:flex-row gap-y-4'>
      <div className='md:w-1/2'>
        <img src={notFoundImg} alt="school dekho page not found"  className='md:h-96 rounded-md'/>
      </div>
      <div className='flex flex-col items-center justify-center md:w-1/2'>
        <h3 className='text-2xl font-bold tracking-wide text-center font-roboto mb-2 md:mb-7 md:text-3xl lg:text-4xl xl:text-5xl'>
        Oops! That page can't be found.
        </h3>
        <p className='text-base tracking-wide text-center text-gray-500 font-roboto  md:text-lg'>It looks like nothing was found at this location. Maybe try one of the links below or a search?
</p>
<Link to='/'><button className='flex items-center justify-center px-5 py-2 font-medium tracking-wide transition-all duration-300 mt-7  hover:bg-brand_text text-brand_text hover:text-white primary-btn font-roboto gap-x-2'> <span className='text-xl mb-1'><FaHome /> </span>  Go Back To Home Page</button></Link>
      </div>
 
     </div>
    </div>
  )
}

export default index
