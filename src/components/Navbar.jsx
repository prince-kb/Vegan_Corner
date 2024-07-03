import sun from '../assets/svgs/sun.svg'
import logo from '../assets/svgs/logo.svg'
const Navbar = () => {
    return (
        <div className="">
            <div className="w-[60vw] h-[128px] bg-orange rounded-br-full flex  items-center">
                <img src={logo} alt="Vegan" className='h-24 w-24' />
                <h1 className="font-bold text-3xl">Vegans Corner</h1>
            </div>
            <div className='flex justify-end overflow-hidden -translate-y-1/2'>
                <div className='group flex transition-all justify-end items-start translate-x-1/2 -translate-y-1/2'>
                    <div className=" w-[256px] h-[256px] bg-orange relative rounded-full md:group-hover:rotate-[-90deg] rotate-0 transition-all duration-300 flex justify-center items-center">
                        <img src={sun} alt="market" className='h-48 w-48'/>
                        <div className="rounded-full absolute w-[48px] h-[48px] bg-brown   left-[72px]   top-[-48px]"></div>
                        <div className="rounded-full absolute w-[48px] h-[48px] bg-brown   left-[-30px]  top-[12px]"></div>
                        <div className="rounded-full absolute w-[48px] h-[48px] bg-brown   left-[12px]   top-[-30px]"></div>
                        <div className="rounded-full absolute w-[48px] h-[48px] bg-brown   left-[-48px]  top-[72px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar