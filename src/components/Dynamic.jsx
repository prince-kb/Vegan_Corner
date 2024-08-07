import { useParams } from "react-router-dom";

const Dynamic = () => {
    let {id} = useParams();
    console.log(id)
  return (
    <div className="h-[90vh] gap-[5vw] w-screen flex flex-col justify-center items-center">
      <h1 className="text-[4vw] font-bubble text-brown tracking-wide">Ohoo! The requested Page does not exist</h1>
      <h1 className="text-[3.5vw] font-bubble text-orange tracking-wide">Page at Vegan Corner '{id}' is not available.</h1>
      <h1 className="text-[2vw] font-bubble">Try clicking the top-left logo or routing to another Page.</h1>
      
      
    </div>
  )
}

export default Dynamic