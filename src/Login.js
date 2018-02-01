import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col } from 'react-bootstrap';
import { initAccount } from "./util/Uport";

export class Login extends Component {
    handleLogin = async (e) => {
        e.preventDefault();
        console.log('GO');
        const identity = await initAccount();
        console.log('Identity: ', identity);
        //identity passed back from uPort
        this.props.setIdentity(identity.userAccount, identity.user.name, identity.user.avatar.uri)
    }
    render() {
        return (

            <Col smOffset={3} sm={6} className="login">
                <p className="text-large">This App uses uPort for identity verification and authentication on the Blockchain.
                    Download the uPort app on your mobile phone to create your identity.
                <a href="https://www.uport.me/" rel="noopener noreferrer" target="_blank"> https://www.uport.me/</a>
                </p>
                <br />

                <Button onClick={this.handleLogin}>Login with uPort</Button>

            </Col >

        )
    }
}

Login.propTypes = {

}

export default Login
