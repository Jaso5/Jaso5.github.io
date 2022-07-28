import React from "react";
import { Item } from "./item/item";

// Assets
import RAT from "./../assets/rat_2.png"
import RACCOON from "./../assets/raccoon.png"
import OPOSSUM from "./../assets/opossum.png"
import HORROR from "./../assets/horror.png"

import "./shop.css"

export let toggle_shop: Function;
export let update_shop: Function;
export let get_owned: Function;
export let update_produce: Function;
// export let save_shop: Function;

export class Shop extends React.Component<{}, {show: boolean, owned: Map<string, number>, items: Map<string ,Item>}> {
    constructor(props: {}) {
        super(props);

        // let state_maybe = localStorage.getItem("ShopState");
        // if (state_maybe !== null) {
        //     let obj = JSON.parse(state_maybe);

        //     let items: [string, Item][] = []

        //     obj.items.forEach((json: string) => {
        //         let item = deserialize_item(json);
        //         items.push([item.key, item])
        //     })

        //     this.state = {
        //         show: true,
        //         owned: new Map(Object.entries(obj.owned)),
        //         items: new Map(items)
        //     }
        // } else {
        this.state = {
            show: true,
            owned: new Map(),
            items: new Map([
                ["rat", new Item("Trash Rat", RAT, "rat", 10, 1, 0)],
                ["raccoon", new Item("Trash Panda", RACCOON, "raccoon", 100, 5, 0)],
                ["opossum", new Item("Trash Puppy", OPOSSUM, "opossum", 750, 10, 0)],
                ["horror", new Item("Trash Eldritch Horror", HORROR, "horror", 1500, 20, 0)]
            ])
        }
        this.state.owned.set("rat", 0)
        this.state.owned.set("raccoon", 0)
        this.state.owned.set("opossum", 0)
        this.state.owned.set("horror", 0)
        

        toggle_shop = this.toggle.bind(this);
        update_shop = this.update_shop.bind(this);
        get_owned = this.get_owned.bind(this);
        update_produce = this.update_produce.bind(this);
        // save_shop = this.save.bind(this)
    }
    
    toggle(state: boolean) {
        this.setState({
            show: state
        })
    }

    get_owned(key: string) : number {
        let result = this.state.owned.get(key);

        if (result === undefined) {
            return 0
        } else {
            return result
        }
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

    update_produce(key: string, add: number, multiply: number) {
        let item = this.state.items.get(key);

        if (item !== undefined) {
            item.production = (item.production + add) * multiply;
            this.state.items.set(key, item);
        }        
    }

    // save() {
    //     let items: string[] = [];

    //     this.state.items.forEach(item => {
    //         items.push(JSON.stringify(item))
    //     })

    //     let obj = {
    //         owned: Object.fromEntries(this.state.owned),
    //         items,
    //     };

    //     localStorage.setItem("ShopState", JSON.stringify(obj))
    // }

    render() {
        let elements: JSX.Element[] = [];

        this.state.items.forEach(item => {
            elements.push(item.render());
        })

        return (
            <div className="content right" style={{display: (this.state.show ? "Block" : "None")}}>
                {
                    elements
                }
            </div>
        )
    }
}