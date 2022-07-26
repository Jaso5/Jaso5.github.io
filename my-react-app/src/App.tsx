import React from 'react';

import { Cookie } from "./cookie/cookie";
import { Counter } from "./counter/counter"

// Assets
import "./App.css"
import { Buy } from './buy/buy';

export default class App extends React.Component {
  render() {
    return (
        <div id='main-grid'>
          <Cookie></Cookie>
          <Counter></Counter>
          <Buy></Buy>
        </div>
    ) 
  }
}
