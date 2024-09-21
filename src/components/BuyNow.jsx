import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateBuyNow,updateQuantity } from '../redux/slices/buyNowSlice'

import debitIcon from "../assets/icons/debit.svg"
import upiIcon from "../assets/icons/upi.svg"
import creditIcon from "../assets/icons/credit.svg"
import codIcon from "../assets/icons/cod.svg"
import { useEffect, useState } from 'react'

const BuyNow = () => {

    const user = useSelector(state => state.user.user)
    const catalogue = useSelector(state => state.catalogue.Catalogue)
    const buyNow = useSelector(state => state.buyNow.buynow)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(1);

    const placeOrder = () => {
        alert('Order Placed Successfully');
        navigate('/')
    }

    const [item, setItem] = useState(null)

    const deliveryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toDateString();

    useEffect(() => {
        buyNow?.id && setItem(catalogue.find((product) => product.id === buyNow.id))
    },[buyNow,user,catalogue,item])


    return (

        <div>
            {
                !buyNow?.id ? <div className="my-4 lg:my-8 mt-12 flex-center flex-col gap-6 ">
                    <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">OOPS! The page was refreshed</h1>
                    <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">Please click on buynow again on the product page.</h2>
                    <button onClick={() => navigate(-1)} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >Go back to product page</button>
                </div> :
                    !user ?
                        <div>
                            <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Not LOGGED IN!</h1>
                            <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">Please login to continue.</h2>
                            <button onClick={() => navigate('/login')} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >LOGIN</button>

                        </div> : !catalogue ?
                            <div>
                                <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Product not found!</h1>
                                <button onClick={() => window.location.reload()} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >REFRESH</button>
                            </div> : item &&

                            <div className="my-4 lg:my-8 mt-12 justify-center ">
                                <div className='mx-auto flex justify-around w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] items-center my-2 border rounded-2xl'>
                                    <img onClick={() => navigate(`/product/${item.id}`)} src={item.image} alt={item.name} className='cursor-pointer w-1/4 rounded-3xl p-2' />
                                    <div onClick={() => navigate(`/product/${item.id}`)} className='cursor-pointer flex flex-col gap-4'>
                                        <h1 className='text-center mx-2 text-2xl font-bold'>{item.name} ({item.quantity})</h1>
                                        <h1 className='text-center mx-2 text-2xl text-green-600 font-bubble font-bold'>₹{item.price}</h1>
                                    </div>
                                    <div>
                                        <div className='mr-4 md:mr-6 flex flex-col gap-2'>
                                            <button onClick={() => {dispatch(updateQuantity(1));}} className='text-2xl font-bold hover:-translate-y-1 hover:scale-110 bg-orange  transition-all text-white px-2 pb-1 rounded-xl'>+</button>
                                            <h2 className='text-xl text-center md:text-2xl font-bold'>{buyNow?.quantity | 1}</h2>
                                            <button onClick={() => {dispatch(updateQuantity(-1));}} className='text-2xl font-bold hover:translate-y-1 hover:scale-110 bg-orange  transition-all text-white px-2 pb-2 rounded-xl'>-</button>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className=' border-b-2 border-black my-2 mb-8 z-[1]'>
                                    <h2 className='text-2xl md:text-3xl min-w-fit mx-auto text-black  px-4 py-2 font-bold text-center'>Total Amount : <span className='text-green-600 px-2 py-1 rounded-xl text-[1.1em] '>&#8377; {item && item.price > 399 ? item.price : item.price + 39}</span></h2>
                                    <div>
                                        <h2 className='text-xl md:text-2xl min-w-fit mx-auto text-black px-4 py-2 font-bold text-center'>Delivery by<span className='text-green-700 px-2 py-1 rounded-xl'>{deliveryDate}</span> within 9 PM</h2>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <h2 className='text-2xl bg-orange min-w-fit w-[60%] md:w-[40%] xl:w-[30%] mb-6 mx-auto text-white px-4 py-2 rounded-2xl md:my-auto font-bold text-center'>Deliver to</h2>
                                    <div className='flex flex-col gap-2 ml-4 border-2 py-6 rounded-3xl px-4 my-2 mb-8'>
                                        <div className='md:flex md:gap-2'>
                                            <h3 className='text-xl font-bold'>{user?.name}, </h3>
                                            <h3 className='text-xl font-bold'>{user?.mobile}</h3>
                                        </div>
                                        <div className='md:flex md:gap-4'>
                                            <h3 className='text-xl font-bold'>Address:</h3>
                                            <h3 className='text-xl font-semibold'>{user?.address?.line1}, {user?.address?.line2},</h3>
                                        </div>
                                        <div className='md:flex md:gap-2 '>
                                            <h3 className='text-xl font-semibold'>{user?.address?.city}, {user?.address?.state}</h3>
                                            <h3 className='text-xl font-bold'>{user?.address?.pincode}</h3>
                                        </div>
                                        <div className='absolute bottom-0 right-0 -translate-x-full -translate-y-full font-bold bg-orange md:px-2 md:py-1 px-1 rounded-md hover:bg-brown hover:text-white transition-all cursor-pointer'>CHANGE</div>
                                    </div>
                                </div>


                                <h2 className='text-2xl bg-orange min-w-fit w-[60%] md:w-[50%] lg:w-[40%] mx-auto text-white my-2 px-4 py-2 rounded-2xl font-bold text-center'>Payment Method</h2>

                                <div className='flex flex-col gap-2 ml-4 border-2 py-6 rounded-3xl px-4 mt-2'>

                                    <div className="px-2 md:px-4 py-4 rounded-2xl border my-2 flex justify-between items-center">
                                        <div className='flex'>
                                            <input type="radio" name="method" id="cashondelivery" className='scale-125' checked={checked === 1} onChange={() => setChecked(1)} />
                                            <label htmlFor="cashondelivery" className='text-xl font-bold m-2 ml-4 cursor-pointer'>Cash on Delivery
                                                <div className='text-sm font-medium '>
                                                    <h3 className='font-semibold text-base md:text-lg'>Secure payment using cash or upi at the time of delivery.</h3>
                                                    <h4 className='font-medium text-sm md:text-base'>Available only for orders above &#8377; 399 else a nominal fee of &#8377; 39 will be charged.</h4>
                                                </div>
                                            </label>
                                        </div>
                                        <img src={codIcon} alt="cod" className='size-10 md:size-14 lg:size-20' />
                                    </div>

                                    <div className="px-2 md:px-4 py-4 rounded-2xl border my-2 flex justify-between items-center">
                                        <div className='flex'>
                                            <input type="radio" name="method" id="debitcard" className='scale-125' checked={checked === 2} onChange={() => setChecked(2)} />
                                            <label htmlFor="debitcard" className='text-xl font-bold m-2 ml-4 cursor-pointer'>Debit Card
                                                <div className='text-sm font-medium '>
                                                    <h3 className='font-semibold text-base md:text-lg'>Secure and reliable.</h3>
                                                    <h4 className='font-medium text-sm md:text-base'>Pay using your Rupay or VISA Debit card.</h4>
                                                </div>
                                            </label>
                                        </div>
                                        <img src={debitIcon} alt="cod" className='size-10 md:size-14 lg:size-20' />
                                    </div>

                                    <div className="px-2 md:px-4 py-4 rounded-2xl border my-2 flex justify-between items-center">
                                        <div className='flex'>
                                            <input type="radio" name="method" id="upi" className='scale-125' checked={checked === 3} onChange={() => setChecked(3)} />
                                            <label htmlFor="upi" className='text-xl font-bold m-2 ml-4 cursor-pointer'>UPI
                                                <div className='text-sm font-medium '>
                                                    <h3 className='font-semibold text-base md:text-lg'>Faster and reliable paymet method. </h3>
                                                    <h4 className='font-medium text-sm md:text-base'>Pay using your PayTM, PhonePe, GooglePay, BhimUPI or any other UPI app.</h4>
                                                </div>
                                            </label>
                                        </div>
                                        <img src={upiIcon} alt="cod" className='size-10 md:size-14 lg:size-20' />
                                    </div>

                                    <div className="px-2 md:px-4 py-4 rounded-2xl border my-2 flex justify-between items-center">
                                        <div className='flex'>
                                            <input type="radio" name="method" id="credit" className='scale-125' checked={checked === 4} onChange={() => setChecked(4)} />
                                            <label htmlFor="credit" className='text-xl font-bold m-2 ml-4 cursor-pointer'>Credit Card
                                                <div className='text-sm font-medium '>
                                                    <h3 className='font-semibold text-base md:text-lg'>Faster, reliable and best offer payment method. </h3>
                                                    <h3 className='font-semibold text-sm md:text-base text-green-700'>7% instant discount on SBI, HDFC and IndusInd Bank credit cards.</h3>
                                                    <h4 className='font-medium text-sm md:text-base'>Pay using your Mastercard, from any country.</h4>
                                                </div>
                                            </label>
                                        </div>
                                        <img src={creditIcon} alt="cod" className='size-10 md:size-14 lg:size-20' />
                                    </div>

                                    <div className='bg-orange px-6 py-2 rounded-2xl text-center w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto font-bold text-2xl md:text-3xl text-brown cursor-pointer hover:-translate-y-2 hover:scale-105 transition-all active:ring-2 ring-brown' onClick={placeOrder}>PLACE ORDER </div>

                                </div>
                            </div>
            }
        </div>
    )
}

export default BuyNow
