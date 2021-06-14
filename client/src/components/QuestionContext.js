import { PromiseProvider } from 'mongoose';
import React, {useState, createContext} from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = (props) => {
    const [questions, setQuestions] = useState([
        {
            title: "",
            description: "",
            questionType: "Multiple choice",
            required: true,
            options: ["", "", "", ""],
            index: 0
        }
    ]);

    return (
        <QuestionContext.Provider value={[questions, setQuestions]}>
            {props.children}
        </QuestionContext.Provider>
    );
}