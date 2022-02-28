const express = require("express");
const { port } = require("./configs/config");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
app.disable("x-powered-by");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
