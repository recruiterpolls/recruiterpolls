import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';

import "../App.css";
import { buildQueryFromSelectionSet } from '@apollo/client/utilities';
import PollCard from '../components/PollCard';

function MyPolls() {
    const filterOptions = [
        { 
            key: 'ASDF',
            text: 'ASDF',
            value: 'ASDF'
        }
    ]
    const polls = [
        {
            id: "1",
            title: "Post one",
        },
        {
            id: "2",
            title: "Post two",
        },
        {
            id: "3",
            title: "Post three",
        },
        {
            id: "4",
            title: "Post four",
        },
        {
            id: "5",
            title: "Post five",
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
                
                    <Transition.Group duration={200}>
                        {
                            polls && polls.map((poll) => (
                                <Grid.Column key={poll.id} style={{marginBottom: '20px'}}>
                                    <PollCard poll={poll} />
                                </Grid.Column>
                            ))
                        }
                    </Transition.Group>
                    
                
                </Grid.Row>
                    
            </Grid>
        </>
    );
}



export default MyPolls;






