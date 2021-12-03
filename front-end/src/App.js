import './App.css';
import React from 'react';
import { Link, Switch, Route} from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';


function App() {  

  return (
    <div >
      <nav>

        <div id="main">
          <Link to= "/" class = "headers">
          <div id="home" class="headers">Home</div>
          </Link>
          <Link to= "/SignUp" class = "headers">
          <div signup="signup" class="headers">Sign Up</div>
            </Link>
          <Link to="/Login" class = "headers">
          <div id="login" class="headers">Log In</div>
          </Link> 
          <Link to="/Logout" class = "headers">     
          <div id="logout" class="headers" >Logout</div>
          </Link> 
          <Link to="/Transactions" class = "headers">         
          <div id="tran" class="headers">Transactions</div>
          </Link>
          <Link to= "/MakePayment" class = "headers">
          <div id="payment" class="headers">Make a Payment</div>
          </Link>
        </div>
        
      </nav>

      <div>
        <div id = "pagebody">
          <label>Welcome to Osmosis Payments</label>
        </div>
      </div>
<img id = "photo" class = "photos" src = "https://exchangerateiq.com/Riq/images/posts/posts_image/1593762776moneyfactor.jpg" alt = "photo"></img>
      
      <Switch>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/"></Route>
        
      </Switch>

    </div>
      

     
      
  
  );
}

export default App;



