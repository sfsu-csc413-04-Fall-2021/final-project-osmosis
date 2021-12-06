import React from "react";
import "./Login.css";
import { Link, Switch, Route} from 'react-router-dom';

/*import MakePayment from './MakePayment';
import Logout from './Logout';
import Transactions from './Transactions';
import SignUp from './SignUp';*/

import SignedInPage from './SignedInPage';

function Login() {

    const [user,setUser]= React.useState('');
    const [password, setPassword]=React.useState('');
  
    const myHandler= () => {
  
    console.log( 'Username= '+ user);
    console.log( 'Password= ' +password);
    const body={
        //body of post request
        username: user,
        password: password
    };
    const settings = {
        method: 'post',
        body: JSON.stringify(body),
    };
    fetch('/api/log-in', settings)
    
    };
    const myRedirect=()=>{
      window.location.replace("http://localhost:3000/SignedInPage")
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

            <Link to= "/SignedInPage">
                <button onClick={myHandler} >Enter</button> 
            </Link>

            <Switch>
            <Route path ="/SignedInPage"> <SignedInPage /> </Route>
            </Switch>


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