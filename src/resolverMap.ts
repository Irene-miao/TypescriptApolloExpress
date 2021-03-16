import { IResolvers } from 'graphql-tools';
import { find, filter } from 'lodash';


// sample data
const users = [
    {
        id: 1,
        name: "A",
        email: "a@gmail.com",
        password: "a12345",
        role: "tutor",
    },
    {
        id: 2,
        name: "B",
        email: "b@gmail.com",
        password: "b12345",
        role: "student",
 },
];


const resolverMap: IResolvers = {
    Role: {
        TUTOR: 'tutor',
        STUDENT: 'student',
        ADMIN: 'admin',
    },

  Query: {
    users: () => users, 
   user: (_, { id }) => find(users, {id}),
    },

Mutation: {
        createUser: (_, args) => {
            const {name, email, password, role} = args;
            const id = users.length;
            const user = {
                id,
                name,
                email,
                password,
                role,
            } 
            users.push(user);
            return user;
        },
        
        updateUser: ({ id, input}) => {
      if (!users[id]) {
          throw new Error("User not found");
      }
     users[id]
        },


        deleteUser: async (_, {id}) => {
            if (!users[id]) {
                throw new Error("Can't delete User");
            }
            const ok = Boolean(users[id]);
            delete users[id];

            return {ok};
        },
        },
    };

export default resolverMap;