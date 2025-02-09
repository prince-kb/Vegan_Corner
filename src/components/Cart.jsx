import { useDispatch, useSelector } from "react-redux";
import Category2 from "./Category2";
import { useNavigate } from "react-router-dom";
import { updateTotalPrice } from "../redux/slices/orderSlice";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const catalogue = useSelector((state) => state.catalogue.Catalogue);

  const findPrice = (item) => {
    const product = catalogue?.find((product) => product.id === item.id);
    return product.price * item.quantity;
  };

  const totalBalance = user?.cart?.reduce(
    (acc, item) => acc + findPrice(item),
    0,
  );

  const placeOrder = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(updateTotalPrice(totalBalance));
  }, [totalBalance]);

  return (
    <div>
      <h1 className="my-4 mt-8 text-center font-janime text-3xl font-extrabold tracking-widest md:text-4xl lg:text-5xl">
        MY CART
      </h1>
      <Category2 type="cart" />
      <hr />
      {user?.cart?.length > 0 && (
        <div>
          <div className="my-4 text-center text-2xl font-bold">
            <h2>CART TOTAL: &#8377; {totalBalance}.00</h2>
            <h2>
              SHIPPING CHARGES : &#8377;{totalBalance > 399 ? "FREE" : "49"}
            </h2>
          </div>
          <hr />
          <div className="mb-4 mt-8 flex flex-col justify-center gap-2">
            <h3 className="my-4 text-center font-cavo text-2xl font-bold tracking-tighter md:text-3xl">
              TOTAL AMOUNT TO PAY : &#8377;{" "}
              {totalBalance > 399 ? totalBalance : totalBalance + 49}.00
            </h3>
            <button
              className="min-w-1/2 mx-auto max-w-[400px] rounded-2xl bg-green-600 px-2 py-1 font-cav text-xl font-bold tracking-tight text-gray-100 transition-colors hover:bg-green-700 active:ring-4 md:px-6 md:py-4 md:text-2xl"
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
