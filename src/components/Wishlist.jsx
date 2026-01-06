import Category2 from "./Category2";

const Wishlist = () => {
  return (
    <div className="pageheight">
      <h1 className="my-4 mt-8 text-center font-janime text-3xl font-extrabold tracking-widest md:text-4xl lg:text-5xl">
        MY WISHLIST
      </h1>
      <Category2 type="wishlist" />
    </div>
  );
};

export default Wishlist;
