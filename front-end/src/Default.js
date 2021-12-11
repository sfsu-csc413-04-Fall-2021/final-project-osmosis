import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class Default extends React.Component {
  render() {
    return (
  
      <div id="logged-out" class="nav-bar" >
        <Link to="/" class="headers">
          {/* {this.props.location.pathname == "Home"} */}
          <div id="home" class="headers">Home</div>
        </Link>
        <Link to="/SignUp" class="headers">
          <div signup="signup" class="headers">Sign Up</div>
        </Link>
        <Link to="/Login" class="headers">
          <div id="login" class="headers">Log In</div>
        </Link>
      </div>
  
    );
  }
}

export default Default;