import gql from 'graphql-tag';
import { allUserData, allOrganizationData } from './utils';

const USER_EDIT = gql`
  mutation userEdit($user: UserToEdit!, $userId: ID!){
    userEdit(user: $user, userId: $userId){
      ${allUserData}
    }
  }
`;

const USER_ADD_ETH_ADDRESS = gql`
  mutation userAddEthAddress($address: String!, $signature: String!, $userId: ID!) {
    userAddEthAddress(address: $address, signature: $signature, userId: $userId) {
      ${allUserData}
    }
  }
`;

const USER_EDIT_PASSWORD = gql`
  mutation userEditPassword($newPassword: String!, $oldPassword: String!, $userId: ID!) {
    userEditPassword(newPassword: $newPassword, oldPassword: $oldPassword, userId: $userId){
      ${allUserData}
    }
  }
`;

const USER_ADD_TO_ORGANIZATION = gql`
  mutation userAddToOrganization($organizationId: ID!, $userId: ID!, $role: UserRoleInOrganization!, $userRequestingId: ID!) {
    userAddToOrganization(organizationId: $organizationId, userId: $userId, role: $role, userRequestingId: $userRequestingId) {
      ${allUserData}
    }
  }
`;

const USER_REMOVE_FROM_ORGANIZATION = gql`
  mutation userRemoveFromOrganization($organizationId: ID!, $userId: ID!, $userRequestingId: ID!) {
    userRemoveFromOrganization(organizationId: $organizationId, userId: $userId, userRequestingId: $userRequestingId) {
      ${allUserData}
    }
  }
`;

const USER_CHANGE_ROLE_IN_ORGANIZATION = gql`
  mutation userChangeRoleInOrganization($organizationId: ID!, $userId: ID!, $role: UserRoleInOrganization!, $userRequestingId: ID!) {
    userChangeRoleInOrganization(organizationId: $organizationId, userId: $userId, role: $role, userRequestingId: $userRequestingId) {
      ${allUserData}
    }
  }
`;

const ORGANIZATION_ADD = gql`
  mutation organizationAdd($organization: OrganizationToAdd!, $userId: ID!, $verificationCode: String!) {
    organizationAdd(organization: $organization, userId: $userId, verificationCode: $verificationCode) {
      ${allOrganizationData}
    }
  }
`;

const ORGANIZATION_EDIT = gql`
  mutation organizationEdit($organizationId: ID!, $organization: OrganizationToEdit!, $userId: ID!) {
    organizationEdit(organizationId: $organizationId, organization: $organization, userId: $userId) {
      ${allOrganizationData}
    }
  }
`;

export {
  USER_EDIT,
  USER_ADD_ETH_ADDRESS,
  USER_EDIT_PASSWORD,
  USER_ADD_TO_ORGANIZATION,
  USER_REMOVE_FROM_ORGANIZATION,
  USER_CHANGE_ROLE_IN_ORGANIZATION,
  ORGANIZATION_ADD,
  ORGANIZATION_EDIT
};
