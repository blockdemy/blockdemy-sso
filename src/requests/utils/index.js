const allUserData = `
  id
  username
  firstName
  lastName
  emails {
    email
    verified
  }
  profileImg
  ethAddresses {
    id
    address
    addedAt
    signature
  }
`;

const allOrganizationData = `
  id
  identifier
  name
  logo
  domain
  members {
    user {
      ${allUserData}
    }
    role
  }
  socialMedia {
    facebook
    github
    instagram
    linkedin
    twitter
  }
`;

export { allUserData, allOrganizationData };
