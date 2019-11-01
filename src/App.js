import React, { Component } from 'react';
import './App.css';
import BetBox from './components/BetBox';

class App extends Component {
  beginNo = Math.ceil(Math.random() * 10);
  boxObj = {};

  state = {
    randomNo: null,
    earned: 0,
    showProgress: false,
  };

  spin = () => {
    if (this.state.randomNo) {
      document.querySelector(`.box-${this.state.randomNo}`).classList.remove('selected');
    }

    setTimeout(() => {
      const max = this.beginNo + 2;
      const min = this.beginNo;
      const randomNo = Math.ceil(Math.floor(Math.random() * (max - min + 1)) + min);
      let earned = this.state.earned;
      Object.keys(this.boxObj).forEach(key => {
        console.log(this.boxObj, key, randomNo, earned);

        if (key === randomNo) {
          earned += this.boxObj[key] * 10;
        } else {
          earned -= this.boxObj[key] * 10;
        }
      });
      this.setState({ randomNo, earned, showProgress: !this.state.showProgress });
      document.querySelector(`.box-${randomNo}`).classList.add('selected');
    }, 1000);

    this.setState({ showProgress: !this.state.showProgress });
  };

  reset = () => {
    this.beginNo = Math.ceil(Math.random() * 10);
    this.boxObj = {};
    this.setState({ randomNo: null });
  };

  boxCallBack = (counter, val) => {
    this.boxObj[val] = counter;
  };

  render() {
    const begin = this.beginNo;

    return (
      <div className="container">
        <div className="hero">
          <div className="hero-body">
            <h1 className="title">Try your Luck!!!!!</h1>
            <span>
              Bet against me, bet on any of the 3 no's by clicking <b>+/-</b>, then click <i>Try my luck</i>, to see if
              you can win some money 😁!
            </span>{' '}
            <br></br>
            <br></br>
            {this.state.showProgress ? (
              <progress className="progress is-small is-primary" max="100">
                15%
              </progress>
            ) : (
              <div className="dummy-prg" />
            )}
            <br></br>
            <br></br>
            <div className="box-container">
              <BetBox val={begin} callBack={this.boxCallBack} />
              <BetBox val={begin + 1} callBack={this.boxCallBack} />
              <BetBox val={begin + 2} callBack={this.boxCallBack} />
            </div>
            <br></br>
            <br></br>
            {this.state.randomNo && !this.state.showProgress && (
              <h1 className="subtitle">
                Current no{' '}
                <button className="button is-outlined">
                  <b>{this.state.randomNo}</b>
                </button>
                <br></br>
                <br></br>
                {this.state.earned > 0 ? (
                  <span>
                    You won money{' '}
                    <button className="button is-success is-outlined">
                      <b>{this.state.earned}$</b>
                    </button>
                  </span>
                ) : this.state.earned === 0 ? (
                  <b>Try again, you won nothing!</b>
                ) : (
                  <span>
                    You owe me{' '}
                    <button className="button is-danger is-outlined">
                      <b>{this.state.earned}$</b>
                    </button>
                  </span>
                )}
              </h1>
            )}
          </div>
        </div>

        <div className="row container">
          <button className="button is-danger" onClick={this.reset}>
            Reset
          </button>
          &nbsp;&nbsp;
          <button className="button is-link" onClick={this.spin}>
            Try my luck
          </button>
        </div>

        {this.state.earned <= -200 && (
          <div className="container has-text-danger is-size-5">You are taking a little risk here!</div>
        )}
        {this.state.earned <= -500 && (
          <div className=" container has-text-danger is-size-5">you should quit & pay my debt!</div>
        )}
        {this.state.earned <= -1000 && (
          <div className="container has-text-danger is-size-5">
            You are dead mate, either quit or am coming for you!
          </div>
        )}

        <div className="row container">
          Money earned till now,{' '}
          <b>
            <span className={this.state.earned < 0 ? 'has-text-danger is-size-2' : 'has-text-success is-size-2'}>
              {this.state.earned}$
            </span>
          </b>
        </div>
      </div>
    );
  }
}

export default App;
