import faker from 'faker'
import _ from 'lodash'
import React, { useContext, useState, useInput } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';
import CreateQuestionCard from "../components/CreateQuestionCard";
import "../App.css";
import { PromiseProvider } from 'mongoose';
import CreateQuestionList from '../components/CreateQuestionList';
import { QuestionContext } from '../components/QuestionContext';
import 'semantic-ui-css/semantic.min.css';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

function CreatePoll(props) {
    const history = useHistory();
    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        const input = <TextArea id="pollTitle" value={value} onChange={e => setValue(e.target.value)} type={type} placeholder='Write title here...' style={{margin: "20px 20px 0px 20px", marginLeft: "0px", height: "50px"}} />
        return [value, input];
    }
    const [title, titleInput] = useInput({ type: "text" });
    const [description, descriptionInput] = useInput({ type: "text" });
    //const [questions, setQuestions] = useContext(QuestionContext);
    
    const [questions, setQuestions] = useContext(QuestionContext);
    const { user } = useContext(AuthContext);
    const [pollData] = useState("");
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
    console.log(questions);
    console.log(user);
    const [createPollClicked] = useMutation(CREATE_POLL_MUTATION, {
        variables: {
            createPollInput: {
                title: title,
                description: description,
                createdBy: user ? user.email : "" ,
                active: true,
                questions: JSON.stringify(questions),
                email: user ? user.email  : ""
            }
        },
        onCompleted(data) {
            history.push('/analytics/' + data.createPoll.id);
            console.log(data);
        },
        onError(error) {
            console.log(error);
            return error;
        }
    });
    
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
                                {titleInput}
                                {/*<TextArea id="pollTitle" placeholder='Write title here...' style={{margin: "20px 20px 0px 20px", marginLeft: "0px", height: "50px"}} />*/}
                            </Form>

                            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "0px"}}>
                                Poll Description
                            </Header>
                            <Form style={{margin: "0px 20px"}}>
                                {/*<TextArea id="pollDescription" placeholder='Write description here...' style={{margin: "20px", marginLeft: "0px", height: "100px"}} />*/}
                                {descriptionInput}
                            </Form>
                            <p>&nbsp;</p>
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
                                <Button className="createPollButton" onClick={createPollClicked}>Create Poll</Button>
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

// mutation createPoll
// take in all poll data
// validate poll data
// create Poll object
// redirect user to poll analytics page? (show them a popup with link)

const CREATE_POLL_MUTATION = gql`
mutation createPoll($createPollInput: CreatePollInput){
  createPoll(
    createPollInput: $createPollInput
  ) {
    id
    title
    description
    createdBy
    active
    questions
  }
}
`



export default CreatePoll;