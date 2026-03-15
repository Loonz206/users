import express from "express";
import { port } from "./configs/config";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

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
