import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setJSON, getJSON } from './util/IPFS.js'
import FormElements from "./FormElements"
import { Col } from 'react-bootstrap';
import Loader from "./Loader"
import { setContractHash, getContractHash } from './services/DetailsService';
import { Button } from 'react-bootstrap';
import { attestCredentials } from "./util/Uport";

export class MyForm extends Component {
    constructor() {
        super();
        this.state = {
            about: "",
            github: "",
            website: "",
            ipfsData: "",
            timestamp: "",
            loading: false
        }
    }
    componentDidMount = async () => {
        this.fetchData()
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { about, github, website } = this.state;
        const hash = await setJSON({ about, github, website });
        try {
            await setContractHash(this.props.match.params.id, hash);
        } catch (error) {
            this.setState({ loading: false });
            alert("There was an error with the transaction, please check your gas settings.");
            return;
        }
        this.fetchData();
    }
    fetchData = async () => {
        console.log('this.state.account: ', this.state.account);
        const contractDetails = await getContractHash(this.props.match.params.id);
        console.log('contractDetails: ', contractDetails);

        const ipfsHash = contractDetails[0];
        console.log('XXXX: ', ipfsHash);

        if (!ipfsHash) { return }
        const timestamp = contractDetails[1].c[0];
        console.log('timestamp: ', );

        const details = await getJSON(ipfsHash);
        this.setState({ ipfsData: details, loading: false, timestamp })
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
    doAttest = () => {
        alert("attest")
        attestCredentials('0x2ea515279f0be339a8a1da338ccee8ec56b678e1');
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
                    <div>
                        <Button onClick={this.doAttest}>Attest</Button>
                        {this.state.timestamp ?
                            <div>
                                <p>Data loaded from Ethereum / IPFS: <br />Time saved to block: {new Date(Number(this.state.timestamp + "000")).toUTCString()}</p>
                                <div className="b-chain-data">
                                    <h3>About me: </h3>{this.state.ipfsData.about}
                                    <h3>Github URL: </h3>{this.state.ipfsData.github}
                                    <h3>Website: </h3>{this.state.ipfsData.website}
                                </div>

                            </div>
                            :
                            <h4>No record found. Please enter and submit data on the left</h4>
                        }
                    </div>
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
