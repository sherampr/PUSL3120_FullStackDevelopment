

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './component/NavigationBar';  // Adjust the path based on your actual file structure
import BookingForm from './pages/Booking_form';
import BookingList from './pages/Booking_list';

// App component
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <br/>
        <Switch>
          <Route path="/" exact component={BookingForm} />
          <Route path="/list" component={BookingList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
