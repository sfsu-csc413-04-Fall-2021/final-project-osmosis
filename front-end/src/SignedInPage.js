import './SignedInPage.css';
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

function SignedInPage() {

  return (

    <div id="main">
      <Link to="/Transactions" className="headers">
        <div id="transactions" className="headers">Transactions</div>
      </Link>
      <Link to="/MakePayment" className="headers">
        <div id="makepayment" className="headers">Make a Payment</div>
      </Link>
      <Link to="/Logout" className="headers">
        <div id="logout" className="headers">Log Out</div>
      </Link>

    </div>

  );
}

export default SignedInPage;
//<Route path = "/"></Route>
//<Route path ="/Transactions">  <Transactions />  </Route>