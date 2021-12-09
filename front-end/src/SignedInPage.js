import './SignedInPage.css';
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

function SignedInPage() {

  return (

    <div id="main">

      <Link to="/Transactions" class="headers">
        <div id="transactions" class="headers">Transactions</div>
      </Link>
      <Link to="/MakePayment" className="headers">
        <div id="makepayment" className="headers">Make a Payment</div>
      </Link>
      <Link to="/Request" className="headers">
        <div id="request" className="headers">Requests</div>
        </Link>
      <Link to="/Logout" className="headers">
        <div id="logout" className="headers">Log Out</div>
      </Link>

    </div>

  );
}


export default SignedInPage;

// <Switch>
//         <Route path ="/Login">  <Login />  </Route>
//         <Route path ="/Logout">  <Logout />  </Route>
//         <Route path = "/SignUp"> <SignUp /> </Route>
//         <Route path = "/"></Route>
//         <Route path = "/SignedInPage"> <SignedInPage /> </Route>
//         <Route path = "/Transactions"> <Transactions /> </Route>
        
//       </Switch>
