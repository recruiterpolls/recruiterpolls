import faker from 'faker'
import _ from 'lodash'
import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';
import gql from 'graphql-tag';

import {AuthContext} from '../context/auth';
import { useForm } from '../util/hooks';

import "../App.css";

function RegisterPage(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
        registerInput:values
    }
  });

  function registerUser() {
    addUser();
  }
    return(
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={16} style={{textAlign: "center"}}>
                        <Header as="h1">
                            Register
                        </Header>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
            <hr></hr>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <Form.Field>
                <Input 
                label="Email"
                placeholder="Email.."
                name="email"
                type="text"
                value={values.email}
                error={errors.email ? true : false}
                onChange={onChange}
                />
                </Form.Field>
                <Form.Field>
                <Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="text"
                    values={values.password}
                    error={errors.password ? true: false}
                    onChange={onChange}
                />
                </Form.Field>
                <Form.Field>
                <Input 
                label="ConfirmPassword"
                placeholder="ConfirmPassword.."
                name="confirmPassword"
                type="text"
                value = {values.confirmPassword}
                error={errors.confirmPassword ? true: false}
                onChange={onChange}

                />
                </Form.Field>
            
            <Button color="blue" type = "submit">
                Register
            </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
        </>
    );
}

/*
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



*/



const REGISTER_USER = gql`
  mutation register($registerInput:RegisterInput) {
    register(
        registerInput:$registerInput
    ) {
        id
        token
    	email
    	createdAt
    	password
    }
  }
`;




export default RegisterPage;