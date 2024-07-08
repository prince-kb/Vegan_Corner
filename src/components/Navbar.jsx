import sun from '../assets/svgs/sun.svg'
import logo from '../assets/svgs/logo.svg'
import shop from '../assets/svgs/navbar/shop.svg'
import quick from '../assets/svgs/navbar/quick.svg'
import baked from '../assets/svgs/navbar/baked.svg'
import love from '../assets/svgs/navbar/love.svg'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const rotate=()=> ref.current.classList.toggle('rotate-[-90deg]')
    const goToHomePage = () => navigate('/'); // Function to navigate to homepage

    
    return (
        <div className="flex overflow-x-hidden">
            <div className="w-[60vw] h-[92px] bg-orange rounded-br-full flex  items-center">
                <img src={logo} alt="Vegan" className='h-16' onClick={goToHomePage}   />
                <h1 className="font-bold text-3xl">Vegans Corner</h1>
            </div>
            <div className='flex overflow-hidden absolute right-0'>
                <div className='group flex transition-all justify-end items-start translate-x-1/2 -translate-y-1/2' onClick={rotate}>
                    <div className=" w-[256px] h-[256px] bg-yellow-200 relative rounded-full md:group-hover:rotate-[-90deg] transition-all duration-300 flex justify-center items-center " ref={ref}>
                        <img src={sun} alt="market" className='h-48 w-48'/>
                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[72px]   top-[-48px] hover:scale-150 transition-all"><img src={shop}  alt="❤️" className='h-8 w-8 rotate-90 ' /></div>
                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-30px]  top-[12px]  hover:scale-150 transition-all"><img src={quick} alt="❤️" className='h-8 w-8 rotate-90 ' /></div>
                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[12px]   top-[-30px] hover:scale-150 transition-all"><img src={baked} alt="❤️" className='h-8 w-8 rotate-90 ' /></div>
                        <div className="flex-center rounded-full absolute w-[48px] h-[48px] bg-brown left-[-48px]  top-[72px]  hover:scale-150 transition-all"><img src={love}  alt="❤️" className='h-8 w-8 rotate-90 ' /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar