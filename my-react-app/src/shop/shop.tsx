import React from "react";
import { Item } from "./item/item";

// Assets
import RAT from "./../assets/rat.png"
import RACCOON from "./../assets/raccoon.png"

import "./shop.css"

export let toggle_shop: Function;
export let update_shop: Function;

export class Shop extends React.Component<{}, {show: boolean, owned: Map<string, number>, items: Array<Item>}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            show: true,
            owned: new Map(),
            items: [
                new Item("Cookie Rat", RAT, "rat", 10, 1),
                new Item("Cookie Thief", RACCOON, "raccoon", 100, 5)
            ]
        }
        this.state.owned.set("rat", 0)
        this.state.owned.set("raccoon", 0)
        // this.state.owned.set("", 0)

        toggle_shop = this.toggle.bind(this);
        update_shop = this.update_shop.bind(this);
    }
    
    toggle() {
        this.setState({
            show: !this.state.show
        })
    }

    update_shop(key: string, amount: number) {
        let value = this.state.owned.get(key);
        if (value === undefined) {
            value = 0;
        }
        value += amount;
        
        this.state.owned.set(key, value);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="content right" style={{display: (this.state.show ? "Block" : "None")}}>
                {
                    this.state.items.map(item => {
                        return item.render()
                    })
                }
            </div>
        )
    }
}