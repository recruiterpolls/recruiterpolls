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
    const questionsArray = JSON.parse(data.poll.questions)
    console.log(questionsArray);

    
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
                        <Header as='h1' style={{textAlign: "center", color: "grey", marginTop:"10px"}}>
                            title
                        </Header>
                        <Header as='h1' style={{textAlign: "center", marginTop: "0px"}}>
                            {data.poll.title}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                    <Card.Group itemsPerRow={1}>
                    { questionsArray.map( (question, index) => (
                        <Card fluid color='blue'>
                            <Grid stackable>
                                <Grid.Row style={{paddingBottom: "0px"}}>
                                    <Grid.Column width={16}>
                                        <div className="box"style={{justifyContent: "space-between"}}>
                                            <div>
                                                <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>Question {index + 1}</p>
                                            </div>
                                            <div  style={{padding: "6px 6px 0px 6px", margin: "0px"}}>
                                                <Button icon size="mini">
                                                    <Icon name='edit' />
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{paddingTop: "0px"}}>
                                    
                                    <Grid.Column width={6}>
                                        
                                        <div className="demowrapper">
                                            <div>
                                                <QuestionAnalyticsChart question={question} index={index}></QuestionAnalyticsChart>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={10} style={{paddingTop: "10px"}}>
                                    <div>
                                        
                                        <Header as="h2" style={{margin: "0px", padding: "0px 0px 5px 0px"}}>{question.title} </Header>
                                    </div>
                                    <div>
                                        
                                        <Header as="h4" style={{margin: "0px", padding: "0px 0px 5px 0px"}}>{question.description}</Header>
                                        <Header sub style={{margin: "10px 0px 0px 0px", padding: "0px 0px 5px 0px"}}>Options</Header>
                                    </div>
                                    
                                    <div className="box">
                                        <Header sub style={{fontSize: "14px",margin: "auto 10px auto 0px", marginRight: "10px !important"}}>1 </Header>
                                        <Header as="h3" style = {{margin: "auto 0px", fontSize: "20px"}}>
                                            {question.options[0]}
                                        </Header>
                                    </div>

                                    <div className="box">
                                        <Header sub style={{fontSize: "14px",margin: "auto 10px auto 0px", marginRight: "10px !important"}}>2 </Header>
                                        <Header as="h3" style = {{margin: "auto 0px", fontSize: "20px"}}>
                                            {question.options[1]}
                                        </Header>
                                    </div>

                                    <div className="box">
                                        <Header sub style={{fontSize: "14px",margin: "auto 10px auto 0px", marginRight: "10px !important"}}>3 </Header>
                                        <Header as="h3" style = {{margin: "auto 0px", fontSize: "20px"}}>
                                            {question.options[2]}
                                        </Header>
                                    </div>

                                    <div className="box">
                                        <Header sub style={{fontSize: "14px",margin: "auto 10px auto 0px", marginRight: "10px !important"}}>4 </Header>
                                        <Header as="h3" style = {{margin: "auto 0px", fontSize: "20px"}}>
                                            {question.options[3]}
                                        </Header>
                                    </div>
                                    

                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card>
                    )
                    )

                    }
                    </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
            
        </>
    );
}

const GET_POLL = gql`
query poll($id: String!){
    poll(id: $id) {
        title
    	description
        questions
    }
}
`

export default PollAnalytics;