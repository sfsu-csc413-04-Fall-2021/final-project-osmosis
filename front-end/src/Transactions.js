import React from "react";
import Cookies from 'js-cookie';
import "./Login.js"
import "./Transactions.css";
import { Link, Route, Switch } from 'react-router-dom';
import Login from "./Login.js";

function Transaction(props) {
    return (
        <div className="box">
            <div className="sender">
                {props.config.sender}
            </div>
            <div className="recipient">
                {props.config.recipient}
            </div>
            <div className="amount">
                {props.config.amount}
            </div>
        </div>
    );
}

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

    function gettingInfo() {
        //Cookies.get(); //grabbing the username
        //Cookies.get('checkBalance', {path: Login.js}); grabbing the balance on user
        console.log(Cookies.get("loggedIn"));
    };

    const closeBox = () => {
        window.location.replace("http://localhost:3000/SignedInPage") //return to signedinpage if clicked no
    }

    class TransactionsList extends React.Component {
        render() {
            var array = this.props.PromiseResult
            console.log("props"+this.props.transactions.length);
            if (this.props.transactions) {
                console.log(this.props.transactions);
                var transactions = this.props.transactions.map(
                    function (transaction) {
                        console.log("object");
                        console.log(transaction);
                        return (
                            <div className="box">
                                <div className="sender">
                                    {transaction.sender}
                                </div>
                                <div className="recipient">
                                    {transaction.recipient}
                                </div>
                                <div className="amount">
                                    {transaction.amount}
                                </div>
                            </div>
                        );
                });
                return (
                    <div className="transactions">
                        {transactions}
                    </div>
                );
            }
        }
    };
    
    function loadTransaction(username) {
        var transactionsList = [];
        const body = {
            username: username
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        console.log("fetch");
        return fetch('api/view-all', settings)
            .then((data) => data.json())
            .then((result => {
                console.log("result");
                console.log(result);
                for(var i = 0;i < result.transactions.length;i++) {
                    transactionsList.push(result.transactions.at(i));
                }
                return result;
            }));
        console.log("full list");
        console.log(transactionsList);
        return transactionsList;
    }

    return (
        <div className="transactionsbox">
            <div className="contents">
                <h2>Transactions</h2>
                <label>Username: </label>
                {Cookies.get("loggedIn")}

                <TransactionsList transactions={loadTransaction(Cookies.get("loggedIn"))} />
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