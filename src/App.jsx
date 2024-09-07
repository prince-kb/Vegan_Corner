import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { updateCatalogue } from "./redux/slices/catalogueSlice";
import { useEffect } from "react";
import { setUser } from "./redux/slices/userSlice";
import Notification from "./components/Notification";

function App() {

  const dispatch = useDispatch();
  
  const autoLogin = async () => {
    const API = import.meta.env.VITE_REACT_APP_API
    const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET

    const token = localStorage.getItem('authy');
    if (token) {
      const response = await fetch(`${API}/api/user/getuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'secret': SERVER_SECRET,
          'authToken': token
        }
      })
      const data = await response.json();
      if (data.success === false) {
        dispatch(setUser({}));
        return;
      }
      dispatch(setUser(data));
    }
  }

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const API = import.meta.env.VITE_REACT_APP_API
        const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET
        const response = await fetch(`${API}/api/getcatalogue`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'secret': SERVER_SECRET
          }
        })
        const data = await response.json();
        if (data.success === false) {
          console.log("Unable to fetch data")
          return;
        }
        dispatch(updateCatalogue(data))
      } catch (err) {
        dispatch(updateCatalogue([]))
        console.log(err, " Unable to fetch data")
      }
    }
    fetchCatalogue();
    autoLogin();
  }, [window.onload])

  useEffect(() => {
    window.addEventListener('storage', autoLogin);
    return () => window.removeEventListener('storage', autoLogin);
  }, [])



  return (
    <div className="relative">
      <Navbar />
      <Notification />
      <Outlet />
    </div>
  )
}

export default App
