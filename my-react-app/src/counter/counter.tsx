import React from "react";
import { MoneyHeader } from "../label/price";

// Assets
import "./counter.css"

export let add_money: Function;
export let remove_money: Function;
export let get_money: Function;

export class Counter extends React.Component<{}, {money: number}> {
    constructor(props: {}) {
        super(props);

        this.state = {money: 10};

        add_money = this.push_money.bind(this);
        remove_money = this.remove_money.bind(this);
        get_money = this.get_money.bind(this);
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.update_money(),
    //         100
    //     );
    // }

    push_money(money: number) {
        this.setState({money: this.state.money + money});
    }

    remove_money(money: number) : boolean {
        if (this.state.money >= money) {
            this.setState({money: this.state.money - money});
            return true
        } else {
            return false
        }
    }

    get_money() : number {
        return this.state.money
    }

    render() {
        return (
            <div className="content counter">
                <MoneyHeader price={this.state.money}></MoneyHeader>
            </div>
        )
    }
}