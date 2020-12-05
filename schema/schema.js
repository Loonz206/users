const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const users = [
  { id: "23", firstName: "Micheal", age: 57 },
  { id: "42", firstName: "Jackie", age: 101 },
  { id: "14", firstName: "DK", age: 22 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
