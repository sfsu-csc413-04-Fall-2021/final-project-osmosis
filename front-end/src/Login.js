import React from "react";
import "./Login.css";
import { Link, Switch, Route } from 'react-router-dom';
//import * as $ from "jquery";

/*import MakePayment from './MakePayment';
import Logout from './Logout';
import Transactions from './Transactions';
import SignUp from './SignUp';*/

import SignedInPage from './SignedInPage';
import Cookies from 'js-cookie'



function Login() {


  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [result, setResult] = React.useState(null);
  console.log(getCookie(user));
  
  
  
  const myHandler = () => {

    console.log('Username= ' + user);
    console.log('Password= ' + password);
    const body = {
      //body of post request
      username: user,
      password: password
    };
    const settings = {
      method: 'post',
      body: JSON.stringify(body),
    };
    fetch('/api/log-in', settings)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.isSuccess) {
         // setResult(true);
          Cookies.set(Login, user, {expires: 7});  // 7day expirations session
          console.log(Cookies.get(user)); // Should print true
          window.location.replace('./SignedInPage');
        } else {
         // setResult(data.error);
         window.location.replace('./Login');
        }
      })
      .catch(console.log);

  };
  // jQuery method should work just be using sessionStorage.getItem();
  // Problem with jQuery is it is not compatible with multiple users, it just determines if user is logged in.
  // $(window).on('load', function(){
  //   sessionStorage.setItem('status', 'loggedIn')
  // });
  // if (sessionStorage.getItem('status' !=null)){
  // }     
  // else{
  // }

  function setCookie(username) {
    const d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    let expires = "expires" + d.toUTCString();
    document.cookie = user + "=" + user + ";" + ";path=/";
  }
  function getCookie(username) {
    let name = user + "=";
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
    let user = getCookie(user);
    if (user != "") {
      console.log("session active")
      return true;
    } else {
      console.log("session over")
      return false;
    }
  }

  return (
    <div className="login-box" >

      <div className="log-in">
        <div className="contents">
          <h2>Please Log In</h2>
          <div className="username">
            <label>Username</label>
            <br>
            </br>
            <input value={user} onChange={(e) => setUser(e.target.value)} className="userName-input">

            </input>
            <br>
            </br>
            <label>Password</label>
            <br></br>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="userName-input">

            </input>
            <br>
            </br>
            <br>
            </br>

            <button onClick={myHandler} >Enter</button>
          </div>
        </div>



      </div>

    </div>





  );
}

export default Login;

//<button onClick={myHandler} onClick={myRedirect} >Enter</button>
//<button onClick={myHandler}>Enter</button>
/*<Switch>
        
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/MakePayment"> <MakePayment /> </Route>
        <Route path ="/Login">  <Login />  </Route>
        <Route path ="/Logout">  <Logout />  </Route>
        <Route path = "/SignUp"> <SignUp /> </Route>
        <Route path = "/"></Route>
        
      </Switch>*/

     /* <nav> 
      <Link to= "./SignedInPage.js">
      </Link>
      </nav>

      <Switch>
        
        <Route path ="/SignedInPage">  <SignedInPage />  </Route>
        
      </Switch>
      
      <Link to= 'SignedInPage'>
                        <button onClick={myHandler} onClick={myRedirect} >Enter</button> 
            </Link>*/


// Doesn't work because Kerberos won't install properly.
// var express = require('express');
// var session = require('express-session');
// var MongoDBStore = require('connect-mongodb-session')(session);

// var app = express();
// var store = new MongoDBStore(
//   {
//     uri: 'mongodb://bad.host:27000/Osmosis?connectTimeoutMS=10',
//     databaseName: 'Osmosis',
//     collection: 'mySessions'
//   },
//   function(error) {
//     // Should have gotten an error
//   });

// store.on('error', function(error) {
//   // Also get an error here
// });

// app.use(session({
//   secret: 'This is a secret',
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//   },
//   store: store,
//   resave: true,
//   saveUninitialized: false
// }));

// app.get('/', function(req, res) {
//   res.send('Hello ' + JSON.stringify(req.session));
// });

// app.listen(3000);


