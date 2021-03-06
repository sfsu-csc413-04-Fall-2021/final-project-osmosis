import React from "react";
import Cookies from 'js-cookie';
import "./Login.js"
import { Link, Route, Switch } from 'react-router-dom';
import PopUp from "./PopUp.js";
import Loading from "./Loading.js";

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
            {props.complete ?
                <div className="box">Sent</div> :
                <div className="red box">Pending</div>
            }

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

function setPrivacy(p){
    this.state.privacy = p;
};

class Transactions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            privacy: true
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
        console.log(this.state.privacy);
        fetch((this.state.privacy ? 'api/view-private' : 'api/view-all'), settings)
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
                    {this.state.data ? <TransactionsList data={this.state.data} /> : <Loading />}
                    <br />
                    <div id = "PrivacySwitch">
                    <button onClick = {() => {this.state.privacy = true; this.renderMyData();}}>Your Transactions</button>
                    <button onClick= {() => {this.state.privacy = false; this.renderMyData();}}>Global Transactions</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transactions;