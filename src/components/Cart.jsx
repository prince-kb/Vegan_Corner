import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTotalPrice } from "../redux/slices/orderSlice";
import { useEffect } from "react";
import Category2 from "./Category2";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const catalogue = useSelector((state) => state.catalogue.Catalogue);

  const findPrice = (item) => {
    const product = catalogue?.find((product) => product.id === item.id);
    return product.price * item.quantity;
  };

  const totalBalance = user?.cart?.reduce((acc, item) => acc + findPrice(item),0);

  const placeOrder = () => navigate("/checkout");

  useEffect(() => {
    dispatch(updateTotalPrice(totalBalance));
  }, [totalBalance]);

  return !catalogue || !user ? (
    <div className="flex-center min-h-screen">
      <img src={loaderSpinner} alt="Loading..." className="h-24 w-24" />
    </div>
  ) : (
    <div>
      <h1 className="my-4 mt-8 text-center font-janime text-3xl font-extrabold tracking-widest md:text-4xl lg:text-5xl">
        MY CART
      </h1>
      <Category2 type="cart" />
      <hr />
      {user?.cart?.length > 0 && (
        <div>
          <div className="paratext text-center my-4 text-gray-800">
            <h2>CART TOTAL: &#8377; {totalBalance}.00</h2>
            <h2>
              SHIPPING CHARGES : &#8377;{totalBalance > 399 ? "FREE" : "49"}
            </h2>
          </div>
          <hr />
          <div className="my-4 flex flex-col justify-center gap-2">
            <h3 className="text-lg font-semibold my-4 text-center">
              TOTAL AMOUNT TO PAY : &#8377;{" "}
              {totalBalance > 399 ? totalBalance : totalBalance + 49}.00
            </h3>
            <button
              className="mx-auto w-[70%] cursor-pointer gap-4 rounded-2xl bg-orange px-6 py-2 text-center text-xl font-bold tracking-tight text-brown ring-brown transition-all hover:translate-x-2 active:ring-2 md:w-[50%] md:text-3xl lg:w-[40%] xl:w-[30%]"
              onClick={placeOrder}
            >
              PROCEED TO CHECKOUT {"->"}{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
