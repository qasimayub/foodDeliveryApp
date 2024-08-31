import React, {useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Cart from './pages/Cart/Cart'
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Placeorder from './pages/Placeorder/Placeorder'

const App = () => {
  const [login, setLogin] = useState(false)
  if(login) {
    document.body.style.overflowY = 'hidden';
  }
  else {
    document.body.style.overflowY = 'scroll'
  }
  return (
    <>
    {login?<LoginPopup login={login} setLogin={setLogin} />:<></> }
      <div className="App">
        <Navbar setLogin={setLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/cart' element={<Cart setLogin={setLogin}/>}></Route>
          <Route path='/placeorder' element={<Placeorder/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
