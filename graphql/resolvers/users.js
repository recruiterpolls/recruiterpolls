
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
const { extendSchemaImpl } = require('graphql/utilities/extendSchema');
const saltRounds = 10;

const getToken = ({ id, username, email }) =>
  jwt.sign(
    {
      id,
      username,
      email
    },
    SECRET,
    { expiresIn: '1d' }
  );


module.exports = {
    Mutation: {
        async register(_, {registerInput : {username, email, password, confirmPassword}}) {
            
            // Generating hash for password 
            /*var hash = bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    return hash;
                });
            });*/
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

            var user = await User.findOne({ username, $email });
            if(user) {
                if (user.email == extendSchemaImpl) {
                    throw new ValidationError('Email and username taken.');
                }
                throw new ValidationError('Username taken.');
            }

            user = await User.findOne({ email });
            if(user) {
                throw new ValidationError('Email already being used.');
            }

            password = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                username,
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
            
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID),
    },
 };

 /*
mutation {
  	register(registerInput: {
      username: "THIRDUSER THIRD ONE  COOPER Lappenbusch is the BEST in the world  ",
      email:"email@email.com",
      password:"pass pass",
      confirmPassword:"asdf"
    }) {
      username
      id
    }
}
 */