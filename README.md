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
