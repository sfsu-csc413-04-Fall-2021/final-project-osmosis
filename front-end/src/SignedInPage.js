import './SignedInPage.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import MakePayment from './MakePayment';
import Logout from './Logout';
import Transactions from './Transactions';
import Login from './Login';
import SignUp from './SignUp';
import App from './App';


function SignedInPage() {  

  return (
    <div >

      <div>
        <div id = "title">
          <label>Osmosis Payments</label>
        </div>
      </div>

      <nav>

        <div id="main">
          <Link to= "/Transactions" class = "headers">
          <div id="transactions" class="headers">Transactions</div>
          </Link>
          <Link to= "/MakePayment" class = "headers">
          <div id="makepayment" class="headers">Make a Payment</div>
          </Link>
          <Link to="/Logout" class = "headers">
          <div id="logout" class="headers">Log Out</div>
          </Link> 
          
        </div>
        
      </nav>

      <div id ="background"></div>

      
      
      <Switch>
        
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/MakePayment"> <MakePayment /> </Route>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/"></Route>
        <Route path = "/Transactions"> <Transactions /> </Route>
        
      </Switch>

    </div>   
  
  );
}

export default SignedInPage;
//<Route path = "/"></Route>
//<Route path ="/Transactions">  <Transactions />  </Route>