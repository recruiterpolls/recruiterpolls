
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError
  } = require('apollo-server');

const {SECRET} = require('../../privateVariables');

const saltRounds = 10;

const getToken = ({ id, email }) =>
  jwt.sign(
    {
      id,
      email
    },
    SECRET,
    { expiresIn: '6h' }
  );


module.exports = {
    Mutation: {
        async register(_, {registerInput : {email, password, confirmPassword}}) {

            const { errors, valid } = validateRegisterInput(email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

            const user = await User.findOne({ email });
            if(user) {
                throw new ValidationError('Email already being used.');
            }

            password = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = getToken(newUser);
            
            return {
                id: res.id,
                ...res._doc,
                token
            };
        }, async login(_, {loginInput : {email, password}}) {
            const { errors, valid } = validateLoginInput(email, password);
            
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

            const user = await User.findOne({ email });
            if (!user) throw new AuthenticationError('User not found');

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new AuthenticationError('Incorrect password');

            const token = getToken(user);

            console.log(user);
            
            return {
                id: user.id,
                ...user._doc,
                token
            };
        }, async verifyEmail(_, {vericationInput: password, email, isVerified}){

        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    },
 };

 /*
mutation {
  	register(registerInput: {
      email:"thisnew121@email.com",
      password:"themegapassword",
      confirmPassword:"themegapassword"
    }) {
        id
        token
    	email
    	createdAt
    	password
    }
}

mutation {
    login(loginInput: {
        email: "thisnew121@email.com",
        password: "themegapassword"
    }) {
        id
    	token
    	email
    	createdAt
    	password
    }
}

mutation {
  	getPostResponses(
      userID:"thisnew121@email.com",
      postID:"themegapassword"
    ) {
        id
        token
    	email
    	createdAt
    	password
    }
}

 */