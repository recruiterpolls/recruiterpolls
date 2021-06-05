import React, {useState, useContext} from 'react';
import CreateQuestionCard from "../components/CreateQuestionCard";
import { Grid, Header, Form, Radio, TextArea, Button, Dropdown, Card, Transition, Input } from 'semantic-ui-react';
import { QuestionContext } from '../components/QuestionContext';
function CreateQuestionList() {

    

    return (
        <Card.Group itemsPerRow={1}>
            {
                questions.map((question,id) =>  (
                    <CreateQuestionCard question={question} id={id}/>
                ))
            }
        </Card.Group>
    );
}

export default CreateQuestionList;