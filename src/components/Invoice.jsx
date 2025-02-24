import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import loaderSpinner from "../assets/svgs/loader.svg";
import Delivery from "./smallComponents/Delivery";
import OrderDetails from "./smallComponents/OrderDetails";

const Invoice = () => {
  const orderId = useParams().id;
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const [order, setOrder] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) setOrder(user?.orders?.find((item) => item.orderId === orderId));
  }, [user, orderId]);

  return !order || !user ? (
    <div className="flex-center min-h-screen w-full">
      <img src={loaderSpinner} alt="Loading..." className="h-24 w-24" />
    </div>
  ) : (
    <div className="flex-center my-10 flex-col">
      <h1 className="headtext my-6">INVOICE</h1>
      <div className="flex-center h-[141vw] w-[90vw] shadow-[4px_4px_20px_4px_#1a202c]">
        <div className="h-[133vw] w-[82vw] border-2">
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

          <div className="flex">
            {order?.orderList.map((item) => {
              const product = catalogue.find(
                (product) => product.id === item.id,
              );
              console.log(product);
            })}
            <table>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </table>
          </div>

          <h3 className="paratext text-center font-semibold tracking-wide">
            A Non-ISO certified company.
          </h3>
          <h3 className="smalltext mt-2 text-center font-semibold tracking-wide">
            © 2024 All Rights Reserved.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
