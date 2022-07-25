import React from "react";

export class Counter extends React.Component<{money: Number}> {
    

    render() {
        return (
            <div><h1>{this.props.money.toString()}</h1></div>
        )
    }
}