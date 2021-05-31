module.exports.validateRegisterInput = (
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    validateEmail(email);

    if (password === '') {
        errors.password = 'Password must not be empty';
    } else if (password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = "Username must not be empty";
    }
    if (password.trim() === '') {
        errors.password = "Password must not be empty";
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validatePollCreation = (title, questions) => {
    const errors = {};
    if(title.trim() === ''){
        errors.title = "Pollname must not be empty";
    }
    for(var i = 0; i < questions.length; i++){
        
        if(questions[i].title.trim() === ''){
            errors.questions = "Question is not valid";
        }
        if(questions[i].questionType.trim() === ''){
            errors.questions = "Question is not valid";
        }

        for(var q = 0; q < questions[i].options.length; q++){
            if(questions[i].options[q].trim() === ''){
                errors.questions = "Question is not valid";
            }
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validatePollResponse = (responses) => {
    const errors = {};
    for(var i = 0; i < responses.length; i++){
        if(responses[i].name.trim() === ''){
            errors.responses = "Response in not valid";
        }
        validateEmail(responses.email[i]);

        for(var q = 0; q < responses[i].response.length; q++){
            if(responses[i].response[q].trim() === ''){
                errors.responses = "Response is not valid";
            }
        }

    }
    return{
        errors,
        valid: Object.keys(errors).length < 1
    };
}

function validateEmail(email){
    if (email.trim() === '') {
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
}