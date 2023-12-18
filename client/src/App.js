
import Roomlist from './components/Roomlist';
import edit from './components/Room_edit';
import {BrowserRouter as Router,Route}from 'react-router-dom'
import Addroom from './components/Addroom';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Addroom}/>
          <Route path="/editpage" component={edit}/>
          <Route path="/list" component={Roomlist}/>


        </Switch>

      </Router>

  

      
    </div>
  );
}

export default App;
