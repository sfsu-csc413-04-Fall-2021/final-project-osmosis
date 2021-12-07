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

function Header(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <SignedInPage />;
  }
  return <Default />;
}

function App() {

  function setCookie(username) {
    const d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    let expires = "expires" + d.toUTCString();
    document.cookie = username + "=" + username + ";" + ";path=/";
  }
  function getCookie(username) {
    let name = username + "=";
    let c1 = document.cookie.split(';');
    for (let i = 0; i < c1.length; i++) {
      let c = c1[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie() {
    if (document.cookie != "") {
      console.log("session active")
      return true;
    } else {
      console.log("session over")
      return false;
    }
  }

  return (

    <div >

      <div>
        <div id="title">
          <label>Welcome to Osmosis Payments</label>
        </div>
      </div>

      <nav>

      <Header isLoggedIn={true}/>

      </nav>

      <div id="background"></div>



      <Switch>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/Transactions"> <Transactions /> </Route>
        <Route path = "/MakePayment"> <MakePayment /> </Route>
        <Route path = "/"></Route>
      </Switch>

    </div>





  );
}

export default App;

/*<Link to="/Logout" class = "headers">
          <div id="logout" class="headers" >Logout</div>
          </Link>
          <Link to="/Transactions" class = "headers">
          <div id="tran" class="headers">Transactions</div>
          </Link>
          <Link to= "/MakePayment" class = "headers">
          <div id="payment" class="headers">Make a Payment</div>
          </Link>*/

//</div>img id = "photo" class = "photos" src = "https://exchangerateiq.com/Riq/images/posts/posts_image/1593762776moneyfactor.jpg" alt = "photo"></img>