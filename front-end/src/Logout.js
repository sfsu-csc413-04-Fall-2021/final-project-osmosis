import React from "react";
import "./Logout.css";
import Cookies from "js-cookie";


function Logout(){

    const myRedirect=()=>{
        window.location.replace("http://localhost:3000/")
        Cookies.remove("loggedIn");
    }

    const noClicked=()=>{
        window.location.replace("http://localhost:3000/SignedInPage")
    }
   
    return(
        <div className="div-1">
            <h1>Do you wish to Log-out?</h1>
            <button className="button1" onClick={myRedirect} >Yes</button>
            <button  className="button1" onClick={noClicked}>No</button>
            
        </div>
    );
}


export default Logout;