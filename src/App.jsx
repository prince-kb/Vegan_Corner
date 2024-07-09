import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
  });
  
  // Remove the class when the scrolling stops
  let timer = null;
  window.addEventListener('scroll', function() {
    if(timer !== null) {
      clearTimeout(timer);        
      document.body.classList.add('scrolling');
    }
    timer = setTimeout(function() {
        document.body.classList.remove('scrolling');
    }, 150); // Adjust time as needed
  }, false);

  return (
    <div className="">
    <Navbar />
    <Outlet />
    </div>
  )
}

export default App
