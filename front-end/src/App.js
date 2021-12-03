import './App.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';


function App() {  

  return (
    <div >
      <nav>
        <div id="main">
          <div id="home" className="headers">
            <Link to="/">Home</Link>
          </div>
          
          <div id="login" className="headers">
            <Link to="/Login">Login</Link>
          </div>      
          <div id="logout" className="headers">
            <Link to="/Logout">Logout</Link>
          </div>          
          <div id="tran" className="headers">
            <Link to="/Transactions">Transactions</Link>
          </div>
          <div id="payment" className="headers">
            <Link to= "/MakePayment">Make a Payment</Link>
          </div>
        </div>
        
      </nav>

      <Switch>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
       
      </Switch>

    </div>
      

     
      
  
  );
}

export default App;
