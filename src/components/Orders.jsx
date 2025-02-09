import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loaderSpinner from "../assets/svgs/loader.svg";

const Orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user?.orders?.length) {
      let reversedOrders = [];
      reversedOrders.push(...user.orders);
      reversedOrders.reverse();
      setOrders(reversedOrders);
    }
  }, [user]);

  const showDate = (da) => {
    if (!da) return "Not available";
    return new Date(new Date(da).getTime()).toString().slice(0, 16);
  };

  const showTime = (da) => {
    const d = new Date(da);
    const x = d.toLocaleString();
    if (!x) return "Not available";
    return x.slice(x.length - 11, x.length - 6) + " " + x.slice(x.length - 2);
  };

  const gotoProduct = (e, id) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return !user ? (
    <div className="flex-center flex-col gap-4">
      <h1 className="mb-2 ml-6 font-bubble text-2xl font-bold tracking-widest text-brown md:text-3xl lg:ml-8 lg:text-4xl">
        Not LOGGED IN!
      </h1>
      <h2 className="font-boldg:ml-8 font-bubble text-xl font-bold tracking-wider text-orange md:text-2xl lg:text-3xl">
        Please login to continue.
      </h2>
      <button
        onClick={() => navigate("/login")}
        className="font-boldter text-2xl font-bold text-purple-500 hover:text-orange"
      >
        LOGIN
      </button>
    </div>
  ) : (
    <div>
      <h1 className="mb-4 mt-6 text-center font-bubble text-2xl text-brown md:text-3xl lg:text-4xl">
        My Orders
      </h1>
      {orders?.length ? (
        orders.map((order) => {
          return (
            <div
              onClick={() => navigate(`/order/${order.orderId}`)}
              key={order.orderId}
              className="flex-center mx-8 mb-4 mt-10 cursor-pointer flex-col rounded-3xl border-2 border-orange pb-4 hover:border-brown hover:shadow-xl md:mx-12 md:mt-16 lg:mx-20 xl:mx-32"
            >
              <div className="mb-6 flex w-full flex-col items-center justify-center md:ml-3 md:flex-row md:justify-around">
                <div>
                  <h2 className="paratext mt-4 text-center text-orange">
                    Total Price:{" "}
                    <span className="font-bold text-green-600">
                      &#8377; {order.totalPrice}
                    </span>
                    {order.deliveryCharges >= 0 && (
                      <span className="ml-3 text-base font-medium">
                        <span className="text-brown">
                          (Delivery :
                          <span className="font-bold text-green-600">
                            &#8377; {order.deliveryCharges}{" "}
                          </span>
                          )
                        </span>
                      </span>
                    )}
                  </h2>
                  {/* {order.deliveryCharges >= 0 && <h2 className='text-xl font-medium'>Delivery Charges :<span className='text-green-600 font-bubble'>&#8377; {order.deliveryCharges} </span></h2>} */}
                  <h2 className="paratext text-orange">
                    Ordered at:{" "}
                    <span className="text-brown">
                      {showDate(order.date)} at {showTime(order.date)}
                    </span>
                  </h2>
                </div>
                <div className="md:mt-3">
                  <h2 className="paratext text-orange">
                    Payment mode:{" "}
                    <span className="text-brown">
                      {order.method === "COD"
                        ? "Cash on Delivery"
                        : order.method === "UPI"
                          ? "UPI"
                          : order.method + " CARD"}
                    </span>
                  </h2>
                  <h2 className="paratext text-orange">
                    Order Status :{" "}
                    <span className="text-brown">
                      {order.status.toUpperCase()}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="mx-2 flex w-full gap-2 overflow-auto px-6">
                {order?.orderList.map((item) => {
                  const product = catalogue.find(
                    (product) => product.id === item.id,
                  );
                  return (
                    <div
                      onClick={(e) => gotoProduct(e, product.id)}
                      key={product.id}
                      className="hover:neu2 relative mx-auto mb-3 flex w-[240px] min-w-[160px] cursor-pointer flex-col items-center justify-around rounded-2xl border-2 px-1 shadow-lg transition-all md:min-w-[200px] lg:min-w-[240px]"
                    >
                      <div className="rounded-xl py-2 md:py-4">
                        <h2 className="my-2 mb-4 text-center text-lg font-semibold text-brown md:text-2xl">
                          {product?.name}
                        </h2>
                        <div className="flex-center flex-col md:flex-row">
                          <img
                            src={product?.image}
                            alt={product?.name}
                            className="mb-2 h-[120px] max-w-[100%] rounded-md lg:h-[180px]"
                          />
                        </div>
                      </div>
                      <div className="mb-2 text-xl font-bold text-brown">
                        x{item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex-center">
          <img src={loaderSpinner} alt="" className="h-20 w-20" />
        </div>
      )}
    </div>
  );
};

export default Orders;
