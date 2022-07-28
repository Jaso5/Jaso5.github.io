import React from "react";
import { add_money, remove_money } from "../../counter/counter";
import { MoneyLabel, MoneySecond } from "../../label/price";
import { update_shop } from "../shop";

// Assets
import "./item.css"


// {iconSrc: string, name: string, initialPrice: number, value: number}, {count: number, price: number, value: number}

export class Item {
    name: string
    key: string
    icon_src: string

    price: number
    production: number

    count: number


    constructor(name: string, icon_src: string, key: string, initial_price: number, production: number, count: number) {
        this.name = name;
        this.key = key;
        this.icon_src = icon_src;

        this.price = initial_price;
        this.production = production;

        this.count = 0;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (remove_money(this.price)) {
            if (this.count === 0) {
                this.start_ticker();
            }

            this.price = Math.floor(this.price * 1.2);
            this.count++;
            update_shop(this.key, 1)
        }
    }

    start_ticker() {
        setInterval(
            () => {this.tick()},
            1000
        )
    }

    tick() {
        add_money(this.count * this.production)
    }

    render() {
        return (
            <div className="item" onClick={this.handleClick} key={this.key}>
                <img src={this.icon_src} alt="Icon for item"></img>
                <h1>{this.name}</h1>
                <MoneySecond count={this.count} produce={this.production} icon={this.icon_src}/>
                <MoneyLabel price={this.price}/>
            </div>
        )
    }
}

// export function deserialize_item(json: string): Item {
//     let obj = JSON.parse(json);
    
//     return new Item(obj.name, obj.icon_src, obj.key, obj.initial_price, obj.number, obj.count)
// }