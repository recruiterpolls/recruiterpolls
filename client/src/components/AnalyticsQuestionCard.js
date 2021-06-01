import React, { useContext, setState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Label, Radio, TextArea, Button, Dropdown, Card, Checkbox, Transition, Input } from 'semantic-ui-react';
import { QuestionContext } from '../components/QuestionContext';


import "../App.css";

function AnalyticsQuestionCard({id, question: {title, description, questionType, required, options}}) {
    //console.log(id)
    const [questions, setQuestions] = useContext(QuestionContext);
    const state = {};

    return (
        <>
        <Card fluid color='green'>
        <Grid>
        <Grid.Row>
            <Grid.Column width={6}>
                
                
            </Grid.Column>
            <Grid.Column width={6} style={{margin: "0px", padding: "0px"}}>
                <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>Question {id + 1}</p>
                <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "0px", marginTop: "10px", paddingBottom: "00px"}}>
                    Title
                </Header>

                <Header as="h4" style={{padding: "0px 20px 0px 20px", marginBottom: "0px", marginTop: "10px"}}>
                    Description (Optional)
                </Header>
            </Grid.Column>
        </Grid.Row>
            <Grid.Row>
            <Grid.Column width={16}>
            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "10px"}}>
                Poll options
            </Header>
            <Form  style={{margin: "0px 20px", width: "100%"}}>
                
                {
                        options.map((option, index) => (
                            <div className="box">
                                <Radio
                                    name='radioGroup'
                                    value={id}
                                    style = {{marginRight: "10px"}}
                                />
                                <p
                                    id={"optionsInputChange" + id}
                                    onChange={handleOptionChange}
                                    name='options'
                                    placeholder="Write option here..."
                                    defaultValue={option.trim() === '' ? '' : option}
                                    style = {{width: "80%", marginRight: "10px"}}
                                    data-index={index}
                                    data-ID={id}
                                />
                                <Button icon='delete' />
                            </div>
                        ))
                }
                
            </Form>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </Card>
        </>
    );
}

export default CreateQuestionCard;