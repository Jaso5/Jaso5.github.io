import React from "react";
import { add_money } from "../counter/counter";
// Assets
import "./cookie.css";
import COOKIE from "./../assets/cookie.png";

export class Cookie extends React.Component {
    constructor(props: {}) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }
  
    render() {
      return (
        <div className="cookie-container content">
            <div><img src={COOKIE} alt="A cookie" onClick={this.handleClick}></img></div>
        </div>
      )
    }

    handleClick() {
      add_money(1);
    }
  }