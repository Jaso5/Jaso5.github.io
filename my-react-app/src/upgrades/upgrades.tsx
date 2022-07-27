import React from "react";
import { MoneyLabel } from "../label/price";

// Assets
import UPGRADE_LIST from "./upgrades_list.json"

export let toggle_upgrades: Function;

export class Upgrades extends React.Component<{}, {
    show: boolean
    owned: Set<Upgrade>
    buyable: Upgrade[]
    locked: Upgrade[]
}> {
    checker: undefined | NodeJS.Timer

    constructor(props: {}) {
        super(props);

        let locked: Upgrade[] = [];

        UPGRADE_LIST.upgrades.forEach((item) => {
            locked.push(new Upgrade(
                item.name, item.description, item.cost,
                item.requires, item.depends
            ))
        })

        this.state = {
            show: false,
            buyable: [],
            owned: new Set(),
            locked,
        }

        toggle_upgrades = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount() {
        this.checker = setInterval(() => this.check_for_upgrades(), 5000)
    }

    check_for_upgrades() {
        const nowBuyable = this.state.locked.filter(item => {
            return item.unlockable()
        })

        const notBuyable = this.state.locked.filter(item => {
            return !item.unlockable()
        })
        
        this.setState({
            buyable: [...nowBuyable, ...this.state.buyable],
            locked: notBuyable
        })
    }

    render() {
        let upgrades: Array<JSX.Element> = [];
        this.state.buyable.forEach(item => {
            upgrades.push(item.render())
        })
        return (
            <div className="content right" style={{display: (this.state.show ? "Block" : "None")}}>
                { upgrades }
            </div>
        )
    }
}

class Upgrade {
    name: string
    description: Array<string>
    cost: number
    requires: object
    depends: Array<string>

    constructor(
        name: string, description: Array<string>,
        cost: number, requires: object,
        depends: Array<string>
    ) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.requires = requires;
        this.depends = depends;
    }

    unlockable() : boolean {
        return true
    }

    render() {
        return (
            <div className="upgrade" key={this.name}>
                <h1>{this.name}</h1>
                {
                    this.description.map((item, index) => {
                        return (
                            <h2 key={index}>{item}</h2>
                        )
                    })
                }
                <MoneyLabel price={this.cost}></MoneyLabel>
            </div>
        )
    }
}