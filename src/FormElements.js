import React from 'react';
import { Form, FormGroup, Button, ControlLabel, FormControl, Col } from 'react-bootstrap';

const FormElements = ({ github, about, website, handleAbout, handleGit, handleWebsite, handleSubmit }) => {
    return (
        <Form horizontal onSubmit={handleSubmit}>

            <FormGroup controlId="formHorizontalEmail">
                <Col smOffset={4} sm={5}><h4>Enter Details:</h4><br /></Col>
                <Col componentClass={ControlLabel} sm={4}>
                    About Me:</Col>
                <Col sm={5}>
                    <FormControl componentClass="textarea" type="text" rows="3" placeholder="About Me"
                        value={about}
                        onChange={handleAbout} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                    GitHub URL:</Col>
                <Col sm={5}>
                    <FormControl type="text" placeholder="GitHubURL"
                        value={github}
                        onChange={handleGit} />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={4}>
                    Website:</Col>
                <Col sm={5}>
                    <FormControl type="text" placeholder="Website"
                        value={website}
                        onChange={handleWebsite} />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={4} sm={9}>
                    <Button type="submit">Update Details</Button>
                </Col>
            </FormGroup>
        </Form>
    );
};

export default FormElements;