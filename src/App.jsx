import { Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Login from "./Pages/Login"
import Cart from "./Pages/Cart"
import Dishes from "./Pages/Dishes"
import Payment from "./Pages/Payment"
import Register from "./Pages/Register"
import Restaurants from "./Pages/Restaurants"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Address from "./Pages/Address"



function App() {

  return (
    <>
     
      <Router>
         <Navbar />
        <Routes>
        
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/restaurants" element={<Restaurants/>} />
          <Route path="/dishes" element={<Dishes />} />  
          <Route path="/cart" element={<Cart/>} />
          <Route path="/address" element={<Address/>}/>
          <Route path="/payment" element={<Payment/>}/>
      </Routes>
      </Router>
      
      
    </>
  )
}

export default App
