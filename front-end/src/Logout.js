import React from "react";
import "./Logout.css";
<<<<<<< HEAD
import Cookies from 'js-cookie';
=======
import Cookies from "js-cookie";

>>>>>>> 2114ec0a244cef32724f88447173c38bdba83221

function Logout(){

    const myRedirect=()=>{
<<<<<<< HEAD
        window.location.replace("../")
        Cookies.remove('loggedIn');
=======
        window.location.replace("http://localhost:3000/")
        Cookies.remove("loggedIn");
>>>>>>> 2114ec0a244cef32724f88447173c38bdba83221
    }

    const noClicked=()=>{
        window.location.replace("../")
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