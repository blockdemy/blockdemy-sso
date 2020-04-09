import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {
  GET_USER,
  GET_USER_FROM_TOKEN,
  GET_USERS,
  GET_USER_BY_USERNAME,
  USERNAME_EXISTS,
  EMAIL_EXISTS,
  USER_BY_ADDRESS,
  USER_HAS_ETH_ADDRESS,
  USER_ETH_ADDRESS_EXISTS,
  USER_SEARCH,
  GET_ORGANIZATION,
  GET_ORGANIZATIONS
} from './requests/queries';
import { USER_EDIT, USER_ADD_ETH_ADDRESS, USER_EDIT_PASSWORD } from './requests/mutations';

class BlockdemySSO {
  constructor(API_KEY, SSO_URL) {
    const cache = new InMemoryCache();

    const httpLink = new HttpLink({
      uri: SSO_URL || 'https://id.blockdemy.com/graphql',
      fetch,
      headers: {
        authorization: `Bearer ${API_KEY}`
      }
    });

    const errorHandler = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(e => console.error(e.message, e));
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }
    });

    const link = ApolloLink.from([errorHandler, httpLink]);

    this.client = new ApolloClient({
      cache,
      link,
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });
  }

  // START OF QUERIES
  usersByIds = async ids => {
    const { data, errors } = await this.client.query({
      query: GET_USERS,
      variables: { ids }
    });

    if (errors) throw errors;

    return data.usersByIds;
  };

  user = async id => {
    const { data, errors } = await this.client.query({
      query: GET_USER,
      variables: { id }
    });

    if (errors) throw errors;

    return data.user;
  };

  userFromToken = async token => {
    const { data, errors } = await this.client.query({
      query: GET_USER_FROM_TOKEN,
      variables: { token }
    });

    if (errors) throw errors;

    return data.user;
  };

  userByUsername = async username => {
    const { data, errors } = await this.client.query({
      query: GET_USER_BY_USERNAME,
      variables: { username }
    });

    if (errors) throw errors;

    return data.userByUsername;
  };

  usernameExists = async username => {
    const { data, errors } = await this.client.query({
      query: USERNAME_EXISTS,
      variables: { username }
    });

    if (errors) throw errors;

    return data.usernameExists;
  };

  userEmailExists = async email => {
    const { data, errors } = await this.client.query({
      query: EMAIL_EXISTS,
      variables: { email }
    });

    if (errors) throw errors;

    return data.userEmailExists;
  };

  userByAddress = async address => {
    const { data, errors } = await this.client.query({
      query: USER_BY_ADDRESS,
      variables: { address }
    });

    if (errors) throw errors;

    return data.userByAddress;
  };

  userHasEthAddress = async (userId, address) => {
    const { data, errors } = await this.client.query({
      query: USER_HAS_ETH_ADDRESS,
      variables: { userId, address }
    });

    if (errors) throw errors;

    return data.userHasEthAddress;
  };

  userEthAddressExists = async address => {
    const { data, errors } = await this.client.query({
      query: USER_ETH_ADDRESS_EXISTS,
      variables: { address }
    });

    if (errors) throw errors;

    return data.userEthAddressExists;
  };

  userSearch = async (query, filters, params) => {
    const { data, errors } = await this.client.query({
      query: USER_SEARCH,
      variables: { query, filters, params }
    });

    if (errors) throw errors;

    return data.userSearch;
  };

  organization = async organizationId => {
    const { data, errors } = await this.client.query({
      query: GET_ORGANIZATION,
      variables: { organizationId }
    });

    if (errors) throw errors;

    return data.organization;
  };

  organizationsByIds = async ids => {
    const { data, errors } = await this.client.query({
      query: GET_ORGANIZATIONS,
      variables: { ids }
    });

    if (errors) throw errors;

    return data.organizationsByIds;
  };
  // END OF QUERIES

  // START OF MUTATIONS
  userEdit = async (userId, user) => {
    const { data, errors } = await this.client.mutate({
      mutation: USER_EDIT,
      variables: { user, userId }
    });

    if (errors) throw errors;

    return data.userEdit;
  };

  userAddEthAddress = async (userId, address, signature) => {
    const { data, errors } = await this.client.mutate({
      mutation: USER_ADD_ETH_ADDRESS,
      variables: { address, signature, userId }
    });

    if (errors) throw errors;

    return data.userAddEthAddress;
  };

  userEditPassword = async (userId, newPassword, oldPassword) => {
    const { data, errors } = await this.client.mutate({
      mutation: USER_EDIT_PASSWORD,
      variables: { newPassword, oldPassword, userId }
    });

    if (errors) throw errors;

    return data.userEditPassword;
  };
  // END OF MUTATIONS

  populateUsers = schema => {
    schema.post('find', async localUsers => {
      const remoteUsers = await this.usersByIds(localUsers.map(({ ssoId }) => ssoId));

      for (let i = 0; i < localUsers.length; i++) {
        localUsers[i].username = remoteUsers[i].username;
        localUsers[i].firstName = remoteUsers[i].firstName;
        localUsers[i].lastName = remoteUsers[i].lastName;
        localUsers[i].emails = remoteUsers[i].emails;
        localUsers[i].profileImg = remoteUsers[i].profileImg;
        localUsers[i].ethAddresses = remoteUsers[i].ethAddresses;
      }
    });

    schema.post('findOne', async localUser => {
      if (localUser) {
        const remoteUser = await this.user(localUser.ssoId);

        localUser.username = remoteUser.username;
        localUser.firstName = remoteUser.firstName;
        localUser.lastName = remoteUser.lastName;
        localUser.emails = remoteUser.emails;
        localUser.profileImg = remoteUser.profileImg;
        localUser.ethAddresses = remoteUser.ethAddresses;
      }
    });
  };

  populateOrganizations = schema => {
    schema.post('find', async localOrganizations => {
      const ids = localOrganizations.map(({ ssoId }) => ssoId);
      const remoteOrganizations = await this.organizationsByIds(ids);

      for (let i = 0; i < localOrganizations.length; i++) {
        localOrganizations[i].name = remoteOrganizations[i].name;
        localOrganizations[i].logo = remoteOrganizations[i].logo;
        localOrganizations[i].website = remoteOrganizations[i].website;
        localOrganizations[i].members = remoteOrganizations[i].members;
        localOrganizations[i].socialMedia = remoteOrganizations[i].socialMedia;
      }
    });

    schema.post('findOne', async localOrganization => {
      if (localOrganization) {
        const remoteOrganization = await this.organization(localOrganization.ssoId);

        localOrganization.name = remoteOrganization.name;
        localOrganization.logo = remoteOrganization.logo;
        localOrganization.website = remoteOrganization.website;
        localOrganization.members = remoteOrganization.members;
        localOrganization.socialMedia = remoteOrganization.socialMedia;
      }
    });
  };
}

export default BlockdemySSO;
