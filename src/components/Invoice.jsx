import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";

import loaderSpinner from "../assets/svgs/loader.svg";
import Delivery from "./smallComponents/Delivery";
import OrderDetails from "./smallComponents/OrderDetails";

const Invoice = () => {
  const orderId = useParams().id;
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const [order, setOrder] = useState(null);
  const user = useSelector((state) => state.user.user);
  const ref = useRef(null);

  useEffect(() => {
    if (user) setOrder(user?.orders?.find((item) => item.orderId === orderId));
  }, [user, orderId]);

  return !order || !user ? (
    <div className="flex-center min-h-screen w-full">
      <img src={loaderSpinner} alt="Loading..." className="h-24 w-24" />
    </div>
  ) : (
    <div className="my-10 flex flex-col items-center">
      <h1 className="headtext mt-6">INVOICE</h1>
      <h1 className="smalltext mb-6 mx-4 text-center">
        Use desktop for downloading Invoice,if it is not properly visible in mobile devices.
      </h1>
      <button
        onClick={() =>
          generatePDF(ref, { filename: `${order.orderId}.vegancorner.pdf` })
        }
        className="mx-auto mb-8 rounded-xl bg-green-500 px-2 py-1 text-sm font-semibold text-white hover:bg-green-600 md:rounded-2xl md:px-4 md:py-1 md:text-base"
      >
        Download Invoice
      </button>

      <div ref={ref} className="flex-center h-[1139px] w-[827px] scale-[40%] -translate-y-1/4 sm:scale-50 md:scale-75 md:-translate-y-[150px] lg:scale-100 lg:translate-y-0 shadow-[4px_4px_20px_4px_#1a202c] ">
        <div className="h-[90%] w-[90%] border-2 p-8">
          <h3 className="sub-heading font-semibold tracking-wide">
            VEGAN'S CORNER
          </h3>

          <div className="ml-2">
            <h3 className="paratext my-4 text-center">Order : #{orderId}</h3>
            <h3 className="paratext">Delivery to : </h3>
            <Delivery user={user} invoice={true} />

            <h3 className="paratext">Order details : </h3>
            <OrderDetails order={order} />
          </div>

          <div className="flex-center mx-auto my-6">
            <table className="w-[98%] md:w-[90%]">
              <thead>
                <tr className="border">
                  <th className="border px-2 py-1">Product ID</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Price per Unit &#8377;</th>
                  <th className="border px-2 py-1">Net Price &#8377;</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderList.map((item) => {
                  const product = catalogue.find(
                    (product) => product.id === item.id,
                  );
                  return (
                    <tr className="border" key={product.id}>
                      <td className="border px-2 py-1 text-center">
                        #{product.id}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {product.name}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.quantity}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.price}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border">
                  <td colSpan={4} className="border px-2 text-center">
                    Delivery Charges
                  </td>
                  <td className="border px-2 text-center font-semibold">
                    &#8377; {order.deliveryCharges}
                  </td>
                </tr>
                <tr className="border">
                  <td
                    colSpan={4}
                    className="border px-2 text-center text-lg font-bold"
                  >
                    Total Price
                  </td>
                  <td className="border px-2 text-center text-lg font-semibold">
                    &#8377; {order.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-2">
            <h3 className="text-lg font-semibold">Payment details</h3>
            <h3>
              Payment Mode :{" "}
              <span className="font-semibold">{order.method}</span>
            </h3>
            <h3>
              Transaction ID :{" "}
              <span className="font-semibold">#{order.transactionId}</span>
            </h3>
          </div>

          <div className="absolute bottom-[6%] left-1/2 w-[90%] -translate-x-1/2">
            <h3 className="smalltext mx-2 text-center tracking-tight text-gray-600">
              This invoice is only made for non-payment purchases through
              Vegan's Corner website and it does not involve any direct or
              indirect transfer of real money .
            </h3>
            <h3 className="smalltext mt-2 text-center font-semibold tracking-wide">
              © 2024 All Rights Reserved.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
