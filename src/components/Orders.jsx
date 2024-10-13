import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const Orders = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const catalogue = useSelector(state => state.catalogue.Catalogue)

    const showDate = (da) => {
        const d = new Date(da);
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    }


    return (
        !user ? <div className='flex-center flex-col gap-4'>
            <h1 className="font-bold font-bubble text-2xl md:text-3xl lg:text-4xl text-brown mb-2 ml-6 lg:ml-8 tracking-widest">Not LOGGED IN!</h1>
            <h2 className="font-bold font-bubble text-xl md:text-2xl lg:text-3xl text-orange mb-2 ml-6 lg:ml-8 tracking-wider">Please login to continue.</h2>
            <button onClick={() => navigate('/login')} className='text-2xl font-bold text-purple-500 hover:text-orange cursor-pointer' >LOGIN</button>
        </div> :
            <div>
                <h1 className="font-bubble text-2xl md:text-3xl lg:text-4xl text-brown ml-6 lg:ml-8 tracking-widest text-center my-4 mb-8">My Orders</h1>
                <div className={`flex-col items-center justify-center px-2 lg:px-6 z-[10]`}>
                    {user.orders.map((item, i) => (
                        <div key={i} className={`cursor-pointer mx-auto w-[80vw] md:w-[70vw] lg:[50vw] border rounded-2xl shadow-lg flex flex-col items-center justify-around mb-6 hover:bg-orange transition-all duration-200 hover:bg-opacity-25`}>
                            <div className="flex justify-around w-full">
                                {catalogue && catalogue?.filter((i => item.id === i.id)) ?
                                    catalogue?.filter((i => item.id === i.id))?.map((item, i) => (
                                        <div key={i} onClick={() => navigate(`/product/${item.id}`)} className="cursor-pointer mb-4 min-w-[60vw] md:min-w-[40] lg:min-w-[30vw] flex flex-col items-center justify-around">
                                            <h2 className="lg:px-2 text-center font-semibold text-md md:text-xl lg:text-2xl mt-4 lg:mt-6 mb-2">{item.name}</h2>
                                            <img src={item.image} alt={item.name} className="w-[60vw] md:w-[30vw] lg:w-[20vw] mb-2 rounded-md transition-all hover:-translate-y-2 hover:scale-105" />
                                        </div>
                                    )) : <div>
                                        <h2 className="lg:px-2 text-center font-semibold text-md md:text-xl lg:text-2xl mt-4 lg:mt-6 mb-2">Product not available</h2>
                                        <img src="https://cdn.dribbble.com/users/102361/screenshots/1076163/empty_box.jpg" alt="Empty" className="w-[60vw] md:w-[30vw] lg:w-[20vw] mb-2 rounded-md" />
                                    </div>
                                    }
                            </div>

                            <div className='flex justify-around w-full mb-4'>
                                <h2 className="lg:px-2 text-center font-semibold text-base md:text-lg lg:text-xl mt-4 lg:mt-6 mb-2">Status: <p className={`font-bold ${item.status.toLowerCase() === 'cancelled' && 'text-red-700'}`}>{item.status.toUpperCase()}</p></h2>
                                <h2 className="lg:px-2 text-center font-semibold text-base md:text-lg lg:text-xl mt-4 lg:mt-6 mb-2">Total: <p className="font-bold">{item.price}</p></h2>
                                <h2 className="lg:px-2 text-center font-semibold text-base md:text-lg lg:text-xl mt-4 lg:mt-6 mb-2">Quantity: <p className="font-bold">{item.quantity}</p></h2>
                                <h2 className="lg:px-2 text-center font-semibold text-base md:text-lg lg:text-xl mt-4 lg:mt-6 mb-2">Date: <p className="font-bold">{showDate(item.date)}</p></h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Orders
