import { useParams } from "react-router-dom";

const Dynamic = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <div className="flex h-[90vh] w-screen flex-col items-center justify-center gap-[5vw]">
      <h1 className="font-bubble text-[4vw] tracking-wide text-brown">
        Ohoo! The requested Page does not exist
      </h1>
      <h1 className="font-bubble text-[3.5vw] tracking-wide text-orange">
        Page at Vegan Corner '{id}' is not available.
      </h1>
      <h1 className="font-bubble text-[2vw]">
        Try clicking the top-left logo or routing to another Page.
      </h1>
    </div>
  );
};

export default Dynamic;
