import React from "react";
import Cookies from 'js-cookie';
import "./Login.js"
import "./Transactions.css";
import { Link, Route, Switch } from 'react-router-dom';
import Login from "./Login.js";
 

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

    function gettingInfo(){
        //Cookies.get(); //grabbing the username
        //Cookies.get('checkBalance', {path: Login.js}); grabbing the balance on user
        console.log(Cookies.get("loggedIn"));
    };

    const closeBox=()=>{
        window.location.replace("http://localhost:3000/SignedInPage") //return to signedinpage if clicked no
    }

    return (
        <div className="transactionsbox">
            <div className="contents">
                <h2>Transactions</h2>
                <label>Username: </label>
                {Cookies.get("loggedIn")}
                <br></br>
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