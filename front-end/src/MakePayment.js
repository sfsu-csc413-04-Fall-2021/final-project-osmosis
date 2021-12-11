import Cookies from "js-cookie";
import React from "react";
import './MakePayment.css';

function MakePayment() {

    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [result, setResult] = React.useState('');


    
    const myHandlerRequest = () => {
        console.log(Cookies.get("loggedIn"));
        const body = {
            sender: Cookies.get("loggedIn"),
            recipient: recipient,
            amount: amount
    };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/request', settings)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.isSuccess) {
           setResult(true);
           window.location.replace('../Transactions');
          } else {
           setResult(data.error);
          }
        })
        .catch(console.log);
    };

    const myHandlerSend = () => {
        const body = {
            sender: Cookies.get("loggedIn"),
            recipient: recipient,
            amount: amount
        };

        const bodyValid = {
            username: Cookies.get("loggedIn"),
        };
        const settingsValid = {
            method: 'post',
            body: JSON.stringify(bodyValid)
        }
        if(recipient!=""){
        } else{
            window.alert("Cannot send money to nothing.");
            return false;
        }
        if(amount >= 0){
        }else{
            window.alert("Cannot make a negative payment.");
            return false;
        }
        if(recipient == Cookies.get("loggedIn")){
            window.alert("Cannot make a payment to yourself");
            return false;
        }
        

        fetch('/api/view-user', settingsValid)
        .then(res => res.json())
        .then(data => {
            console.log(amount);
            console.log(data);
            if(data < amount){   // Not going into the conditional
                window.alert("User does not have enough money");
                return false;
            }
        });

        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };


        fetch('/api/pay', settings)
        .then(res => res.json())
        .then(data => {
            console.log(data.body);
            if(data.body == null){
                window.alert("User does not exist");
                return false;
            }
          console.log(data);
          if (data.isSuccess) {
           setResult(true);
           window.location.replace('../Transactions');
          } else {
           setResult(data.error);
          }
        })
        .catch(console.log);
    };

    return (
        <div className="makepaymentbox">
            <div className="form">
                <div className="contents">
                    <h2>Lets Make a Payment</h2>
                        <label>Enter Username</label>
                        <br></br>
                        <input value={recipient} onChange={(a) => setRecipient(a.target.value)} className="userName-Input"></input>
                    
                    <br></br>
                    <br></br>

                        <label>Enter Amount</label>
                        <br></br>
                        <input value={amount} onChange={(a) => setAmount(a.target.value)} className="userName-Input"></input>
                    
                    <br></br>
                    <br></br>

                    <button onClick={myHandlerSend}>Send</button>
                    <button onClick={myHandlerRequest}>Request</button>
                    
                </div>
            </div>
        </div>
    );
}

export default MakePayment;