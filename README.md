# @respondex/core [![Build Status](https://travis-ci.org/IyiKuyoro/RespondEx.svg?branch=develop)](https://travis-ci.org/IyiKuyoro/RespondEx) [![Coverage Status](https://coveralls.io/repos/github/IyiKuyoro/RespondEx/badge.svg?branch=develop)](https://coveralls.io/github/IyiKuyoro/RespondEx?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/aefd9dedd80b68dd6212/maintainability)](https://codeclimate.com/github/IyiKuyoro/RespondEx/maintainability)

This is a simple node package that helps developers package HTTP responses into simple reusable methods, without having to worry about setting the headers and the right status codes.

All you need to do is call the right method with all the information required along with the [express](https://expressjs.com/) HTTP response object and the response is properly formated for you in line with REST API Guidelines.

[Express](https://expressjs.com/) is a powerful framework that helps handle HTTP requests and responses on the server. However, it can become a bit repetitive to have to respond to various request the same way. This would help take all that repetitive "res" code and stow it away in the node_modules. 😄

## Getting Started
Your REST API must be using [express](https://expressjs.com/) as its HTTP handler.
- Download the package as a development dependency with 
```
npm install @respondex/core @respondex/apierror
```
- Import the package into your controller, middleware or wherever you wish to send a response from.
```
import RespondEx from '@respondex/core'
```
- Use by simply sending a response as demonstrated below for a newly created product resource.
```
RespondEx.createdResource(
  'Successful sign-in',
  {
    name: 'Chair',
    quantity: 100,
    description: 'A comfortable seat for your afternoon tea.'
  },
  'https://fakeecommerce.com/api/v1/products/1',
  res,
);
```

## Documentation
### Methods
**createdResource**: Sends a HTTP response for a newly created resource. Response will contain a 201 status code, message and data in the body. It would also contain the URL to the newly created resource in the header of the response.

| Parameters             | Type   | Description                              | Example                                       |
|------------------------|--------|------------------------------------------|-----------------------------------------------|
| message                | string | The message to be sent with the response | "Product successfully created."               |
| data                   | object | Newly created resource data              | { name: "Chair" }                             |
| location               | string | The URL of the newly created resource    | "https://fakeecommerce.com/api/v1/products/1" |
| res                    | object | The express http response object         |                                               |
| options (_optional_)   | object | Some extra headers                       | { contentType: "application/json" }           |

#### Example
```
RespondEx.createdResource(
  'Successful sign-in',
  {
    name: 'Chair',
    quantity: 100,
    description: 'A comfortable seat for your afternoon tea.'
  },
  'https://fakeecommerce.com/api/v1/products/1',
  res,
);
```

**error**: Sends a HTTP response error using an instance of the APIError class.

| Parameter             | Type     | Description                              | Example                                       |
|------------------------|----------|------------------------------------------|-----------------------------------------------|
| error                  | APIError | An instance of the APIError object       |                                               |
| res                    | object   | The express http response object         |                                               |
| options (_optional_)   | object   | Some extra headers                       | { contentType: "application/json" }           |

#### Example
```
import APIError from "@respondex/apierror"

const error = new APIError(...);
RespondEx.error(
  error,
  res,
);
```

**errorByType**: Sends a HTTP response error by providing an error type.

| Parameter                | Type     | Description                              | Example                                       |
|---------------------------|----------|------------------------------------------|-----------------------------------------------|
| type                      | string   | The type of error to be sent             | NotFound                                      |
| res                       | object   | The express http response object         |                                               |
| message (_optional_)      | object   | The message to be sent in the body       | "Some error has occurred"                     |
| possibleErrors (_optional_)| object[]| The express http response object         |                                               |
| options (_optional_)      | object   | Some extra headers                       | { contentType: "application/json" }           |

#### Example
```
RespondEx.errorByType(
  'NotFound',
  res,
);
```

### Options
This is an optional parameter that can be provided to the methods to configure some of the information in the header. Currently there is just one.

| Property    | Type   | Example            |
|-------------|--------|--------------------|
| contentType | string | "application/json" |

### Errors
This is the list of error types

| Error        | code | Description                     |
|--------------|------|---------------------------------|
| ClientError  | 400  | For general client errors       |
| Unauth­orized | 401  | For unauthorized access errors  |
| Forbidden    | 403  | For for forbidden access errors |
| NotFound     | 404  | Resource not found error        |
| _default_    | 500  | For general server errors       |

### Contributors
_Opeoluwa Iyi-Kuyoro_: 👨🏿[Profile](https://github.com/IyiKuyoro) - [WebSite](https://iyikuyoro.com)

### Contributions
I am very open to contributions from the community. If you find this package useful, and you feel there are a rew things you would like to add or nasty bugs that you just want to get rid of, please feel free to fork, modify and raise a PR.

In doing so, I would like you to follow the conventions.

**Commit styles**: This project uses the Angular commit style and [commitplease](https://www.npmjs.com/package/commitplease) has been set up to enforce that.

**PR Style**: Please use the template you find in the PR message to compose one.
