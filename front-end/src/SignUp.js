import React from "react";
import "./SignUp.css";

function SignUp() {

    const [user,setUser]= React.useState('');
    const [password, setPassword]= React.useState('');
    const [repassword, setRePassword]= React.useState('');
    const [result, setResult] = React.useState(null);
  
    const myHandler= () => {
          var ABC = new RegExp(
              "(?=.*[A-Z])"
          );
    
        if(ABC.test(user)){
        } else{ 
            window.alert("Username has to have an Uppercased letter")
        }
        if(user.length<=6) {
            window.alert("Username must be 6 or more characters")
        
        }if(password!=repassword){
            window.alert("Passwords do not match")
        }else{
        
    

  
    console.log( 'Username= '+ user);
    console.log( 'Password= ' + password);
    console.log( 'RePassword= '+ repassword)
        }
        
        
        
    const body={
        //body of post request
        username: user,
        password: password,
        repassword: repassword
    };
    const settings = {
        method: 'post',
        body: JSON.stringify(body),
        };
    fetch('/api/sign-up', settings)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.isSuccess) {
            setResult(true);
        } else {
            setResult(data.error);
        }
    })
    .catch(console.log);
  
  };

    return(


        <div className = "sign-up box">
            
            <div className = "sign-up-area">
                <div className = "contents">
                <h2>Sign Up for Osmosis Payment</h2>
                <div className = "setUsername">
                    <label>Enter a Username</label>
                    <br>
                    </br>
                    <input id="username" value={user} onChange={(e) => setUser(e.target.value)} className="userName-input">
                    </input>
                    <br>
                    </br>

                    <label>Enter a Password</label>
                    <br>
                    </br>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="userName-input">
                    </input>
                    <br>
                    </br>

                    <label>Re-enter Password</label>
                    <br>
                    </br>
                    <input type="repassword" value={repassword} onChange={(e) => setRePassword(e.target.value)} className="userName-input">
                    </input>
                    <br>
                    </br>
                    <br>
                    </br>

                    <button onClick={myHandler} >Submit</button>
                </div>
                </div>
            </div>
        </div>

        
    );
    

}



export default SignUp;