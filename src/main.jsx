import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Dynamic from './components/Dynamic'
import LandingPage from './components/LandingPage'
import Product from './components/Product'
import CheckOut from './components/CheckOut'
import Cart from './components/Cart'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import { store } from './redux/store/store.js'
import { Provider } from 'react-redux'
import Wishlist from './components/Wishlist.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />
      },
      {
        path: ":id",
        element: <Dynamic />
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "checkout",
        element: <CheckOut />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "wishlist",
        element: <Wishlist />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
)
