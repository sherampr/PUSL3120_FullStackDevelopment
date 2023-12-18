import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Rooms from './pages/Rooms';

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
          </Routes>
        </div>

     </BrowserRouter>
    </div>
  );
}

export default App;
