[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/Loonz206/hello-next.svg?branch=master)](https://travis-ci.com/Loonz206/users)
[![Known Vulnerabilities](https://snyk.io/test/github/loonz206/users/badge.svg)](https://snyk.io/test/github/loonz206/users)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Loonz206_users&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Loonz206_users)

# Express/GraphQL Course

_Learning the bits about Express/GraphQL via a course referencing a local json db with json-server_

to get started

`npm install`

then

`npm run dev`

to create an running nodemon graphql instance and then open http://localhost:4000/graphql

and to inspect the RESTFUL Json Server at http://localhost:3000/user or http://localhost:3000/companies

## Things to do

Using the http://localhost:4000/graphql you can add a query a user by querying on the left panel
In this case user with id of 23 is in the db.json ( you can remove or add fields on this person )

```
{
  user (id:"23") {
    id
    firstName
    age
    company {
      name
      description
      id
    }
  }
}
```

Or add users by leveraging a mutation

```
mutation {
  addUser(firstName:"Bobby", age:58) {
    id,
    age,
    firstName
  }
}
```

Or edit that user

```
mutation {
  editUser(id: <id in db.json>, companyId: "2") {
    id,
    firstName,
    age
  }
}
```

Or even delete that user

```
mutation {
  deleteUser(id: <id in db.json>) {
    id
  }
}
```

Same goes for adding companies

```
mutation {
  addCompany(id: "idOfCompany", name: "nameOfCompany") {
    id
  }
}
```

Editing companies

```
mutation {
  editCompany(id: "idOfCompany", description: "making soccer balls") {
    id
  }
}
```

Deleting company

```
mutation {
  deleteCompany(id: "idOfCompany") {
    id
  }
}
```

Alot of these tips follow the Restful Conventions
For more read the schema/schema.js

### Restful Conventions / Routing Examples

_restful meaning readable methods that you can assert actions on_

- /name POST Create a record
- /name GET Fetch all records
- /name/:id GET Fetch record with given id
- /name/:id PUT Update details of user with id
- /name/:id DELETE Delete user with id

_things can get complicated the more deeper and nested as you go_

- /users/23/posts POST Create a post associated with user 23
- /users/23/posts GET Fetch all posts created by user 23
- /users/23/posts/14 GET Fetch post 14 by user 23
- /users/23/posts/15 PUT Update post 15 by user 23
- /users/23/posts/18 DELETE Delete post 18 created by user 23

### However these breakdown once we get into lots of http requests or super nested data

Hence why using GraphQL perhaps can be a benefit
