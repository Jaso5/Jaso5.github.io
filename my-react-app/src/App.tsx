import React from 'react';

import { Cookie } from "./cookie/cookie";
import { Counter } from "./counter/counter"

export const globals = {
  money: 10
}

export default class App extends React.Component<{}, {money: Number}> {



  render() {
    return (
        <div>
          <Cookie></Cookie>
          <Counter money={globals.money}></Counter>
        </div>
    ) 
  }
}

// export default function App() : JSX.Element {

// }

// class Welcome extends React.Component<{name: string}> {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

// class Clock extends React.Component<{}, {date: Date}>{
//   timerID: NodeJS.Timer | undefined;
  
//   constructor(props: {}) {
//     super(props);
//     this.timerID = undefined;
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({date: new Date()})
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }