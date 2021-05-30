import faker from 'faker'
import _ from 'lodash'
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';
import CreateQuestionCard from "../components/CreateQuestionCard";
import "../App.css";
import { PromiseProvider } from 'mongoose';
import CreateQuestionList from '../components/CreateQuestionList';
import { QuestionContext } from '../components/QuestionContext';
import 'semantic-ui-css/semantic.min.css';

function CreatePoll(props) {
    
    //const [questions, setQuestions] = useContext(QuestionContext);
    const [questions, setQuestions] = useContext(QuestionContext);
    const addQuestion = (e) => {
        e.preventDefault();
        setQuestions(prevQuestions => [...prevQuestions, {
            title: "",
            description: "",
            questionType: "",
            required: true,
            options: ["", "", "", ""]
        }])
    }

    const refreshQuestions = (e) => {
        setQuestions([...questions], questions);
    }

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
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                    <Card.Group itemsPerRow={1}>
                        
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
                        
                    </Card.Group>

                    
                    <CreateQuestionList></CreateQuestionList>
                    

                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button onClick={addQuestion}>Add another question</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button className="createPollButton">Create Poll</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
            
        </>
    );
}

// resolver createPoll
// take in all poll data
// validate poll data
// create Poll object
// redirect user to poll analytics page? (show them a popup with link)



export default CreatePoll;