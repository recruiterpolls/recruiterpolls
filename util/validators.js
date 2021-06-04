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
        errors.email = "Email must not be empty";
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
    /*
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
    */
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};



module.exports.validatePollResponse = (name, email, responses) => {
    const errors = {};
    //could change this functionality later on, for anonymous responses.
    if(name.trim() == ''){
        errrors.name = "Name must not be empty";
    }

    const emailErrors = validateEmail(email);
    if(emailErrors != ""){
        errors.email = emailErrors;
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    };
}

function validateEmail(email){
    if (email.trim() === '') {
        return "Email must not be empty";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            return "Email must be valid";
        }   
    }
    return "";
}