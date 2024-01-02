import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Rooms from './pages/Rooms';
import Footer from './components/Footer';
import RoomDetails from './pages/RoomDetails';
import NewRoom from './staff/pages/NewRoom';
import UpdateRoom from './staff/pages/UpdateRoom';
// import { BookingProvider } from './contexts/BookingContext';
import BookingConfirmation  from './pages/BookingConfirmation';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
 
     <Navbar/>
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

       <Route path="/newroom" element={<NewRoom/>} />

       <Route path="/updateroom" element={<UpdateRoom/>} />

        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </div>
        
<Footer/>

     </BrowserRouter>
    </div>
  );
}

export default App;
