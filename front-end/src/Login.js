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
          Cookies.set("loggedIn", user, {expires: 7});  // 7day expirations session
          console.log(Cookies.get("loggedIn")); // Should print true
          window.location.replace('./Transactions');
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

  return (

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


