import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import bolt1 from "../assets/svgs/bolt1.svg";

const Category = (props) => {
  const navigate = useNavigate();
  const catalogue = useSelector((state) => state.catalogue.Catalogue);
  const user = useSelector((state) => state.user.user);
  const [all, setAll] = useState(
    catalogue &&
      catalogue.length > 0 &&
      catalogue.filter((item) => item.type === props.type),
  );

  useEffect(() => {
    if (props.type === "recent") {
      if (user && catalogue?.length > 0) {
        let p = [];
        user.frequentItems.map((item) => {
          catalogue.reduce((x, y) => {
            if (x.id === item.id) p.push(x);
            return y;
          });
        });
        setAll(p.reverse());
      }
    } else if (props.type === "type" && props.product) {
      let prods = new Set();
      for (let t in props.product.tag)
        for (let p in catalogue)
          for (let z in catalogue[p].tag)
            if (
              catalogue[p].tag[z] === props.product.tag[t] &&
              catalogue[p].id !== props.product.id
            )
              prods.add(catalogue[p]);
      setAll(Array.from(prods).slice(0, 9));
    } else
      setAll(
        catalogue?.length > 0 &&
          catalogue.filter((item) => item.type === props.type),
      );
  }, [props]);

  return (
    all &&
    all.length > 0 && (
      <div className={`m-4 mt-12 lg:m-8`}>
        <h1 className="mb-2 ml-6 font-bubble text-xl font-bold text-brown md:text-2xl lg:ml-8 lg:text-3xl">
          {props.type === "recent"
            ? "RECENTLY VIEWED"
            : props.type === "type"
              ? "SIMILAR PRODUCTS"
              : props.type.toUpperCase()}
        </h1>
        <div className={`flex gap-4 overflow-auto pl-2 lg:pl-6`}>
          {all.map((item, i) => (
            <div
              onClick={() =>
                props.type === "type"
                  ? scrollTo(0, 0)
                  : navigate(`/product/${item.id}`)
              }
              key={i}
              className="hover:neu2 relative mx-auto mb-4 flex min-w-[160px] cursor-pointer flex-col items-center justify-around rounded-2xl border shadow-lg transition-all md:min-w-[200px] lg:min-w-[240px]"
            >
              {/* Priority Part */}
              <div className="absolute right-2 top-2 flex w-full justify-end">
                {item.offer ? (
                  <div className="z-[-1] flex animate-bounce items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-[10px] text-white lg:text-sm">
                    <img src={bolt1} alt="S" className="h-4 w-4" />
                    SALE{" "}
                  </div>
                ) : (
                  <div
                    className={`${item.priority >= 3 ? "bg-violet-500" : item.priority === 2 ? "bg-orange" : item.priority === 1 ? "bg-blue-500" : "bg-red-500"} rounded-full p-1 text-white md:p-2`}
                  ></div>
                )}
              </div>

              <h2 className="text-md mb-2 mt-4 text-center font-semibold md:text-xl lg:mt-6 lg:px-2 lg:text-2xl">
                {item.name}
              </h2>
              <img
                src={item.image}
                alt={item.name}
                className="mb-2 h-[120px] max-w-[100%] rounded-md lg:h-[180px]"
              />
              <hr />
              <div className="mt-2 flex w-full justify-around">
                <div className="text-start">
                  <h3 className="text-md font-bubble text-green-500 md:text-xl">
                    &#8377; {item.price}{" "}
                  </h3>
                  <p className="text-md font-brown text-center font-walto line-through md:text-lg">
                    {item.price2}
                  </p>
                </div>
                <div className="flex-col justify-center text-end">
                  <h2 className="mr-1 font-medium">{item.quantity}</h2>
                  <h2 className="mb-2 text-center text-base font-normal md:text-xl">
                    {item.rating}
                    <span className="text-sm md:text-base">
                      ⭐<span />
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Category;
