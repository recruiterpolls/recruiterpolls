import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';

import "../App.css";

function MyPolls() {
    const filterOptions = [
        { 
            key: 'ASDF',
            text: 'ASDF',
            value: 'ASDF'
        }
    ]
    
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={8}>
                        <Header as='h1' className="input" floated="left">
                            My Polls
                        </Header>

                        <Button className="createPollButton" floated="left">Create Poll</Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Dropdown placeholder='Filter by...' className="others" search selection options={filterOptions} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            
            <hr></hr> 
            <p></p>
            <Grid columns={3} style={{margin: '0 auto'}}>
                
                <Grid.Row>

                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>WSU Sophomores Summer 2020</Card.Header>
                                <Card.Meta>3 days ago</Card.Meta>
                                <Card.Description>
                                Matthew is a pianist living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>WSU Sophomores Summer 2020</Card.Header>
                                <Card.Meta>3 days ago</Card.Meta>
                                <Card.Description>
                                Matthew is a pianist living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>WSU Sophomores Summer 2020</Card.Header>
                                <Card.Meta>3 days ago</Card.Meta>
                                <Card.Description>
                                Matthew is a pianist living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
        </>
    );
}



export default MyPolls;