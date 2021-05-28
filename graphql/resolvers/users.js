
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
import { validateRegisterInput, validateLoginInput } from '../../util/validators';
const saltRounds = 10;

const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError
} = require('apollo-server');

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

            const user = await User.findOne({ username });
            if(user) {
                throw new ValidationError('Username taken.');
            }

            password = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: ""
            });
            const res = await newUser.save();
            const token = getToken(newUser);
            
            
            return {
                id: res.id,
                ...res._doc.
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