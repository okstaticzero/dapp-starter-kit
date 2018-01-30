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
            timestamp: "",
            loading: false
        }
    }
    componentDidMount = async () => {
        const account = this.props.match.params.id;
        this.setState({ account });
        console.log('account: ', account);

        const contractDetails = await getContractHash(account);
        console.log('hash: ', contractDetails[0]);
        this.retrieveIPFS(contractDetails)
    }
    retrieveIPFS = async (contractDetails) => {
        const ipfsHash = contractDetails[0];
        if (!ipfsHash) { return }
        const timestamp = contractDetails[1].c[0];
        console.log('time: ', timestamp);
        const details = await getJSON(ipfsHash);
        console.log('d: ', details);
        this.setState({ json: details, loading: false, timestamp })
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
        let contractDetails;
        try {
            contractDetails = await setContractHash(this.state.account, hash);
            console.log('contractDetails: ', contractDetails);
        } catch (error) {
            this.setState({ loading: false });
            alert("There was an error with the transaction, please check your gas settings.");
            return;
        }
        this.retrieveIPFS(contractDetails);
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
                <Col sm={5}>
                    {this.state.timestamp ?
                        <div>
                            <p>Data loaded from Blockchain / IPFS:</p>
                            <div className="b-chain-data">
                                <h3>About me: </h3>{this.state.json.about}
                                <h3>Github URL: </h3>{this.state.json.github}
                                <h3>Website: </h3>{this.state.json.website}
                            </div>
                            <br /><br />
                            <p>Transaction details: {this.state.account}</p>
                            <p>Block saved at: {this.state.timestamp}</p>
                        </div>
                        :
                        <h4>No record found. Please enter and submit data on the left</h4>
                    }
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
