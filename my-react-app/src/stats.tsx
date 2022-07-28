import React from "react";
import { get_clicks } from "./cookie/cookie";

export let get_stat: Function;

export class StatTracker extends React.Component {
    stats: Map<string, number>
    ticker: NodeJS.Timer | undefined
    
    constructor(props: {}) {
        super(props);
        this.stats = new Map();
        this.stats.set("clicks", 0);

        get_stat = this.get_stat.bind(this);
    }

    componentDidMount() {
        this.ticker = setInterval(() => {
            this.stats.set("clicks", get_clicks())
        }, 5000)
    }

    get_stat(key: string) : number {
        let result = this.stats.get(key);

        if (result === undefined) {
            return 0
        } else {
            return result
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}