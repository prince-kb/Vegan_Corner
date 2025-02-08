import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { updateCatalogue } from "./redux/slices/catalogueSlice";
import { useEffect } from "react";
import { updateUser } from "./redux/slices/userSlice";
import Notification from "./components/Notification";
import { config } from "./lib/config";

function App() {

  const dispatch = useDispatch();

  const autoLogin = async () => {
    const API = config.server
    const SERVER_SECRET = config.serverSecret
    const token = localStorage.getItem('authy');

    if (token) {
      await fetch(`${API}/api/user/updateorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'secret': SERVER_SECRET,
          'authToken': token
        }
      })
      dispatch(updateUser());
    }
  }

  useEffect(() => {

    const fetchCatalogue = async () => {
      try {
        const API = config.server
        const SERVER_SECRET = config.serverSecret
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
