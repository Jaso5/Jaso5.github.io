import React from 'react';

import { Cookie } from "./cookie/cookie";
import { Counter } from "./counter/counter"

// Assets
import "./App.css"
import { Shop, toggle_shop } from './shop/shop';
import { TabItem, Tabs } from './tabs/tabs';
import { toggle_upgrades, Upgrades } from './upgrades/upgrades';

export default class App extends React.Component {
  items = [
    new TabItem(
      "Shop",
        () => {toggle_shop()},
    ),
    new TabItem(
      "Upgrades",
        () => {toggle_upgrades()},
    )
  ]

  render() {
    return (
        <div id='main-grid'>
          <Cookie/>
          <Counter/>
          <Shop/>
          <Upgrades/>
          <Tabs items={this.items}/>
        </div>
    ) 
  }
}
