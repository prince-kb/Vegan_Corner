import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import loaderSpinner from "../assets/svgs/loader.svg";

const Invoice = () => {
  const orderId = useParams().id;
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
    <div className="my-10 flex-center flex-col">
      <h1 className="headtext my-6">INVOICE</h1>
        <div className="h-[141vw] w-[90vw] shadow-[4px_4px_20px_4px_#1a202c] flex-center">
          <div className="h-[133vw] w-[82vw] border-2">
            
          </div>
      </div>
    </div>
  );
};

export default Invoice;
