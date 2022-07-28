import React from 'react';

import { Cookie } from "./cookie/cookie";
import { Counter } from "./counter/counter"

// Assets
import "./App.css"
import { Shop, toggle_shop } from './shop/shop';
import { TabItem, Tabs } from './tabs/tabs';
import { toggle_upgrades, Upgrades } from './upgrades/upgrades';
import { StatTracker } from './stats';

export default class App extends React.Component {
  items = [
    new TabItem(
      "Shop",
        (state: boolean) => {toggle_shop(state)},
    ),
    new TabItem(
      "Upgrades",
        (state: boolean) => {toggle_upgrades(state)},
    )
  ]

  // timer: NodeJS.Timer | undefined

  // componentDidMount() {
  //   this.timer = setInterval(
  //     () => {
  //       save_shop()
  //     },
  //     20 * 1000
  //   )
  // }

  render() {
    return (
        <div id='main-grid'>
          <Cookie/>
          <Counter/>
          <Shop/>
          <Upgrades/>
          <Tabs items={this.items}/>
          <StatTracker></StatTracker>
        </div>
    ) 
  }
}
