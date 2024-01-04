import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Rooms from "./pages/Rooms";
import Footer from "./components/Footer";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDetails from "./pages/UserDetails";
import Userupdate from "./pages/UserUpdate";
import Users from "./pages/Users";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room-details/:id" element={<RoomDetails />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/UserDetails" element={<UserDetails />} />
            <Route path="/Userupdate" element={<Userupdate />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
