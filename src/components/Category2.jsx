import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from './Category'
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../redux/slices/notificationSlice';
import { setUser } from '../redux/slices/userSlice';

const Category2 = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const catalogue = useSelector(state => state.catalogue.Catalogue)
    const user = useSelector(state => state.user.user)
    const [all, setAll] = useState([])

    useEffect(() => {
        if (props.type === 'cart' && user && catalogue.length > 1) {
            setAll(catalogue.filter((item) => {
                return user.cart.filter(function (cartItem) {
                    return cartItem.id === item.id
                }).length !== 0;
            }))
        } else if (props.type === 'wishlist' && user && catalogue.length > 1) {
            setAll(catalogue.filter((item) => {
                return user.wishlist.filter(function (wishlistItem) {
                    return wishlistItem === item.id
                }).length !== 0;
            }))
        }
    }, [user, catalogue])

    const autoLogin = async () => {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET

        const token = localStorage.getItem('authy');
        if (token) {
            const response = await fetch(`${API}/api/user/getuser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'secret': SERVER_SECRET,
                    'authToken': token
                }
            })
            const data = await response.json();
            if (data.success === false) {
                dispatch(setUser({}));
                return;
            }
            dispatch(setUser(data));
        }
    }

    const remove = async (id) => {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const token = localStorage.getItem('authy');

        if (props.type === 'cart') {
            const response = await fetch(`${API}/api/user/removefromcart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'secret': SERVER_SECRET,
                    'authToken': token
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json();
            if (data.success) {
                if (data.message === 'Item removed from cart'){
                    window.location.reload(false);
                    dispatch(setNotification({ message: data.message, type: 'success', logo: 'brokenheart' }))
                }
                else dispatch(setNotification({ message: data.message, type: 'error', logo: 'heart' }))
                await autoLogin();
            } else dispatch(setNotification({ message: data.message, type: 'warning', logo: 'brokenheart' }))


        } else if (props.type === 'wishlist') {
            const response = await fetch(`${API}/api/user/wishlist`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'secret': SERVER_SECRET,
                    'authToken': token
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json();
            if (data.success) {
                if (data.message === 'Item removed from wishlist') dispatch(setNotification({ message: data.message, type: 'success', logo: 'brokenheart' }))
                else dispatch(setNotification({ message: data.message, type: 'error', logo: 'heart' }))
                autoLogin();
            } else dispatch(setNotification({ message: data.message, type: 'warning', logo: 'brokenheart' }))
        }
    }

    const addCart = async (id) => {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const token = localStorage.getItem('authy');
        const response = await fetch(`${API}/api/user/addtocart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'secret': SERVER_SECRET,
                'authToken': token
            },
            body: JSON.stringify({ id })
        })
        const data = await response.json();
        if (data.success) {
            if (data.message === 'Item added to cart') dispatch(setNotification({ message: data.message, type: 'success', logo: 'cart' }))
            else dispatch(setNotification({ message: data.message, type: 'error', logo: 'cart' }))
            autoLogin();
        } else dispatch(setNotification({ message: 'Unavailable, try again', type: 'warning', logo: 'cart' }))
    }

    const subtractCart = async (id) => {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const token = localStorage.getItem('authy');
        const response = await fetch(`${API}/api/user/updatecart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'secret': SERVER_SECRET,
                'authToken': token
            },
            body: JSON.stringify({ id })
        })
        const data = await response.json();
        if (data.success) {
            if (data.remove === true) {
                dispatch(setNotification({ message: data.message, type: 'success', logo: 'cart' }))
                window.location.reload(false);
            } else if (data.message === 'Item removed from cart') {
                dispatch(setNotification({ message: data.message, type: 'success', logo: 'cart' }))
            } else if(data) dispatch(setNotification({ message: data.message, type: 'error', logo: 'cart' }))
            await autoLogin();
        } else {
            dispatch(setNotification({ message: 'Unavailable, try again', type: 'warning', logo: 'cart' }))
        }
    }


    return (
        <div className='z-[3] mt-8 '>
            {all.length > 0 ? all.map((item, i) => {
                return <div key={item.id} className=' relative flex items-center justify-center gap-4 my-2'>
                    <div className=' flex justify-around w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] items-center my-2 border rounded-2xl'>
                        <img onClick={() => navigate(`/product/${item.id}`)} src={item.image} alt={item.name} className='cursor-pointer w-1/4 rounded-3xl p-2' />
                        <div onClick={() => navigate(`/product/${item.id}`)} className='cursor-pointer flex flex-col gap-4'>
                            <h1 className='text-center mx-2 text-2xl font-bold'>{item.name} ({item.quantity})</h1>
                            <h1 className='text-center mx-2 text-2xl text-green-600 font-bubble font-bold'>₹{item.price}</h1>
                        </div>
                        <div>{
                            props.type === 'cart'  && <div className='mr-4 md:mr-6 flex flex-col gap-2'>
                                <button onClick={() => addCart(item.id)} className='text-2xl font-bold hover:-translate-y-1 hover:scale-110 bg-orange  transition-all text-white px-2 pb-1 rounded-xl'>+</button>
                                <h2 className='text-xl text-center md:text-2xl font-bold'>{user.cart.filter((item1)=>item1.id===item.id)[0].quantity}</h2>
                                <button onClick={() => subtractCart(item.id)} className='text-2xl font-bold hover:translate-y-1 hover:scale-110 bg-orange  transition-all text-white px-2 pb-2 rounded-xl'>-</button>
                            </div>
                        }
                        </div>
                    </div>

                    <div onClick={() => { remove(item.id) }} className='absolute rounded-full p-0 md:p-1 right-0 top-0 -translate-y-2  -translate-x-[9vw] md:-translate-x-[13vw] lg:-translate-x-[27vw] hover:scale-110 transition-all cursor-pointer border-2 lg:border-4 border-red-600'>
                        <h2 className='md:text-md lg:text-xl'>❌</h2>
                    </div>

                </div>

            })
                : <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl text-brown text-center '>No items, currently in the {props.type.toUpperCase()}</h1>
                    <h1 className='text-2xl text-black text-center'>Add some from the recents or view from the <span onClick={()=>navigate('/')} className='cursor-pointer text-orange hover:text-purple-600 font-medium'>HOMEPAGE</span></h1>
                    <Category type='recent' />
                </div>}
        </div>
    )
}

export default Category2
