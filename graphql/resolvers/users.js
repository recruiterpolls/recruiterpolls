const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(_, {registerInput : {username, email, password, confirmPassword}}) {
            const newUser = new User({
                email,
                username,
                password,
                createdAt: ""
            });

            const res = await newUser.save();

            return newUser;
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID),
    },
    Mutation:{
        async 
    }
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