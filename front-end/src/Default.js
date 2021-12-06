import './SignedInPage.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import MakePayment from './MakePayment';
import Logout from './Logout';


function Default() {  

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
}

export default Default;
//<Route path = "/"></Route>
//<Route path ="/Transactions">  <Transactions />  </Route>