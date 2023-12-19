

import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import bookingForm from './pages/Booking_form';


function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
        <Route path="/" exact component={bookingForm}/>
        </Switch>
      </Router>

  

      
    </div>
  );
}

export default App;
