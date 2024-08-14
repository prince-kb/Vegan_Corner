import Category2 from "./Category2"


const Cart = () => {

  return (
    <div>
      {/* <h1 className="text-6xl">CART</h1>
      <Category2 type='cart' />
      <h1 className="text-6xl">WISHLIST</h1>
      <Category2 type='wishlist' /> */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-janime tracking-widest mt-8 my-4 text-center ">MY CART</h1>
      <Category2 type='cart' />
    </div>
  )
}

export default Cart
