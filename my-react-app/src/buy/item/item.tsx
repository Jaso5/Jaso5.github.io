import React from "react";
import { add_money, remove_money } from "../../counter/counter";
import { PriceLabel } from "../../label/price";

// Assets
import "./item.css"

export class Item extends React.Component
<
    {iconSrc: string, name: string, initialPrice: number, value: number}, {count: number, price: number, value: number}
> {
    constructor(props: {iconSrc: string, name: string, initialPrice: number, value: number}) {
        super(props);
        this.state = {
            count: 0,
            price: props.initialPrice,
            value: props.value
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (remove_money(this.state.price)) {
            if (this.state.count === 0) {
                this.start_ticker()
            }

            this.setState({
                price: Math.floor(this.state.price * 1.2),
                count: this.state.count + 1
            });
        }
    }

    start_ticker() {
        setInterval(
            () => {this.tick()},
            1000
        )
    }

    tick() {
        add_money(this.state.count * this.state.value)
    }

    render() {
        return (
            <div className="item" onClick={this.handleClick}>
                <img src={this.props.iconSrc} alt="Icon for item"></img>
                <h1>{this.props.name}</h1>
                <h2>{this.state.count}</h2>
                <PriceLabel price={this.state.price}></PriceLabel>
            </div>
        )
    }
}