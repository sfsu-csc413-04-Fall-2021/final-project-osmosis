import React from "react";
import Cookies from 'js-cookie';
import "./Login.js"
import "./Transactions.css";
import { Link, Route, Switch } from 'react-router-dom';
import Login from "./Login.js";
import PopUp from "./PopUp.js";

function Transaction(props) {
    return (
        <div className="box">
            <div className="sender">
                {props.sender}
            </div>
            <div className="recipient">
                {props.recipient}
            </div>
            <div className="amount">
                {props.amount}
            </div>
        </div>
    );
}

class TransactionsList extends React.Component {
    render() {
        console.log("props" + this.props.data.transactions.length);
        if (this.props.data.transactions) {
            console.log(this.props.data.transactions);
            var transactions = this.props.data.transactions.map(
                function (transaction) {
                    console.log(transaction);
                    return Transaction(transaction);
                });
            return (
                <div className="transactions">
                    {transactions}
                </div>
            );
        }
    }
};

class Transactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentWillMount() {
        this.renderMyData();
    }

    renderMyData() {
        const body = {
            username: Cookies.get("loggedIn")
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('api/view-all', settings)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
                console.log(responseJson);
            })
            .catch((error) => {
                console.log("ERROR");
                console.error(error);
            });
    }

    render() {
        const closeBox = () => {
            window.location.replace("../") //return to home page if clicked
        }
        return (
            <div className="transactionsbox">
                <div className="contents">
                    <h2>Transactions</h2>
                    <label>Username: </label>
                    {Cookies.get("loggedIn")}
                    <br />
                    {this.state.data ? <TransactionsList data={this.state.data} /> : <PopUp />}
                    <button onClick={closeBox}>Close</button>
                </div>
            </div>
        );
    }
}

export default Transactions;

/* function Transactions() {
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
        const body = {
            username: username
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        console.log("fetch");
        fetch('api/view-all', settings)
            .then((data) => data.json())
            .then()
            // .then((result => {
            //     console.log("result");
            //     console.log(result);
            //     for(var i = 0;i < result.transactions.length;i++) {
            //         console.log(result.transactions.at(i));
            //         transactionsList.push(result.transactions.at(i));
            //     }
            //     return result;
            // }));
    }

    return (
        <div className="transactionsbox">
            <div className="contents">
                <h2>Transactions</h2>
                <label>Username: </label>
                {Cookies.get("loggedIn")}

                <TransactionsList transactions={loadTransaction(Cookies.get("loggedIn"))} />
                <br></br>
                {this.state.data ? <TransactionsList transactions={this.state.data} /> : <TransactionsList /> }
                <button onClick={closeBox}>Close</button>
            </div>
        </div>

    );
} */
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