import React from "react";
import "./Transactions.css";
import { Link, Route, Switch } from 'react-router-dom';

function Transactions() {
    const [username, checkUsername] = React.useState('');
    const [balance, checkBalance] = React.useState('');
    const [history, checkHistory] = React.useState('');

    const displayOption = () => {
        const body = {
            username: username,
            balance: balance,
            history: history
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('/api/tranctions', settings);
    };

    const closeBox=()=>{
        window.location.replace("http://localhost:3000/SignedInPage")
    }

    return (
        <div className="transactionsbox">
            <div className="contents">
                <h2>Transactions</h2>
                <div className = "title">
                <label>Username:       Account Balance:</label>
                </div>
                <div className="prevtrans">

                </div>
                <button onClick={closeBox}>Close</button>
            </div>
        </div>

    );
}

export default Transactions;
/*<div className="form">
                <div className="contents">
                    <h2>Transactions</h2>
                    <div className="title">
                        <label>Username:</label>
                        {username}
                        <br></br>
                    

                        <div className="title">
                        <label>Account Balance:</label>
                            {balance}
                            <br></br>
                        </div>
                        <br></br>

                        <div className="title">
                            <label>Payment History:</label>
                            {history}
                            <br></br>
                        </div>

                        <button onClick={closeBox}>Close</button>
                    </div>
                </div>
            </div>*/