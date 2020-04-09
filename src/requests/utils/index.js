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
  name
  logo
  website
  members {
    user
    role
  }
  socialMedia {
    facebook
    github
    instagram
    linkedIn
    twitter
  }
`;

export { allUserData, allOrganizationData };
