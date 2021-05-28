import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';

import "../App.css";

function PollAnalytics() {
    
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={8} style={{display: "inline-block"}}>
                        <Header as='h1' className="input" floated="left">
                            Poll Analytics
                        </Header>
                        <Header floated="left">
                            Poll
                        </Header>
                        <Header  floated="left">
                            Responses
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Button className="closePollButton" floated="right">Close Poll</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <p></p>
            <hr></hr>
        </>
    );
}



export default PollAnalytics;