import './SignedInPage.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import Logout from './Logout';
import Cookies from 'js-cookie';
import Login from './Login';
import Transactions from './Transactions';
import MakePayment from './MakePayment';
import SignUp from './SignUp';
import SignedInPage from './SignedInPage';
function Default() {  

  if (Cookies.get() !== null){
    return (

      <div id="main" >
        
        <Link to= "/" class = "headers">
        <div id="home" class="headers">Home</div>
        </Link>
        <Link to= "/SignUp" class = "headers">
        <div signup="signup" class="headers">Sign Up</div>
          </Link>
        <Link to="/Login" class = "headers">
        <div id="login" class="headers">Log In</div>
        </Link>
      </div>
    
    );
  }else {
    return(
      <div id="main">
        <Link to="/Transactions" class="headers">
        <div id="transactions" class="headers">Transactions</div>
        </Link>
        <Link to="/MakePayment" class="headers">
          <div id="makepayment" class="headers">Make a Payment</div>
        </Link>
        <Link to="/Logout" class="headers">
          <div id="logout" class="headers">Log Out</div>
        </Link>
  
      </div>
    
    );
  }
}

export default Default;
//<Route path = "/"></Route>
//<Route path ="/Transactions">  <Transactions />  </Route>
<Switch>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/"></Route>
        <Route path = "/SignedInPage"> <SignedInPage /> </Route>
        <Route path = "/Transactions"> <Transactions /> </Route>
        
      </Switch>