import gql from 'graphql-tag';
import { allUserData } from './utils';

const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      ${allUserData}
    }
  }
`;

const GET_USER_FROM_TOKEN = gql`
  query userFromToken($token: Token!) {
    userFromToken(token: $token) {
      ${allUserData}
    }
  }
`;

const GET_USERS = gql`
  query usersByIds($ids: [ID!]!) {
    usersByIds(ids: $ids) {
      ${allUserData}
    }
  }
`;

const GET_USER_BY_USERNAME = gql`
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      ${allUserData}
    }
  }
`;

const USERNAME_EXISTS = gql`
  query usernameExists($username: String!) {
    usernameExists(username: $username)
  }
`;

const EMAIL_EXISTS = gql`
  query userEmailExists($email: String!) {
    userEmailExists(email: $email)
  }
`;

const USER_BY_ADDRESS = gql`
  query userByAddress($address: String!) {
    userByAddress(address: $address) {
      ${allUserData}
    }
  }
`;

const USER_HAS_ETH_ADDRESS = gql`
  query userHasEthAddress($userId: ID!, $address: String!) {
    userHasEthAddress(userId: $userId, address: $address)
  }
`;

const USER_ETH_ADDRESS_EXISTS = gql`
  query userEthAddressExists($address: String!) {
    userEthAddressExists(address: $address)
  }
`;

const USER_SEARCH = gql`
  query userSearch($query: String!, $filters: [UserFilter], $params: QueryParams!) {
    userSearch(query: $query, filters: $filters, params: $params) {
      ${allUserData}
    }
  }
`;

export {
  GET_USER,
  GET_USER_FROM_TOKEN,
  GET_USERS,
  GET_USER_BY_USERNAME,
  USERNAME_EXISTS,
  EMAIL_EXISTS,
  USER_BY_ADDRESS,
  USER_HAS_ETH_ADDRESS,
  USER_ETH_ADDRESS_EXISTS,
  USER_SEARCH
};
