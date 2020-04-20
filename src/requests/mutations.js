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
  ORGANIZATION_ADD,
  ORGANIZATION_EDIT
};
