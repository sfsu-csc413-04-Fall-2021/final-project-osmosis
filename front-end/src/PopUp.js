import "./PopUp.css";
import React from 'react';

function PopUp() {
    const closeAd = () => {
        var targetDiv = document.getElementById("Popup");
        if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
          } else {
            targetDiv.style.display = "block";
          }
    }
    const signUp = () => {
        window.location.replace("./SignUp")
    }
    return (
        <div id="Popup" className="Popup">
            <div className="contents">
                <br></br>
                <br></br>
                <h2>Attention!</h2>
                <h4>Sign Up With Osmosis Today and Get a Free</h4>
                <h3>$1000</h3>
                <h4>No Games, No Gimmocks!</h4>
                <h6>For Verified Members Only</h6>
                <button className="button1" onClick={closeAd}>Close</button>
                <button className="button1" onClick={signUp}>Sign Up Now!</button>
            </div>
        </div>
    );
}

export default PopUp;