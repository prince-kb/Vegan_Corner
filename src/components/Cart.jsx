import { useDispatch, useSelector } from "react-redux"
import Category2 from "./Category2"
import { useNavigate } from "react-router-dom";
import { updateTotalPrice } from "../redux/slices/orderSlice";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const catalogue = useSelector(state => state.catalogue.Catalogue)
  const order = useSelector(state => state.order.order);

  const findPrice = (item) => {
    const product = catalogue?.find((product) => product.id === item.id);
    return product.price * item.quantity;
  }

  const totalBalance = user?.cart?.reduce((acc, item) => acc + findPrice(item), 0);

  const placeOrder = () => {
    navigate('/checkout');
  }

  useEffect(() => {
    dispatch(updateTotalPrice(totalBalance));
  }, [totalBalance])

  return (
    <div>
      <h1 className=" text-3xl md:text-4xl lg:text-5xl font-extrabold font-janime tracking-widest mt-8 my-4 text-center ">MY CART</h1>
      <Category2 type='cart' />
      <hr />
      {user?.cart?.length > 0 && (
        <div >
          <div className="text-2xl font-bold text-center my-4">
            <h2>CART TOTAL: &#8377; {totalBalance}.00</h2>
            <h2>SHIPPING CHARGES : &#8377;{totalBalance > 399 ? "FREE" : "49"}</h2>
          </div>
          <hr />
          <div className="flex flex-col justify-center gap-2 mt-8 mb-4">
            <h3 className="text-2xl md:text-3xl  font-bold text-center my-4 font-cavo tracking-tighter">TOTAL AMOUNT TO PAY : &#8377; {totalBalance > 399 ? totalBalance : totalBalance + 49}.00</h3>
            <button className="bg-green-600 text-gray-100 font-bold font-cav tracking-tight text-2xl min-w-1/2 rounded-2xl px-6 py-4 max-w-[400px] mx-auto active:ring-4 hover:bg-green-700 transition-colors" onClick={placeOrder}>PROCEED TO CHECKOUT {"->"} </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
