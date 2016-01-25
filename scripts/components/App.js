import React from 'react';
import Chance from 'chance';

class App extends React.Component{
  constructor(props) {
    super(props);

    const people=[];

    for(let i =0; i<10;i++) {
      people.push({
        name: chance.first(),
        country: chance.country({ full: true })
      });
    }
      this.state={people};
  }
  buttonClicked() {
    const newState = {
        name: chance.first()
    };

    this.setState(newState);
  }
  render(){
    return (
      <div>
        <h1>Welcome {this.state.name}</h1>
        <p>Glad to see someone from {this.state.country} could make it</p>
        <button onClick={this.buttonClicked(this)}>BUTTON!</button>
      </div>
      )
  }
};

export default App;
