import Cookies from "js-cookie";
import React from "react";
import './MakePayment.css';

function MakePayment() {

    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState('');
<<<<<<< HEAD
    const [result, setResult] = React.useState('');
=======
    const [result, setResult] = React.useState(null);
>>>>>>> d6a1dfaf2254d11f3f82212734eaab3143c9865c

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
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/pay', settings)
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