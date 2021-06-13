import faker from 'faker'
import _, { trim } from 'lodash'
import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Header, Radio, Button, Dropdown, Card, Transition, Icon, Checkbox, Input, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import "../App.css";
import Chart from 'chart.js/auto';
import QuestionAnalyticsChart from '../components/QuestionAnalyticsChart';
import { Link, useHistory } from 'react-router-dom';


function PollAnalytics() {
    const history = useHistory();
    const pathname = window.location.pathname;
    var result = /[^/]*$/.exec(pathname)[0];
    var [responses, setResponses] = useState([]);
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [email, setEmail] = useState("");

    const { loading, error, data } = useQuery(GET_POLL, {
        variables: {
            id: result
        }
    });
    var errorCount = 0;
    const [createPollClicked] = useMutation(CREATE_POLL_RESPONSE, {
        variables: {
            id: result,
            name: firstName + " " + lastName,
            email: email,
            responses: [...responses],
            checkedArray:checkedArray
        },
        onCompleted(){
            console.log(responses);
        },
        onError(error) {

            // Handles bug where first button click results in error (regardless of anything else)
            console.log(JSON.stringify(error, null, 2));
            console.log(responses);

            
            return error;
        }
    });
    console.log(errorCount);
    var [checkedArray, setCheckedArray] = useState([]);
    for (var i =0; i < 100; i++) {
        checkedArray.push([false,false,false,false,false,false,false,false,false,false,false,false,false,false]);
    }
    
    console.log(data);
    if (data == undefined) {
        return <></>
    }
    const questionsArray = data.poll.questions;
    console.log(questionsArray);



    const submitPollResponse = (e) => {
        var tempResponses = [];
        var tempChecked = [];
        for (var i = 0; i < questionsArray.length; i++) {
            var tempStr = "";
            var tempCheckedString = "";
            var options = document.getElementsByClassName("questionGroup" + i);
            for (var x = 0; x < options.length; x++) {
                console.log(options[x]);

                if (options[x].className.split(' ').includes("checked")) {
                    tempStr += options[x].getElementsByTagName("input")[0].getAttribute("value").trim() + ", ";
                    tempCheckedString += x.toString() + ",";
                }
            }
            tempStr = tempStr.slice(0, -2);
            tempCheckedString = tempCheckedString.slice(0, -2);             //could slice off more characters than we think.
            tempResponses.push(tempStr);
        }
        console.log(tempResponses);
        //responses = JSON.parse(JSON.stringify(tempResponses));
        
        console.log(tempResponses);
        setResponses(tempResponses);
        responses = tempResponses;
        console.log(responses);
        createPollClicked();
    }
    const handleChange = (e, { value }) => this.setState(value)
    /*const handleRadioClick = (e, index) => {
        console.log(e);
        console.log(index);
        var classNameList = e.target.offsetParent.className;
        console.log(classNameList);
        classNameList = classNameList.split(' ');
        if(classNameList.includes("sixteen")) {
            
            return;
        }
        console.log(classNameList);
        classNameList = classNameList[classNameList.length -1]
        //console.log(classNameList);
        var radioButtons = document.getElementsByClassName(classNameList);
        const questionIdx = classNameList.slice(classNameList.length -1, classNameList.length);
    
        for(var i =0; i < radioButtons.length; i++) {
            if(i != index) {
                checkedArray[questionIdx][i] = false;
            } else {
                checkedArray[questionIdx][i] = true;
            }
        }
        
    }*/
    
    const RadioInput = ({label, value, checked, setter}) => {
        return (
          <label>
            <input type="radio" checked={checked == value}
                   onChange={() => setter(value)} />
            <span>{label}</span>
          </label>
        );
    };
    
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16} style={{maxWidth: "600px", margin: "0 auto"}}>
                        <Header as='h1' style={{textAlign: "center", marginTop: "0px"}}>
                            {data.poll.title}
                        </Header>
                        <Header as='h2' style={{fontWeight: "200",textAlign: "center", marginTop: "0px"}}>
                            {data.poll.description}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    
                    <Grid.Column width={16} style={{maxWidth:"700px",margin:"0 auto"}}>
                    <Card.Group itemsPerRow={1}>
                    <Card fluid color='blue'>
                        <Grid stackable>
                            <Grid.Row style={{paddingTop: "0px", padding: "12px"}}>
                                <Grid.Column width={16} style={{paddingTop: "0px"}}>
                                    <div>
                                        <Header as="h2" style={{margin: "0px", padding: "10px 0px 5px 0px"}}>Welcome to RecruiterPolls!</Header>
                                    </div>
                                    <div>
                                        <Header as="h4" style={{margin: "0px", padding: "0px 0px 5px 0px", maxWidth:"400px", textAlign: "justify"}}>RecruiterPolls keeps all personal information private and secure. Your information below allows recruiters to contact you for further steps in the process.</Header>
                                    </div>
                                    <div style={{paddingTop: "10px", paddingBottom:"10px"}}>
                                        <Header as="h3" style={{margin: "0px", padding: "0px 0px 5px 0px", maxWidth:"500px", textAlign: "justify"}}>First Name</Header>
                                        <Form>
                                            <Form.Field style={{width: "300px"}}>
                                                <input id="pollNameFirst" onChange={(e) => setFirstName(e.target.value)}></input>
                                            </Form.Field>
                                        </Form>
                                    </div>
                                    <div style={{paddingBottom:"10px"}}>
                                        <Header as="h3" style={{margin: "0px", padding: "0px 0px 5px 0px", maxWidth:"500px", textAlign: "justify"}}>Last Name</Header>
                                        <Form>
                                            <Form.Field style={{width: "300px"}}>
                                                <input id="pollNameLast" onChange={(e) => setLastName(e.target.value)}></input>
                                            </Form.Field>
                                        </Form>
                                    </div>
                                    <div style={{paddingBottom:"10px"}}>
                                        <Header as="h3" style={{margin: "0px", padding: "0px 0px 5px 0px", maxWidth:"500px", textAlign: "justify"}}>Email Address</Header>
                                        <Form>
                                            <Form.Field style={{width: "300px"}}>
                                                <input id="pollEmail" onChange={(e) => setEmail(e.target.value)}></input>
                                            </Form.Field>
                                        </Form>
                                    </div>
                                </Grid.Column>
                            </ Grid.Row>
                        </Grid>
                    </Card>
                    { questionsArray.map( (question, questionIndex) => (
                        <Card fluid color='blue'>
                            <Grid stackable>
                                <Grid.Row style={{paddingBottom: "0px"}}>
                                    <Grid.Column width={16}>
                                        <div className="box"style={{justifyContent: "space-between"}}>
                                            <div>
                                                <p style={{padding: "12px 12px 0px 12px", margin: "0px"}}>Question {questionIndex + 1}</p>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{paddingTop: "0px", padding: "12px"}}>
                                    
                                    
                                    <Grid.Column width={16} style={{paddingTop: "0px"}}>
                                    <div >
                                        <Header as="h2" style={{margin: "0px", padding: "0px 0px 5px 0px"}}>{question.title} </Header>
                                    </div>
                                    <div>
                                        <Header as="h4" style={{margin: "0px", padding: "0px 0px 5px 0px", maxWidth:"400px", textAlign: "justify"}}>{question.description}</Header>
                                    </div>
                                    {question.options.map( (option, index) => (
                                        <div className="box">
                                            <div>
                                                <Checkbox
                                                    className={'questionGroup' + questionIndex}
                                                    value={question.options[index]}
                                                    style = {{marginRight: "10px"}}
                                                />
                                            </div>
                                            <div>
                                                <Header as="h3" style = {{margin: "auto 10px", fontSize: "18px", paddingBottom:"6px"}}>
                                                    {question.options[index]}
                                                </Header>
                                            </div>
                                        </div>
                                    ))}
                                    

                                    <div style={{paddingBottom:"12px"}}></div>
                                    
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card>
                    )
                    )

                    }
                    </Card.Group>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Button className="createPollButton" onClick={submitPollResponse}>Submit</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </>
    );
}

const CREATE_POLL_RESPONSE = gql`
mutation createPollResponse($id: String $name: String $email: String $responses: [String]) {
  createPollResponse(
    id: $id
    name: $name
    email: $email
    responses: $responses
    checkedArray: $checkedArray
  ) {
    name
    email
  }
}    
`

const GET_POLL = gql`
query poll($id: String!){
    poll(id: $id) {
        title
    	description
        questions {
            title,
            description,
            questionType,
            required,
            options
            
        }
    }
}
`

/*
title: String
    description: String
    questionType: String
    required: Boolean
    options: [String]
*/


export default PollAnalytics;