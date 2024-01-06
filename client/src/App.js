import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Rooms from './pages/Rooms';
import Footer from './components/Footer';
import RoomDetails from './pages/RoomDetails';
import NewRoom from './staff/pages/NewRoom';
import RoomList from './staff/pages/RoomList';
import UpdateRoom from './staff/pages/UpdateRoom';
// import { BookingProvider } from './contexts/BookingContext';
import BookingConfirmation  from './pages/BookingConfirmation';
import StaffNavbar from './staff/components/StaffNavbar';
import AddMenu from './pages/menu';
import { Menu } from '@mui/icons-material';
import ViewMenu from './pages/view_menu';
import TableReservationForm from './pages/book';
import ReservationsList from './pages/ReservationsList';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
 
     <NavbarSwitcher/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
        path='/rooms'
        element={<Rooms />}
      />
       <Route path="/room-details/:id" element={<RoomDetails/>} />

       <Route path="/staff/newroom" element={<NewRoom/>} />
       <Route path="/staff/menu" element={<AddMenu/>} />
       <Route path="/reservation" element={<TableReservationForm/>} />
       <Route path="/staff/viewbook" element={<ReservationsList/>} />


       <Route path="/staff/updateroom/:id" element={<UpdateRoom/>} />
       <Route path="/staff" element={<RoomList/>} />
       <Route path="/menu" element={<ViewMenu/>} />

        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </div>
        
<Footer/>

     </BrowserRouter>
    </div>
  );
}

function NavbarSwitcher() {
  const location = useLocation();

  // Check if the current path is one of the staff paths
  const isStaffPage = location.pathname.includes('/staff'); // Modify this as per your route structure

  // Return the appropriate navbar
  return isStaffPage ? <StaffNavbar /> : <Navbar />;
}

export default App;
