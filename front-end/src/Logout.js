import React from "react";
import Cookies from 'js-cookie';

function Logout(){

    const myRedirect=()=>{
        window.location.replace("../")
        Cookies.remove('loggedIn');
    }

    const noClicked=()=>{
        window.location.replace("../Transactions")
    }
   
    return(
        <div className="log-out-field">
            <h1>Do you wish to log out?</h1>
            <button className="button" onClick={myRedirect}>Yes</button>
            <button  className="button" onClick={noClicked}>No</button>
        </div>
    );
}


export default Logout;