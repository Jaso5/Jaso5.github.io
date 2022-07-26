import React from "react";

export class PriceLabel extends React.Component<{price: number}> {
    render() {
        return (
            <div>
                <h1 className="price">£{this.props.price}</h1>
            </div>
        )
    }
}