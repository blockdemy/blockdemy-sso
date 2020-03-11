<p align="center"><img height="100" src="https://raw.githubusercontent.com/blockdemy/blockdemy-sso/master/static/images/logo-black.png" /></p>

<h1 align="center"> Blockdemy SSO </h1>

<p align="center"> Official Blockdemy's Single Sign On Client </p>

<hr/>

<p> <a href="https://www.npmjs.com/package/blockdemy-sso">Blockdemy SSO</a> is a client that allows to communicate and get user data from our <a href="https://id.blockdemy.com">Single Sign On Service</a>  </p>

<h2> Documentation </h2>

<h3> Getting started </h3>

<p>Run the following command to install Blockdemy SSO client</p>

```shell
$ yarn add blockdemy-sso
```

<h3> Blockdemy SSO Client </h3>

<p>In order to start using the sso client, it is needed to be instantiated using the following code</p>

```javascript
import BlockdemySSO from 'blockdemy-sso'

// SSO_URL is the SSO API Url. 
// It can be changed to use on development with a localhost url
const SSO_URL = 'https://api.id.blockdemy.com'
const API_KEY = '<API_KEY>'

const SingleSignOn = new BlockdemySSO(API_KEY, SSO_URL);

// Examples
const start = async () => {
  const user = await SingleSignOn.getUserById(/* Valid user id */);

  // Use user here
}
```

<h3>Using the Mongoose Plugin</h3>

In order to use the mongoose plugin to autopopulate users using their ssoId, you just need to add the following into your user schema:

```javascript
import SingleSignOn from 'path/to/your/blockdemy-sso/instance';

const UserSchema = new Schema({
  /* ... */
  ssoId: { type: Schema.Types.ObjectId }
  /* ... */
});

UserSchema.plugin(SingleSignOn.populateUsers);
```

<h3>Query user data methods</h3>

Every method corresponds with the GraphQL API query endpoint with the same name
They can be checked at our <a href="https://api.id.blockdemy.com/graphql">Blockdemy SSO Playground</a>

| Method                                                 | params                                                   | returns                | Description                                                          |
|--------------------------------------------------------|----------------------------------------------------------|------------------------|----------------------------------------------------------------------|
| usersById(ids)                                         | ids: Array[String]                                       | Array[Object]          | Recover the list of users given valid ids                            |
| userById(id)                                           | id: String                                               | Object                 | Recover user given a valid id                                        |
| userByUsername(username)                               | username: String                                         | Object                 | Recover user given a valid username                                  |
| userByAddress(address)                                 | address: String                                          | Object                 | Retrieve the user that owns an ethereum address                      |
| usernameExists(username)                               | username: String                                         | Boolean                | Indicates if an username has been taken                              |
| userEmailExists(email)                                 | email: String                                            | Boolean                | Indicates if an email has been taken and verified                    |
| userHasEthAddress(userId, address)                     | userId: String, address: String                          | Boolean                | Indicates if an specific user owns an ethereum address               |
| userEthAddressExists(address)                          | address: String                                          | Boolean                | Indicates if an ethereum address has been taken before               |
| userSearch(query, filters, params)                     | query: Object, filters: Object, params: Object           | Array[Object]          | Recover a list of users given valid filters and parameters for search|

<h3>Mutate user data methods</h3>
Every method corresponds with the GraphQL API mutation endpoint with the same name
They can be checked at our <a href="https://api.id.blockdemy.com/graphql">Blockdemy SSO Playground</a>

| Method                                                 | params                                                    | returns                | Description                                                          |
|--------------------------------------------------------|-----------------------------------------------------------|------------------------|----------------------------------------------------------------------|
| userEdit(userId, user)                                 | userId: String, user: Object                              | Object                 | Edit user data and retrieves the new user                            |
| userAddEthAddress(userId, user)                        | userId: String, address: String, signature: String        | Object                 | Add ethereum address validated with a signature to user              |
| userEditPassword(userId, newPassword, oldPassword)     | userId: String, newPassword: String, oldPassword: String  | Object                 | Change password tu user using its last password to validate          |

<h3>Contributing</h3>
Blockdemy SSO is open for contributions in order to make it easy to make our technology more open for the community.

<h3>Authors</h3>
<ul>
  <li>Ernesto García - Tech Leader @blockdemy</li>
</ul>

<h3>License</h3>

This project is licensed under the MIT License