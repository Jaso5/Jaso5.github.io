import React from "react";
import { Item } from "./item/item";

// Assets
import RAT from "./rat.png"
import RACCOON from "./raccoon.png"

export class Buy extends React.Component {
    render() {
        return (
            <div className="content">
                <Item name="Cookie Rat" initialPrice={10} iconSrc={RAT} value={1}></Item>
                <Item name="Cookie Thief" initialPrice={100} iconSrc={RACCOON} value={5}></Item>

            </div>
        )
    }
}