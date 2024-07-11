import gql from "graphql-tag";

const GET_ALL_USERS = gql`
  query Query($orgId: ID) {
  getAllUsers(orgID: $orgId) {
    eventID
    email
    id
    srcID
    tSize
    college
    mobile
    name
    idCardPhoto
  }
}
`
export default GET_ALL_USERS