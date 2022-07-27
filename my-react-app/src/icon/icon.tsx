import React from "react";

// Assets
import "./icon.css"

export class Icon extends React.Component<{img: string, alt: string}> {
    render() {
        return (
            <img src={this.props.img} alt={this.props.alt} className="icon"></img>
        )
    }
}