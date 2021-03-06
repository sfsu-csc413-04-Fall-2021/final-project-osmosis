import React from "react";
import { Link, Switch, Route } from 'react-router-dom';
import Cookies from "js-cookie";

function SignUp() {

    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRePassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    setCookie(user);
    console.log(getCookie);
    const myHandler = () => {

        var errorMessage = document.getElementById("ErrorMessage");

        if(user == "")
        {
            errorMessage.innerHTML = "Please enter a valid username";
            return false;
        }
        else if(password == "")
        {
            errorMessage.innerHTML = "Please enter a valid password";
            return false;
        }
        else if(repassword == "")
        {
            errorMessage.innerHTML = "Please re-enter your valid password";
            return false;
        }
        else
        {
            errorMessage.innerHTML = "";
        }

        var ABC = new RegExp(
            "(?=.*[A-Z])"
        );
        var one = new RegExp(
            "(?=.*\\d)"
        );

        if (ABC.test(user)) {
        } else {
            errorMessage.innerHTML = "Username has to have an Uppercased letter";
            return false;
        }
        if (user.length <= 6) {
            errorMessage.innerHTML = "Username must be more than 6 characters";
            return false;

        } if (ABC.test(password)) {
        } else {
            errorMessage.innerHTML = "Password must contain a Uppercase letter";
            return false;


        } if (password.length <= 6) {
            errorMessage.innerHTML = "Password must be more than 6 characters";
            return false;
        } if (one.test(password)) {
        } else {
            errorMessage.innerHTML = "Password must contain one numeric value";
            return false;
        }
        if (password != repassword) {
            errorMessage.innerHTML = "Passwords do not match";
            //window.alert("Passwords do not match")
            return false;

        } else {
            console.log('Username= ' + user);
            console.log('Password= ' + password);
            console.log('RePassword= ' + repassword)
        }
        Cookies.set("loggedIn", user, { expires: 7 });  // 7day expirations session
        console.log(Cookies.get("loggedIn"));


        const body = {
            //body of post request
            username: user,
            password: password,
            repassword: repassword
        };
        const settings = {
            method: 'post',
            body: JSON.stringify(body),
        };
        fetch('/api/sign-up', settings)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.isSuccess) {
                    setResult(true);
                    setCookie(user);
                    window.location.replace('../');
                } else {
                    setResult(data.error);
                }
            })
            .catch(console.log);
    };

    function setCookie(username) {
        const d = new Date();
        d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
        let expires = "expires" + d.toUTCString();
        document.cookie = user + "=" + user + ";" + ";path=/";
    }
    function getCookie(username) {
        let name = user + "=";
        let c1 = document.cookie.split(';');
        for (let i = 0; i < c1.length; i++) {
            let c = c1[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let user = getCookie(user);
        if (user != "") {
            console.log("session active")
            return true;
        } else {
            console.log("session over")
            return false;
        }
    }
    return (

        <div className="sign-up-area field">
            <div className="contents">
                <h2>Sign Up for Osmosis Payment</h2>
                <div className="setUsername">
                    <label>Enter a Username</label>
                    <br />
                    <input id="username" value={user} onChange={(e) => setUser(e.target.value)} className="input">
                    </input>
                    <br />

                    <label>Enter a Password</label>
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input">
                    </input>
                    <br />

                    <label>Re-enter Password</label>
                    <br />
                    <input type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} className="input">
                    </input>
                    <br />
                    <br />

                    {/*To display error messages */}
                    <div className = "error" id = "ErrorMessage"></div>

                    <button onClick={myHandler} >Submit</button>
                </div>
            </div>
        </div>

    );
}

export default SignUp;