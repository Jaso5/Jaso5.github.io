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
                                onClick={(event) => {
                                    item.toggle_callback();
                                    this.props.items[this.state.active].toggle_callback();
                                    this.setState({
                                        active: index
                                    })
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
}

export class TabItem {
    label: string
    toggle_callback: Function

    constructor(label: string, toggle_callback: Function) {
        this.label = label;
        this.toggle_callback = toggle_callback;

    }
}