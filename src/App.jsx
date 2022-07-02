import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";

import { userInputs } from "./formSource";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Seller from "./pages/seller/Seller";

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotel/:id" element={<Hotel/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element ={<Register inputs={userInputs} />} />
      <Route path="/seller" element={<Seller/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
