import React from "react";
import Cookies from 'js-cookie';
import "./Login.js"
import { Link, Route, Switch } from 'react-router-dom';
import PopUp from "./PopUp.js";

function Transaction(props) {
    console.log("Complete" + props.complete);
    return (
        <div className="grid">
            <div className="box">
                {props.sender}
            </div>
            <div className="box">
                {props.recipient}
            </div>
            <div className="box">
                ${props.amount}
            </div>
            <div className="box">
                {props.complete ? "Sent" : "Requested"}
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

class UserInfo extends React.Component {

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
        fetch('api/view-user', settings)
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
        return (
            <div className="user-info">
                <label>Username: </label>
                {Cookies.get("loggedIn")}
                <br />
                <label>Account Balance: $</label>
                {this.state.data ? this.state.data : <div />}
                <br />
            </div>
        );
    }
}

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
            <div className="transactions-field">
                <div className="contents">
                    <h2>Transactions</h2>
                    <UserInfo />
                    <br />
                    <div className="grid">
                        <div className="title"><b>Sender</b></div>
                        <div className="title"><b>Recipient</b></div>
                        <div className="title"><b>Amount</b></div>
                        <div className="title"><b>Type</b></div>
                    </div>
                    {this.state.data ? <TransactionsList data={this.state.data} /> : <PopUp />}
                    <br />
                </div>
            </div>
        );
    }
}

export default Transactions;