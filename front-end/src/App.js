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
import MakeRequest from './MakeRequest';
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
      <div id="background"></div>

      <Switch>
        <Route path = "/Login">  <Login />  </Route>
        <Route path = "/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/Transactions"> <Transactions /> </Route>
        <Route path = "/MakePayment"> <MakePayment /> </Route>
        <Route path= "/MakeRequest"> <MakeRequest/></Route>
        <Route path = "/"> <PopUp /> </Route>
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