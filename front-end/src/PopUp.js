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
    return (
        <div id="Popup" className="Popup">
            <div className="contents">
                <h2>Attention!</h2>
                <h4>Sign Up With Osmosis Today and Get a Free $1000</h4>
                <br></br>
                <br></br>
                <h6>For Verified Members Only</h6>
                <br></br>
                <button className="button1" onClick={closeAd}>Close</button>
            </div>
        </div>
    );
}

export default PopUp;