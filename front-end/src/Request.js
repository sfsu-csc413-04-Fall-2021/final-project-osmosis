import "./Request.css";
import React from "react";
import Cookies from "js-cookie";
import "./Login.js"
import { Link, Route, Switch } from 'react-router-dom';
import Login from "./Login.js";
import PopUp from "./PopUp.js";



function Request(props) {
    // const [password, setPassword] = React.useState('');
    // const [result, setResult] = React.useState(null);

    const myAccept = () => {
        const body = props;
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('api/accept', settings)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
                console.log(responseJson);
            })
            .catch((error) => {
                console.log("ERROR");
                console.error(error);
            });
        window.location.replace('../Transactions')
    }
    const myDecline = () => {
        const body = props;
        const settings = {
            method: 'post',
            body: JSON.stringify(body)
        };
        fetch('api/decline', settings)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
                console.log(responseJson);
            })
            .catch((error) => {
                console.log("ERROR");
                console.error(error);
            });
        window.location.reload('../Request')
    }

    return (
        <div className="requestresults">
            <div className="box">
                <div className="sender">
                    {props.sender}
                </div>
                <div className="recipient">
                    {props.recipient}
                </div>
                <div className="amount">
                    ${props.amount}
                </div>
            </div>
            <div className="requestResult">
                <button onClick={myAccept} className="accept">Accept</button>
                <button onClick={myDecline} className="decline">Decline</button>
            </div>
        </div>
    );
}


class RequestList extends React.Component {

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
        fetch('api/view-requests', settings)
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
        console.log("props" + this.props.data.transactions.length);
        if (this.props.data.transactions) {
            console.log(this.props.data.transactions);
            var transactions = this.props.data.transactions.map(
                function (transaction) {
                    console.log(transaction);
                    return Request(transaction);
                });
            return (
                <div className="transactions">
                    {transactions}
                </div>
            );
        }
    }
};

class Requests extends React.Component {

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
        fetch('api/view-requests', settings)
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
            <div className="requestsbox">
                <div className="contents">
                    <h2>Requests</h2>
                    <label>Username: </label>
                    {Cookies.get("loggedIn")}
                    <br />
                    <div className="grids">
                        <div className="senderbox">Sender</div>
                        <div className="recipientbox">Recipient</div>
                        <div className="amountbox">Amount</div>
                    </div>
                </div>

                {this.state.data ? <RequestList data={this.state.data} /> : <PopUp />}

                <br />

                <button onClick={closeBox}>Close</button>
            </div>

        );
    }
}



export default Requests;



