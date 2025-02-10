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
    <div></div>
  );
};

export default Invoice;
