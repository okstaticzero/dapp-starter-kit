import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setJSON } from './util/IPFS.js'
import FormElements from "./FormElements"
import { Col } from 'react-bootstrap';
import { setContractHash, getContractHash } from './services/DetailsService';

export class MyForm extends Component {
    constructor() {
        super();
        this.state = { about: "", github: "", website: "", account: "" }
    }
    componentDidMount = async () => {
        const account = this.props.match.params.id;
        this.setState({ account });
        console.log('yo');

        const hash = await getContractHash(account);
        console.log('hash: ', hash);

    }


    handleAbout = (e) => {
        this.setState({ about: e.target.value });
    }
    handleGit = (e) => {
        this.setState({ github: e.target.value });
    }
    handleWebsite = (e) => {
        this.setState({ website: e.target.value });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const timeStamp = Math.floor(Date.now());
        const { about, github, website } = this.state;
        const hash = await setJSON({ about, github, website });
        console.log('IPFS Hash: ', hash);
        const contractHash = setContractHash(this.state.account, hash);
    }
    render() {
        const { about, github, website } = this.state;
        return (
            <div className="my-form">
                <Col sm={6}>
                    <FormElements
                        about={about}
                        github={github}
                        website={website}
                        handleAbout={this.handleAbout}
                        handleGit={this.handleGit}
                        handleWebsite={this.handleWebsite}
                        handleSubmit={this.handleSubmit} />
                </Col>
                <Col sm={6}>
                    <h4>Details for: {this.state.account}</h4>
                </Col>
            </div >
        )
    }
}

MyForm.propTypes = {

}

export default MyForm
