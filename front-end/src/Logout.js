import React from "react";
import "./Logout.css";


function Logout(){

    const myRedirect=()=>{
        window.open("http://localhost:3000/")
    }
    return(
        <div className="div-1">
            <h1>Do you wish to Log-out?</h1>
            <button onClick={myRedirect}>Yes</button>
            <button>No</button>
            
        </div>
    );
}


export default Logout;