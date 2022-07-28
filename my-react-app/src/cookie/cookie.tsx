import React from "react";
import { add_money } from "../counter/counter";
// Assets
import "./cookie.css";
import BIN from "./../assets/bin.png";

export let get_clicks: Function;
export let update_clicks: Function;

export class Cookie extends React.Component<{}, {}> {
  clicks: number  
  value: number
  
  constructor(props: {}) {
      super(props);

      this.clicks = 0;
      this.value = 1;

      this.handleClick = this.handleClick.bind(this);
      get_clicks = () => {return this.clicks}
      update_clicks = this.update_clicks.bind(this)
    }
  
    render() {
      return (
        <div className="cookie-container content">
            <div><img src={BIN} alt="A cookie" onClick={this.handleClick}></img></div>
        </div>
      )
    }

    handleClick() {
      add_money(this.value);
      this.clicks++;
    }

    update_clicks(add: number, multiply: number) {
      this.value = (this.value + add) * multiply
    }
  }