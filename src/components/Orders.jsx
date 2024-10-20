import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const Orders = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const catalogue = useSelector(state => state.catalogue.Catalogue)

    const [orders, setOrders] = useState([]);

    const showDate = (da) => {
        const d = new Date(da);
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    }
    const showTime = (da) => {
        const d = new Date(da);
        return `${d.getHours()}:${d.getMinutes()}`
    }

    const myOrder=()=>{
        navigate('/myorder')
    }

    useEffect(() => {
        if (user && user.orders.length) {
            let reversedOrders = [];
            reversedOrders.push(...user.orders);
            reversedOrders.reverse();
            setOrders(reversedOrders);
            console.log(reversedOrders)
        }
    }, [user])




    return (
        !user ? <div className='flex-center flex-col gap-4'>
            <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Not LOGGED IN!</h1>
            <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange font-boldg:ml-8 tracking-wider">Please login to continue.</h2>
            <button onClick={() => navigate('/login')} className='text-2xl font-bold text-purple-500 hover:text-orange font-boldter' >LOGIN</button>
        </div> :
            <div >
                {orders.length && orders.map((order) => {
                    return (
                        <div onClick={myOrder} key={order.orderId} className='cursor-pointer hover:border-orange flex-center flex-col mt-10 mb-4 pb-4 border-2 mx-2 rounded-3xl '>
                            {/* <h1 className='text-center text-xl font-semibold'>Order #{order.orderId}</h1> */}
                            <div className='md:ml-3 mb-4 w-full flex flex-col justify-center md:flex-row md:justify-around items-center'>
                                <div>
                                    <h2 className='text-xl text-orange font-bold mt-4'>
                                        Total Price: <span className='text-green-600 font-bubble'>&#8377; {order.totalPrice}</span>
                                        {order.deliveryCharges >= 0 && <span className='text-base font-medium ml-3'>
                                            <span className='text-brown'>(Delivery :
                                                <span className='text-green-600 font-bubble'>&#8377; {order.deliveryCharges} </span>)
                                            </span>
                                        </span>}
                                    </h2>
                                    {/* {order.deliveryCharges >= 0 && <h2 className='text-xl font-medium'>Delivery Charges :<span className='text-green-600 font-bubble'>&#8377; {order.deliveryCharges} </span></h2>} */}
                                    <h2 className='text-xl text-orange font-bold'>Date: <span className='text-brown font-bold'>{showDate(order.date)} at {showTime(order.date)}</span></h2>
                                </div>
                                <div>
                                    <h2 className='text-xl text-orange font-bold'>Payment mode: <span className='font-bold text-brown'>{order.method === 'COD' ? 'Cash on Delivery' : order.method === 'UPI' ? 'UPI' : order.method + ' CARD'}</span></h2>
                                    <h2 className='text-xl text-orange font-bold '>Order Status : <span className='font-bold text-brown'>{order.status.toUpperCase()}</span></h2>
                                </div>
                            </div>

                            <div className='flex mx-2 gap-2 overflow-auto w-full px-2'>
                                {order?.orderList.map((item) => {
                                    const product = catalogue.find((product) => product.id === item.id);
                                    return (
                                        <div onClick={() => navigate(`/product/${product.id}`)} key={product.id} className='mb-3 mx-auto cursor-pointer relative px-1 w-[240px] min-w-[160px] md:min-w-[200px] lg:min-w-[240px] hover:neu2 border rounded-2xl transition-all shadow-lg flex flex-col items-center justify-around'>
                                            <div className=' py-2 md:py-4 rounded-xl  '>
                                                <h2 className=' font-bold my-2 text-center mb-4 text-xl md:text-2xl text-brown'>{product?.name}</h2>
                                                <div className='flex-col flex-center md:flex-row'>
                                                    <img src={product?.image} alt={product?.name} className='max-w-[100%] h-[120px] lg:h-[180px] mb-2 rounded-md' />
                                                </div>
                                            </div>
                                            <div className='text-2xl text-brown font-bold mb-2'>x {item.quantity}</div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>)
                })
                }
            </div>
    )
}

export default Orders
