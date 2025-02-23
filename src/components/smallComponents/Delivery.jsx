import React from "react";

const Delivery = ({ user }) => {
  return (
    <div className="paratext mx-2 mb-8 mt-0 flex flex-col gap-2 rounded-3xl border px-4 pt-3 pb-8">
      <div className="md:flex md:gap-2">
        <h3>{user?.name}, </h3>
        <h3>{user?.mobile}</h3>
      </div>
      <div className="md:flex md:gap-4">
        <h3>Address:</h3>
        <h3>
          {user?.address?.line1}, {user?.address?.line2},
        </h3>
      </div>
      <div className="md:flex md:gap-2">
        <h3>
          {user?.address?.city}, {user?.address?.state}
        </h3>
        <h3>{user?.address?.pincode}</h3>
      </div>
      <div className="smallbutton">CHANGE</div>
    </div>
  );
};

export default Delivery;
