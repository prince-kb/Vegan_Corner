import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import Dynamic from "./components/Dynamic";
import LandingPage from "./components/LandingPage";
import Product from "./components/Product";
import CheckOut from "./components/CheckOut";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import BuyNow from "./components/BuyNow.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Orders from "./components/Orders.jsx";
import MyOrder from "./components/MyOrder.jsx";
import Invoice from "./components/Invoice.jsx";
import VideoBackground from "./components/VideoBackground.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: ":id",
        element: <Dynamic />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "buynow",
        element: <BuyNow />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "order/:id/invoice",
        element: <Invoice />,
      },
      {
        path: "order/:id",
        element: <MyOrder />,
      },
      {
        path: "video",
        element: <VideoBackground />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
