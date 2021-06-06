import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Radio, Button, Dropdown, Card, Transition, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import "../App.css";
import Chart from 'chart.js/auto';
import QuestionAnalyticsChart from '../components/QuestionAnalyticsChart';
import { Link } from 'react-router-dom';


function PollAnalytics() {
    const pathname = window.location.pathname;
    var result = /[^/]*$/.exec(pathname)[0];
    console.log(result);
    const { loading, error, data } = useQuery(GET_POLL, {
        variables: {
            id: result
        }
    });
    
    console.log(data);
    if (data == undefined) {
        return <></>
    }
    console.log(data);
    const questionsArray = JSON.parse(data.poll.questions)
    console.log(questionsArray);

    const responsesArray = data.poll.responses
    console.log(responsesArray);

    
    return(
        <>
            <Grid stackable>
                <Grid.Row >
                    <Grid.Column width={16}>
                        <div className="box" width="100% !important">
                            <div>
                                <Header as='h1' className="input" >
                                Poll Analytics
                                </Header>
                            </div>
                            <div>
                                <Header as='h2' style={{margin: "0px 10px 0px 30px"}} as={Link} to={"/analytics/" + result}>
                                Poll
                                </Header>
                            </div>
                            <div>
                                <Header as='h2'style={{margin: "0px 10px"}} as={Link} to={"/responses/" + result} >
                                Responses
                                </Header>
                            </div>
                            <Button className="closePollButton">Close Poll</Button>
                        </div>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
            
            <p></p>
            <hr></hr>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16}>
                        <Header as='h1' style={{textAlign: "center", marginTop: "10px"}}>
                            312 Responses
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>

                    </Grid.Column>
                    <Grid.Column width={12}>
                        { responsesArray.map( (response, index) => (
                        <Card fluid color='blue'>
                            <Grid>
                                <Grid.Column width={16}>
                                <Grid.Row style={{paddingBottom: "0px"}}>
                                    <Grid.Column width={16}>
                                        <div className="box"style={{justifyContent: "space-between"}}>
                                            <div>
                                                <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>Candidate {index + 1} - {response.name}</p>
                                            </div>
                                            <div  style={{padding: "6px 6px 0px 6px", margin: "0px"}}>
                                            <div style={{display: "flex", justifyItems:"center"}}>
                                        
                                                <Button color="blue">Contact candidate</Button>
                                                <Button color="blue">Add to watchlist</Button>
                                                <Button color="red">Send rejection</Button>
                                                <Button icon size="mini">
                                                    <Icon name='x'/>
                                                </Button>
                                            </div>
                                                
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                </Grid.Column>
                            </Grid>
                            <Grid>
                                <Grid.Column width={16} style={{maxWidth:"500px", margin: "0 auto"}}>
                                    { questionsArray.map( (question, index) => (
                                        <>
                                            <Header sub style={{paddingLeft: "12px"}}>Question 1</Header>
                                            <Header as='h3' style={{paddingLeft: "12px", marginTop: "0px", marginBottom: "0px",lineHeight:"24px"}}>
                                                {question.title}
                                            </Header>
                                            <Header as='h3'  style={{fontWeight:"200", paddingLeft: "12px", marginTop: "0px", paddingTop:"0px",lineHeight:"24px"}}>
                                                {response.responses[index]}
                                            </Header>
                                        </>
                                    ))
                                    }
                                    
                                    {/*<Header as='h3'  style={{fontWeight:"200", paddingLeft: "12px", marginTop: "0px", paddingTop:"0px", lineHeight:"24px"}}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </Header>*/}

                                    
                                </Grid.Column>
                                
                            </Grid>
                        </Card>
                        ))
                        }
                    </Grid.Column>
                    

                    <Grid.Column width={2}>

                    </Grid.Column>
                </Grid.Row>
                
            </Grid>
            
            
        </>
    );
}

const GET_POLL= gql`
query poll($id: String!){
    poll(id: $id) {
        questions
        responses {
            name
            email
            responses
        }
    }
}
`

export default PollAnalytics;