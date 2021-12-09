import "./MakeRequest.css";
import React from "react";
import Cookies from "js-cookie";


function MakeRequest(){

    const[username, setUsername]=React.useState('');
    const[amount, setAmount]=React.useState('');
    const [result, setResult] = React.useState('');
    
    const myCancel=()=>{
        window.alert("Request Canceled : Redirecting to Transaction page")
        window.location.replace('/Transactions');
        return false; 
         
    }

    const mySend=()=>{
        console.log(Cookies.get("loggedIn"));
        const body ={
            sender:Cookies.get("loggedIn"),
            username:username,
            amount:amount
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('api/request', settings)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.isSuccess) {
           setResult(true)
           window.location.replace('/Transactions');
          } else {
      setResult(data.error);
          }
        })
        .catch(console.log);
    
        


    };
    

    return(
         <div className="container1">
             <div id="contains">
             <h3>Send a Request</h3>
             <div>Enter Username </div>
             <input value={username} onChange={(a) => setUsername(a.target.value)}  className="user-input" placeholder="Username"></input>
         
             <div>Enter Amount </div>
             <input value={amount} onChange={(a) => setAmount(a.target.value)}  className="amount-input" placeholder="Amount"></input>
         <br></br>
         <button onClick={mySend}>Send</button>
         <button onClick={myCancel}>Cancel</button>
         </div>
         
         
         </div>





    );
}




export default MakeRequest;
