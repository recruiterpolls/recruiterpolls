import React, { useContext, setState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Form, Label, Radio, TextArea, Button, Dropdown, Card, Checkbox, Transition, Input } from 'semantic-ui-react';
import { QuestionContext } from '../components/QuestionContext';


import "../App.css";

function CreateQuestionCard({id, question: {title, description, questionType, required, options}}) {
    //console.log(id)
    const [questions, setQuestions] = useContext(QuestionContext);
    const state = {};
    const filterOptions = [
        { 
            key: 'Multiple choice',
            text: 'Multiple choice',
            value: 'Multiple choice'
        },
        { 
            key: 'Short answer',
            text: 'Short answer',
            value: 'Short answer'
        }
        
    ]

    const deleteQuestion = (e) => {
        console.log(e);
        e.preventDefault();
        setQuestions(function(prevQuestions) {
            var deleteID = e.target.getAttribute("data-ID");
            console.log(deleteID);
            console.log(prevQuestions);
            var newQuestions = [];
            
            /*for(var i = 0; i < prevQuestions.length; i++) {
                prevQuestions[i].title = document.getElementById("textAreaField" + i).value;
            }*/

            for(var i = 0; i < prevQuestions.length; i++) {
                console.log(prevQuestions[i]);
                if (i != deleteID) {
                    newQuestions.push(prevQuestions[i]);
                } else {
                    console.log("DELETED " + i);
                }
            }

            for(var i = 0; i < newQuestions.length; i++) {
                document.getElementById("textAreaField" + i).value = newQuestions[i].title;
                document.getElementById("descriptionField" + i).value = newQuestions[i].description;
            }
            
            return newQuestions;
        }
        );
    }

    // Handle change to state for text input 
    const changeInput = (e) => {
        e.preventDefault();
        questions.map(items => items.id === e.target.getAttribute("data-ID"));
        console.log(questions);
        questions.push("LOL");
        console.log(questions);
        setQuestions([...questions], questions);
    }

    const handleTextChange = e => {
        const { value } = e.target;
        const name = e.target.getAttribute("name");
        var clickedID = e.target.getAttribute("data-ID");
        //console.log(name);
        //console.log(value);
        //console.log(clickedID);
        for(var i = 0; i < questions.length; i++) {
            if (i == clickedID) {
                questions[i][name] = value;
                console.log(questions[i]);
            }
        }
        setQuestions([...questions], questions);
    }; 

    const handleOptionChange = e => {
        //console.log(e);
        //console.log(e.target.dataset);
        
        const { value } = e.target;
        var clickedID = e.target.getAttribute("ID")[e.target.getAttribute("ID").length-1];
        var optionsIndex = e.target.offsetParent.attributes[0].value;
        //console.log(value);
        console.log(clickedID);
        console.log(optionsIndex);

        for(var i = 0; i < questions.length; i++) {
            if (i == clickedID) {
                console.log("HERE");
                console.log("i = " + i);
                console.log("optionsIndex = " + optionsIndex);
                questions[i]["options"][optionsIndex] = value;
            }
        }
        console.log(JSON.stringify(questions));
        setQuestions([...questions], questions);
    }; 

    const deleteOption = e => {
        const { value } = e.target;
        console.log(e);
        
        var clickedID = e.target.getAttribute("ID")[e.target.getAttribute("ID").length-1];
        
        var optionsIndex = e.target.attributes[1].nodeValue;
        //console.log(value);
        console.log(clickedID);
        console.log(optionsIndex);

        for(var i = 0; i < questions.length; i++) {
            if (i == clickedID) {
                console.log("HERE");
                console.log("i = " + i);
                console.log("optionsIndex = " + optionsIndex);
                var savedArray = questions[i]["options"];
                savedArray.splice(optionsIndex,1);
                questions[i]["options"] = savedArray;
            }
        }
        
        console.log(JSON.stringify(questions));
        setQuestions([...questions]);
    }

    const addOption = e => {
        const { value } = e.target;
        console.log(e);
        
        var clickedID = e.target.getAttribute("ID")[e.target.getAttribute("ID").length-1];
        
        var optionsIndex = e.target.attributes[1].nodeValue;
        //console.log(value);
        console.log(clickedID);
        console.log(optionsIndex);

        for(var i = 0; i < questions.length; i++) {
            if (i == clickedID) {
                console.log("HERE");
                console.log("i = " + i);
                console.log("optionsIndex = " + optionsIndex);
                var savedArray = questions[i]["options"];
                savedArray.push("");
                questions[i]["options"] = savedArray;
            }
        }
        
        console.log(JSON.stringify(questions));
        setQuestions([...questions]);
    }

    const handleQuestionTypeChange = e => {
        const { value } = e.target;
        console.log(e);
        //console.log(value);

        questions[id].questionType = e.target.innerText;
        console.log(e.target.innerText);
        console.log(JSON.stringify(questions));
        setQuestions([...questions]);
    }
    //console.log(questions[id]);
    //console.log(questions);
    return (
        <>
        <Card fluid color='green'>
        <Grid>
        <Grid.Row>
            <Grid.Column width={10}>
                <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>Question {id + 1}</p>
                <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "0px", marginTop: "10px", paddingBottom: "00px"}}>
                    Title
                </Header>
                <Form  style={{margin: "0px 20px"}}>
                    <TextArea id={"textAreaField" + id} data-ID={id} name="title" onChange={handleTextChange} placeholder='Write title here...'  defaultValue={title.trim() === '' ? '' : title} style={{margin: "10px 10px 0px 10px", marginLeft: "0px", height: "50px"}} />
                </Form>

                <Header as="h4" style={{padding: "0px 20px 0px 20px", marginBottom: "0px", marginTop: "10px"}}>
                    Description (Optional)
                </Header>
                <Form  style={{margin: "0px 20px"}}>
                    <TextArea id={"descriptionField" + id} data-ID={id} name="description" onChange={handleTextChange} placeholder='Write description here...'  defaultValue={description.trim() === '' ? '' : description} style={{margin: "10px 10px 0px 10px", marginLeft: "0px", height: "40px", fontSize: "12px"}} />
                </Form>
            </Grid.Column>
            <Grid.Column width={6} style={{margin: "0px", padding: "0px"}}>
                <p style={{padding: "6px 6px 0px 6px", margin: "0px"}}>&nbsp;</p>
                <Header as="h3" style={{padding: "0px 20px 0px 0px", marginBottom: "0px", marginTop: "10px", paddingBottom: "00px"}}>
                    Question Type
                </Header>
                <Dropdown style={{ marginTop: "10px"}} options={filterOptions} defaultValue={questions[id].questionType} onChange={handleQuestionTypeChange}/>
                <Button id="x" data-ID={id}  color="red" onClick={deleteQuestion}  size="mini" style={{display: "inline-block !important"/*color: "rgb(208, 25, 25)"}, backgroundColor: "transparent"}*/}}>X</Button>
                <Header as="h3" style={{padding: "0px 20px 0px 0px", marginBottom: "0px", marginTop: "10px", paddingBottom: "00px"}}>
                    Question Options
                </Header>
                <div className="box">
                    <div><Checkbox toggle style={{ marginTop: "10px"}}/></div>
                    <div style={{marginLeft: "10px", marginTop: "3px"}}><p>Required</p></div>
                </div>
            </Grid.Column>
        </Grid.Row>
            <Grid.Row>
            <Grid.Column width={16}>
            <Header as="h3" style={{padding: "0px 20px 0px 20px", marginBottom: "10px"}}>
                {questions[id].questionType == "Multiple choice" ? "Poll options" : "Example input"}
            </Header>
            <Form  style={{margin: "0px 20px", width: "100%"}}>
                
                {questions[id].questionType == "Multiple choice" ? 
                        <>
                        { options.map((option, index) => (
                            <div className="box">
                                <Checkbox
                                    name='radioGroup'
                                    value={id}
                                    style = {{marginRight: "10px"}}
                                />
                                <Input
                                    id={"optionsInputChange" + id}
                                    onChange={handleOptionChange}
                                    name='options'
                                    placeholder="Write option here..."
                                    value={option.trim() === '' ? '' : option}
                                    style = {{width: "80%", marginRight: "10px"}}
                                    data-index={index}
                                    data-ID={id}
                                />
                                <Button  data-ID={id} data-index={index} onClick={deleteOption} id={index} id={"optionsInputChange" + id}>             
                                    X
                                </Button>
                            </div>
                        ))
                        }
                        <div className="box" style={{padding: "10px 30px", width: "100%"}}>
                        <Button size="small" data-ID={id} onClick={addOption} id={"optionsInputChange" + id}>             
                            Add Option
                        </Button>
                        </div>
                    </>
                :
                    <div className="box" style={{padding: "0px  0px 10px 0px", width: "100%"}}>
                        <Input
                            id={"optionsInputChange" + id}
                            onChange={handleOptionChange}
                            name='options'
                            placeholder="Write response here..."
                            style = {{width: "80%", marginRight: "10px"}}
                            data-index={0}
                            data-ID={id}
                        />
                    </div>         
                
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