import faker from 'faker'
import _ from 'lodash'
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import "../App.css";

function LoginPage(props) {
    const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables:{
        loginInput:values
    }
  });

  function loginUserCallback() {
    loginUser();
  }
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
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                        <Form.Field>
                        <Input 
                        label="Email"
                        placeholder ="Email.."
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
                        type="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                        />
                        </Form.Field>
                  
            <Button color="blue" type = "submit" >Login</Button>
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

const LOGIN_USER = gql`
  mutation login($loginInput:LoginInput) {
    login(
        loginInput:$loginInput
    ) {
        id
    	token
    	email
        createdAt
    	password
    }
  }
`;



export default LoginPage;