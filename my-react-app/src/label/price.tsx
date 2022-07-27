import React from "react";
import { Icon } from "../icon/icon";

// Assets
import COOKIE from "./../assets/cookie.png"
import "./price.css"

export class MoneyLabel extends React.Component<{price: number}> {
    render() {
        return (
            <div>
                <Icon img={COOKIE} alt="cookie"/>
                <h1 className="price"> {this.props.price}</h1>
            </div>
        )
    }
}

export class MoneyHeader extends MoneyLabel {
    render() {
        return (
            <div>
                <Icon img={COOKIE} alt="cookie"/>
                <h1 className="price-header"> {this.props.price}</h1>
            </div>
        )
    }
}