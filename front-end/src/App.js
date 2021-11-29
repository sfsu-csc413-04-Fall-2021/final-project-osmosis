import './App.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';

function App() {

  

  return (
    <div >
      <nav>
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
          <Link to="/Logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
      </Switch>

    </div>
      

     
      
  
  );
}

export default App;
