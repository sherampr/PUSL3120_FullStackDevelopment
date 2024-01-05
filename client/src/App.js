import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Rooms from "./pages/Rooms";
import Footer from "./components/Footer";
import RoomDetails from "./pages/RoomDetails";
import NewRoom from "./staff/pages/NewRoom";
import RoomList from "./staff/pages/RoomList";
import UpdateRoom from "./staff/pages/UpdateRoom";
// import { BookingProvider } from './contexts/BookingContext';
import BookingForm from "./pages/BookingForm";
import StaffNavbar from "./staff/components/StaffNavbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDetails from "./pages/UserDetails";
import Userupdate from "./pages/UserUpdate";
import Users from "./pages/Users";

// App component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarSwitcher />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room-details/:id" element={<RoomDetails />} />

            <Route path="/staff/newroom" element={<NewRoom />} />

            <Route path="/staff/updateroom/:id" element={<UpdateRoom />} />
            <Route path="/staff" element={<RoomList />} />

            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />

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

function NavbarSwitcher() {
  const location = useLocation();

  // Check if the current path is one of the staff paths
  const isStaffPage = location.pathname.includes("/staff"); // Modify this as per your route structure

  // Return the appropriate navbar
  return isStaffPage ? <StaffNavbar /> : <Navbar />;
}

export default App;
