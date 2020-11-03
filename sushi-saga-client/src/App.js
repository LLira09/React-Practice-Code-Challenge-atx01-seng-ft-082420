import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = 'http://localhost:3000/sushis';

class App extends Component {
  state = {
    sushis: [],
    eaten: [],
    money: 200,
    displayIndex: 0
  };
  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(sushis => {
        // console.log(sushis);
        this.setState({ sushis });
      });
  }

  fourSushis = () => {
    return this.state.sushis.slice(
      this.state.displayIndex,
      this.state.displayIndex + 4
    );
  };

  moreSushi = e => {
    let newDisplayIndex = this.state.displayIndex + 4;
    this.setState({
      displayIndex: newDisplayIndex
    });
  };

  eatSushi = sushi => {
    console.log(sushi);
    // subtract sushi price form current money
    const newMoney = this.state.money - sushi.price;
    // Check if sushi passed is not eaten and we have enough money
    if (!this.state.eaten.includes(sushi) && newMoney >= 0) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: newMoney
      });
    }
  };
  render() {
    return (
      <div className='app'>
        <SushiContainer
          sushis={this.fourSushis()}
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
          eaten={this.state.eaten}
        />
        <Table money={this.state.money} />
      </div>
    );
  }
}

export default App;
