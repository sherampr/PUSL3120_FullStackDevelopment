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
import ReviewUpdate from "./pages/ReviewUpdate";
import BookingList from "./pages/BookingList";

// App component
import AddMenu from "./pages/menu";
import { Menu } from "@mui/icons-material";
import ViewMenu from "./pages/view_menu";

import TableReservationForm from "./pages/book";
import ReservationsList from "./pages/ReservationsList";
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

            <Route path="/staff/menu" element={<AddMenu />} />

            <Route path="/menu" element={<ViewMenu />} />

            <Route path="/reserve-table" element={<TableReservationForm />} />
            <Route path="/staff/viewbook" element={<ReservationsList />} />

            <Route path="/staff/updateroom/:id" element={<UpdateRoom />} />
            <Route path="/staff/currentrooms" element={<RoomList />} />
            <Route path="/staff" element={<RoomList />} />
            <Route path="/booking-confirmation" element={<BookingForm />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/UserDetails" element={<UserDetails />} />
            <Route path="/Userupdate" element={<Userupdate />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/ReviewUpdate/:id" element={<ReviewUpdate />} />
            <Route path="/staff/bookinglist" element={<BookingList />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

function NavbarSwitcher() {
  const location = useLocation();

  const isStaffPage = location.pathname.includes("/staff");

  // Return to the appropriate navbar
  return isStaffPage ? <StaffNavbar /> : <Navbar />;
}

export default App;
