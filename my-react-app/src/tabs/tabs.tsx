import React from "react";

// Assets
import "./tabs.css"

export class Tabs extends React.Component<{items: Array<TabItem>}, {active: number}> {
    constructor(props: {items: Array<TabItem>}) {
        super(props);
        this.state = {
            active: 0
        }
    }
    
    render() {
        return (
            <nav className="content">
                {
                    this.props.items.map((item, index) => {
                        return (
                            <div
                                className="tab-item"
                                onClick={() => {
                                    this.toggle(index)
                                }}
                                key={index}
                            >
                                <h1>{item.label}</h1>
                            </div>
                        )
                    })
                }
            </nav>
        )
    }

    toggle(index: number) {
        this.props.items.forEach((item, i) => {
            item.toggle_callback(i === index)
        })
    }
}

export class TabItem {
    label: string
    toggle_callback: Function

    constructor(label: string, toggle_callback: Function) {
        this.label = label;
        this.toggle_callback = toggle_callback;
    }
}