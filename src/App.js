import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { initAccount } from "./util/Uport";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: "", avatar: "", specificNetworkAddress: "" }
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const identity = await initAccount();
    this.setState({
      specificNetworkAddress: identity.specificNetworkAddress,
      userName: identity.user.name,
      avatar: identity.user.avatar.uri
    })
  }

  handleLogout = async (e) => {
    e.preventDefault();
    this.setState({ userName: "", avatar: "" })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Full Stack Ethereum DApp using uPort and IPFS</h1>
          {this.state.avatar &&
            <React.Fragment>
              <div className="avatar">
                <div>
                  <p>{this.state.userName}</p>
                  <a href="#" onClick={this.handleLogout} className="logout">Logout</a>
                </div>
                <img src={this.state.avatar} alt="avatar" />
              </div>
            </React.Fragment>
          }
        </header>

        <Grid>
          <Row className="grid-row">
            {this.state.userName ? (
              <Dashboard specificNetworkAddress={this.state.specificNetworkAddress} />
            ) : (
                <Col sm={6} smOffset={3} className="login">
                  <p className="text-large">This App uses uPort for identity verification and authentication on the Blockchain.
                      Download the uPort app on your mobile phone to create your identity.
              <a href="https://www.uport.me/" rel="noopener noreferrer" target="_blank"> https://www.uport.me/</a>
                  </p>
                  <Button onClick={this.handleLogin}>Login with uPort</Button>
                </Col >
              )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;