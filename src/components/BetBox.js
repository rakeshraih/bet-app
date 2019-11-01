import React, { Component } from 'react';

class BetBox extends Component {
  
  static getDerivedStateFromProps(props, state){
    // return {counter : 0};
    if(props.val !== state.val){
       return {
    counter : 0,
    val : props.val
  };
       }
    return null;
  }
  
  state = {
    counter : 0,
    val : this.props.val
  };

  increment = ()=>{
     this.setState({counter: this.state.counter +10},()=>{
       this.props.callBack(this.state.counter,this.props.val);
     })
  }
  
  decrement = ()=>{
     this.setState({counter: Math.max(this.state.counter-10, 0)},()=>{
       this.props.callBack(this.state.counter,this.props.val);
     })
  }
  
  render() {
    return (
      <div className={`box-${this.props.val}`}>
        <div className="box">
        <div className="is-size-1 has-text-centered	has-text-danger has-text-weight-bold" >{this.props.val}</div> 
        <div className="bet-val top-bet">{this.state.counter}</div> 
        <div className="container row columns" style={{'display': 'flex'}}> 
        <button className="button is-info column" onClick={this.increment}>+</button>
        <button className="button is-info column" onClick={this.decrement}>-</button>
        </div> 
        </div>     
      </div>
    );
  }
}

export default BetBox;
