import React from "react";
import { Link, Switch, Route } from 'react-router-dom';

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

      <div className="log-in field">
        <div className="contents">
          <h2>Please Log In</h2>
          <div className="username">
            <label>Username</label>
            <br />
            <input value={user} onChange={(e) => setUser(e.target.value)} className="input">

            </input>
            <br />
            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input">

            </input>
            <br />

            <button onClick={myHandler} >Enter</button>
          </div>
        </div>
      </div>

  );
}

export default Login;