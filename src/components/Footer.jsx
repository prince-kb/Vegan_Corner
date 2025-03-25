import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className="text-gray-800 text-center w-full flex-center flex-col mt-4 mb-8">
            <h3 className='font-semibold tracking-wide sub-heading'>VEGAN'S CORNER</h3>
            <h3 className='font-semibold tracking-wide paratext'>A Non-ISO certified company.</h3>
            <h3 className='font-semibold tracking-wide smalltext mt-2'>© 2024 All Rights Reserved.</h3>
            <h3 className='font-semibold tracking-wide smalltext mt-2'>For any complain/suggestion <Link to="https://princekb.tech/contact" target='_blank' className='underline hover:text-gray-500'>VISIT ME</Link></h3>
        </footer>

    </div>
  )
}

export default Footer