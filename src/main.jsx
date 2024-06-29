import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dynamic from './components/Dynamic.jsx'
import LandingPage from './components/LandingPage.jsx'
import Product from './components/Product.jsx'
import CheckOut from './components/CheckOut.jsx'
import Cart from './components/Cart.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element : <LandingPage />
      },
      {
        path: ":id",
        element: <Dynamic />
      },
      {
        path: "product/:id",
        element: <Product/>
      },
      {
        path : "checkout",
        element : <CheckOut />
      },
      {
        path: "cart",
        element : <Cart />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
