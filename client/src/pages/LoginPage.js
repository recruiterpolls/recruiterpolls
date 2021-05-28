import faker from 'faker'
import _ from 'lodash'
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';

import "../App.css";

function LoginPage() {
    
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16} style={{textAlign: "center"}}>
                        <Header as="h1">
                            Login
                        </Header>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
            <hr></hr>
            <Form>
                        <Form.Field>
                        <Input label="Email"></Input>
                        </Form.Field>
                    </Form>
                    
                    <Form>
                        <Form.Field>
                        <Input label="Password"></Input>
                        </Form.Field>
                    </Form>
            <Button color="blue">Login</Button>
        </>
    );
}



export default LoginPage;