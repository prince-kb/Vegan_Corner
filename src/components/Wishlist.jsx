import React from 'react'
import Category2 from './Category2'

const Wishlist = () => {
  return (
    <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-janime tracking-widest mt-8 my-4 text-center ">MY WISHLIST</h1>
        <Category2 type='wishlist' />
    </div>
  )
}

export default Wishlist
