import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

const SAFE_ID_PATTERN = /^[\w-]+$/;

function validateId(id: string): string {
  if (id == null || id === "") {
    throw new Error("ID must not be empty");
  }
  if (!SAFE_ID_PATTERN.test(id)) {
    throw new Error(
      "ID must contain only alphanumeric characters, underscores, and hyphens"
    );
  }
  return id;
}

// fields needs the arrow func to stop defined/circular deps
const CompanyType: GraphQLObjectType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue: { id: string }) {
        return axios
          .get(
            `http://localhost:3000/companies/${validateId(
              parentValue.id
            )}/users`
          )
          .then((response) => response.data);
      },
    },
  }),
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue: { companyId: string }) {
        return axios
          .get(
            `http://localhost:3000/companies/${validateId(
              parentValue.companyId
            )}`
          )
          .then((response) => response.data);
      },
    },
  }),
});

// demonstrating connection to an outside server rather than static wiring.
// adding siblings to make other connection queries for the RootQueryType
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue: unknown, args: Record<string, string>) {
        return axios
          .get(`http://localhost:3000/users/${validateId(args.id)}`)
          .then((response) => response.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue: unknown, args: Record<string, string>) {
        return axios
          .get(`http://localhost:3000/companies/${validateId(args.id)}`)
          .then((response) => response.data);
      },
    },
  }),
});

// GraphQLNonNull makes fields required when updating in this case data
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue: unknown, args: Record<string, unknown>) {
        const { firstName, age } = args;
        return axios
          .post(`http://localhost:3000/users`, { firstName, age })
          .then((response) => response.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue: unknown, args: Record<string, string>) {
        return axios
          .delete(`http://localhost:3000/users/${validateId(args.id)}`, {
            data: { id: args.id },
          })
          .then((response) => response.data);
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue: unknown, args: Record<string, unknown>) {
        const { id, firstName, age, companyId } = args;
        return axios
          .patch(`http://localhost:3000/users/${validateId(String(id))}`, {
            firstName,
            age,
            companyId,
          })
          .then((response) => response.data);
      },
    },
    addCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
      },
      resolve(parentValue: unknown, args: Record<string, string>) {
        const { id, name } = args;
        return axios
          .post(`http://localhost:3000/companies`, { id, name })
          .then((response) => response.data);
      },
    },
    editCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue: unknown, args: Record<string, unknown>) {
        const { id, name, description } = args;
        return axios
          .patch(`http://localhost:3000/companies/${validateId(String(id))}`, {
            name,
            description,
          })
          .then((response) => response.data);
      },
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue: unknown, args: Record<string, string>) {
        return axios
          .delete(`http://localhost:3000/companies/${validateId(args.id)}`)
          .then((response) => response.data);
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation });

/*
// can be reused within queries instead of repeating yourself..
fragment companyDetails on Company {
  id,
  name,
  description
}

then for example you can spread inside of the query
company(id: "1"){
  ...companyDetails
}
*/
