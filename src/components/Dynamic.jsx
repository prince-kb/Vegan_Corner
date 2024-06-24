import { useParams } from "react-router-dom";

const Dynamic = () => {
    let {id} = useParams();
    console.log(id)
  return (
    <div>
        <h1 className="text-black">{id}</h1>
    </div>
  )
}

export default Dynamic