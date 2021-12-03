import React from "react";
import "./MakePayment.css";

function MakePayment(){
    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const myHandlerRequest= () => {
        const body = {
            recipient: recipient,
            amount: amount
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/make-payment', settings);
    };

    const myHandlerSend = () => {
        const body = {
            recipient: recipient,
            amount: amount
        };
        const settings ={
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/make-payment', settings)
    };

    return (
        <div className="form">
            <div className="contents">
                <div className="title">Username</div>
                <input value={recipient} onChange={(a) => setRecipient(a.target.value)}>Enter Username</input>
                <div className="title">Amount</div>
                <input value={amount} onChange={(a) => setAmount(a.target.value)}>Enter Amount</input>   
                <button onClick={myHandlerSend}>Send</button>
                <button onClick={myHandlerRequest}>Requesting</button>         
            </div>
        </div>
    );
}

export default MakePayment;