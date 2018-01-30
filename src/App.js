import React, { Component } from 'react';
import './App.css';
import MyForm from './MyForm';
import Login from './Login';
import { Route, Redirect, withRouter } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", avatar: "" }
  }
  setIdentity = (account, name, avatar) => {
    this.setState({ name, avatar })
    //
    this.props.history.push(`/details/${account}`)
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Full Stack Ethereum DApp using uPort and IPFS</h1>
          {this.state.avatar &&
            <img className="avatar" src={this.state.avatar} />
          }
        </header>
        <Route exact path="/" render={() => (
          <Login setIdentity={this.setIdentity} />
        )} />
        <Route path="/details/:id" component={MyForm} />
      </div>
    );
  }
}

export default withRouter(App);
