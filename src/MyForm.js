import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setJSON, getJSON } from './util/IPFS.js'
import FormElements from "./FormElements"
import { Col } from 'react-bootstrap';
import Loader from "./Loader"
import { setContractHash, getContractHash } from './services/DetailsService';

export class MyForm extends Component {
    constructor() {
        super();
        this.state = {
            about: "",
            github: "",
            website: "",
            account: "",
            json: "",
            loading: false
        }
    }
    componentDidMount = async () => {
        const account = this.props.match.params.id;
        this.setState({ account });
        console.log('account: ', account);

        const IPFShash = await getContractHash(account);
        console.log('hash: ', IPFShash);
        this.retrieveIPFS(IPFShash)
    }
    retrieveIPFS = async (ipfsHash) => {
        if (!ipfsHash) { return }
        const details = await getJSON(ipfsHash);
        console.log('d: ', details);
        this.setState({ json: JSON.stringify(details), loading: false })
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
        this.setState({ loading: true });
        const timeStamp = Math.floor(Date.now());
        const { about, github, website } = this.state;
        const hash = await setJSON({ about, github, website });
        console.log('IPFS Hash: ', hash);
        try {
            const contractDetails = await setContractHash(this.state.account, hash);
            console.log('contractDetails: ', contractDetails);
        } catch (error) {
            this.setState({ loading: false });
            alert("There was an error with the transaction, please check your gas settings.");
            return;
        }

        this.retrieveIPFS(hash);
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
                    {this.state.json}
                </Col>
                {this.state.loading &&
                    <Loader />
                }
            </div >
        )
    }
}

MyForm.propTypes = {

}

export default MyForm
