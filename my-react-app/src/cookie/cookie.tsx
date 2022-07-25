import React from "react";
import { globals } from "../App";
// Assets
import "./cookie.css";
import COOKIE from "./cookie.png";

export class Cookie extends React.Component {
    constructor(props: {}) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }
  
    render() {
      return (
        <div className="cookie-container">
            <div><img src={COOKIE} alt="A cookie" onClick={this.handleClick}></img></div>
        </div>
      )
    }

    handleClick() {
      globals.money += 1;
    }
  }