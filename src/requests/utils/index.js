const allOrganizationData = `
  id
  identifier
  name
  logo
  domain
  socialMedia {
    facebook
    github
    instagram
    linkedin
    twitter
  }
`;

const allUserData = `
  id
  username
  firstName
  lastName
  emails {
    email
    verified
    verifiedAt
    primary
  }
  privacy {
    showSocialMedia
    showCountry
  }
  socialMedia {
    twitter
    facebook
    linkedin
    github
  }
  organizations {
    organization {
      ${allOrganizationData}
    }
    role
  }
  profileImg
  ethAddresses {
    id
    address
    addedAt
    signature
  }
  stripeId
  stripeInfo {
    address
    balance
    created
    invoicePrefix
    preferredLocales
  }
`;

export { allUserData, allOrganizationData };
