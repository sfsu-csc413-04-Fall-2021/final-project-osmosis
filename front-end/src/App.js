import './App.css';
import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';
import SignedInPage from './SignedInPage';
import Default from './Default';
import Transactions from './Transactions';
import MakePayment from './MakePayment';
import Request from './Request';
import PopUp from './PopUp';
import Cookies from 'js-cookie';

function Header(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <SignedInPage />;
  }
  return <Default />;
}

function App() {

  return (
    <div >
      <div>
        <div id="title">
          <label>Welcome to Osmosis Payments</label>
        </div>
      </div>
      <nav>

      <Header isLoggedIn={Cookies.get('loggedIn')}/>

      </nav>

      <Switch>
        <Route path = "/Login">  <Login />  </Route>
        <Route path = "/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/Transactions"> <Transactions /> </Route>
        <Route path = "/MakePayment"> <MakePayment /> </Route>
        <Route path= "/Request"> <Request/></Route>
        <Route path = "/"> <PopUp /> </Route>
      </Switch>

    </div>

  );
}

export default App;