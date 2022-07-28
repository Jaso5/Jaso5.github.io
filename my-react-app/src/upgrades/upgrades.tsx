import React from "react";
import { update_clicks } from "../cookie/cookie";
import { remove_money } from "../counter/counter";
import { MoneyLabel } from "../label/price";
import { get_owned, update_produce } from "../shop/shop";
import { get_stat } from "../stats";

// Assets
import UPGRADE_LIST from "./upgrades_list.json"

export let toggle_upgrades: Function;
export let is_owned: Function;
let try_buy_upgrade: Function;

export class Upgrades extends React.Component<{}, {
    show: boolean
    owned: Map<string ,Upgrade>
    buyable: Upgrade[]
    locked: Upgrade[]
}> {
    checker: undefined | NodeJS.Timer

    constructor(props: {}) {
        super(props);

        let locked: Upgrade[] = [];

        console.log(`Loading ${UPGRADE_LIST.upgrades.length} upgrades`)

        UPGRADE_LIST.upgrades.forEach((item) => {
            locked.push(new Upgrade(
                item.name, item.description, item.cost,
                item.requires, item.depends, item.effect
            ))
        })

        this.state = {
            show: false,
            buyable: [],
            owned: new Map(),
            locked,
        }

        toggle_upgrades = this.toggle.bind(this);
        is_owned = this.is_owned.bind(this);
        try_buy_upgrade = this.try_buy_upgrade.bind(this);
    }

    toggle(state: boolean) {
        this.setState({
            show: state
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

    try_buy_upgrade(upgrade: Upgrade) {
        if (remove_money(upgrade.cost)) {
            upgrade.effect.apply()
            
            this.state.owned.set(upgrade.name, upgrade);

            let index = this.state.buyable.findIndex(item => {return item === upgrade});

            this.state.buyable.splice(index, 1);

            this.forceUpdate()
        }
    }

    is_owned(key: string) {
        return this.state.owned.has(key)
    }

    render() {
        let upgrades: Array<JSX.Element> = [];
        this.state.buyable.forEach(item => {
            upgrades.push(item.render(() => {}))
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
    requires: Requires
    depends: Array<string>
    effect: Effect

    constructor(
        name: string,
        description: Array<string>,
        cost: number, 
        requires: {
            owned: {type: string, count: number}[],
            stats: {type: string, count: number}[]
        },
        depends: Array<string>,
        effect: {player: {type: string, add: number, multiply: number}[], shop: {type: string, add: number, multiply: number}[]}
    ) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.requires = new Requires(requires.owned, requires.stats);
        this.depends = depends;
        this.effect = new Effect(effect);
    }

    unlockable() : boolean {
        let result = true;

        this.depends.forEach(item => {
            result = result && is_owned(item);
        })

        result = result && this.requires.check();

        return result;
    }

    render(click: Function) {
        return (
            <div className="upgrade" key={this.name} onClick={() => {try_buy_upgrade(this)}}>
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

class Requires {
    owned: {type: string, count: number}[]
    stats: {type: string, count: number}[]

    constructor(
        owned: {type: string, count: number}[],
        stats: {type: string, count: number}[]
    ) {
        this.owned = owned;
        this.stats = stats;
    }

    check() : boolean {
        let result = true;

        this.stats.forEach(item => {
            result = result && (get_stat(item.type) >= item.count);
        })

        this.owned.forEach(item => {
            result = result && (get_owned(item.type) >= item.count);
        })

        return result;
    }
}

class Effect {
    player: {type: string, add: number, multiply: number}[]
    shop: {type: string, add: number, multiply: number}[]

    constructor(obj: {player: {type: string, add: number, multiply: number}[], shop: {type: string, add: number, multiply: number}[]}) {
        this.player = obj.player;
        this.shop = obj.shop;
    }

    apply() {
        this.shop.forEach(item => {
            update_produce(item.type, item.add, item.multiply)
        })

        this.player.forEach(item => {
            if (item.type === "clicks") {
                update_clicks(item.add, item.multiply)
            }
        })
    }
}