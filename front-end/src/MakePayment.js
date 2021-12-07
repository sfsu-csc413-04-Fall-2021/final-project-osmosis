import React from "react";
import './MakePayment.css';

function MakePayment() {

    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const myHandlerRequest = () => {
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
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/make-payment', settings);
    };

    return (
        <div className="makepaymentbox">
            <div className="form">
                <div className="contents">
                    <h2>Lets Make a Payment</h2>
                    <div className="title">
                        <label>Enter Username</label>
                        <br></br>
                        <input value={recipient} onChange={(a) => setRecipient(a.target.value)} className="userName-Input"></input>
                    </div>
                    <br></br>

                    <div className="title">
                        <label>Enter Amount</label>
                        <br></br>
                        <input value={amount} onChange={(a) => setAmount(a.target.value)} className="userName-Input"></input>
                    </div>
                    <br></br>

                    <button onClick={myHandlerSend}>Send</button>
                    <button onClick={myHandlerRequest}>Request</button>
                </div>
            </div>
        </div>
    );
}

export default MakePayment;