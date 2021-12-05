import React from "react";
import "./Login.css";
import { Link, Switch, Route} from 'react-router-dom';



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
            
  
            
            <Link to= "SignedInPage">
                        <button onClick={myHandler} >Enter</button> 
                        </Link>
          </div>
          </div>
          
          
    
  </div>
        
      </div>
        
  
       
        
    
 );
}

export default Login;
//<button onClick={myHandler}>Enter</button>