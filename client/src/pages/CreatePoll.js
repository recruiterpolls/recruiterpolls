import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';

import "../App.css";

function CreatePoll() {
    
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16} style={{textAlign: "center"}}>
                        <Header as="h1">
                            Create Poll
                        </Header>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
            <hr></hr>
            <p></p>
            <Grid>
                <Grid.Row >
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                    <Card.Group>
                        <Card fluid color='green'>
                            <Header as="h3" style={{padding: "20px 20px 0px 20px", marginBottom: "0px"}}>
                                Poll Title
                            </Header>
                            <Form  style={{margin: "0px 20px"}}>
                                <TextArea placeholder='Write title here...' style={{margin: "20px 20px 0px 20px", marginLeft: "0px", height: "50px"}} />
                            </Form>

                            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "0px"}}>
                                Poll Description
                            </Header>
                            <Form style={{margin: "0px 20px"}}>
                                <TextArea placeholder='Write description here...' style={{margin: "20px", marginLeft: "0px", height: "100px"}} />
                            </Form>
                        </Card>

                        <Card fluid color='green'>
                            <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>Question 1</p>
                            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "0px", marginTop: "10px"}}>
                                Question Title
                            </Header>
                            <Form  style={{margin: "0px 20px"}}>
                                <TextArea placeholder='Write title here...' style={{margin: "20px 20px 0px 20px", marginLeft: "0px", height: "50px"}} />
                            </Form>

                            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "10px"}}>
                                Poll options
                            </Header>
                            <Form style={{margin: "0px 20px"}}>
                                <Form.Field style={{padding: "0px", margin: "0px"}}>
                                    <Input
                                            
                                        name='radioGroup'
                                        value='Option One'
                                    />
                                </Form.Field>
                                <Form.Field style={{padding: "0px", margin: "0px"}}>
                                    <Input
                                            
                                        name='radioGroup'
                                        value='Option Two'
                                    />
                                </Form.Field>
                                <Form.Field style={{padding: "0px", margin: "0px"}}>
                                    <Input
                                            
                                        name='radioGroup'
                                        value='Option Three'
                                    />
                                </Form.Field>
                                <Form.Field style={{padding: "0px", margin: "0px"}}>
                                    <Input
                                            
                                        name='radioGroup'
                                        value='Option Four'
                                    />
                                </Form.Field>
                            </Form>
                        </Card>
                    </Card.Group>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button className="createPollButton">Create Poll</Button>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
}



export default CreatePoll;