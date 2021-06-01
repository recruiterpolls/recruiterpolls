import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';
import "../App.css";

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
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16}>
                        <div className="box" width="100% !important">
                            <div>
                                <Header as='h1' className="input">
                                Poll Analytics
                                </Header>
                            </div>
                            <div>
                                <Header as='h2' style={{margin: "0px 10px 0px 30px"}}>
                                Poll
                                </Header>
                            </div>
                            <div>
                                <Header as='h2'style={{margin: "0px 10px"}}>
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
                        <Card fluid color='green'>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                    <p>TITLE: {question.title}</p>
                                    <p>DESCRIPTION: {question.description}</p>

                                    
                                    <p>OPTION 1: {question.options[0]}</p>
                                    <p>OPTION 2: {question.options[1]}</p>
                                    <p>OPTION 3: {question.options[2]}</p>
                                    <p>OPTION 4 :{question.options[3]}</p>

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