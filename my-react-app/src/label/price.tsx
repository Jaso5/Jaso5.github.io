import React from "react";
import { Icon } from "../icon/icon";

// Assets
import BIN from "./../assets/bin.png"
import "./price.css"

export class MoneyLabel extends React.Component<{price: number}> {
    render() {
        return (
            <div>
                <Icon img={BIN} alt="cookie"/>
                <h1 className="price"> {this.props.price}</h1>
            </div>
        )
    }
}

export class MoneyHeader extends MoneyLabel {
    render() {
        return (
            <div>
                <Icon img={BIN} alt="cookie"/>
                <h1 className="price-header"> {this.props.price}</h1>
            </div>
        )
    }
}

export class MoneySecond extends React.Component<{produce: number, count: number, icon: string}> {
    render() {
        return (
            <div>
                <Icon img={BIN} alt="cookie"/>
                <h1 className="price"> {this.props.produce}/s * {this.props.count} </h1>
                <Icon img={this.props.icon} alt="Shop Icon"></Icon>
            </div>
        )
    }
}