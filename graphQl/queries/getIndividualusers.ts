import { gql } from "@apollo/client";

const GET_ALL_USERS = gql`
  query Query($orgId: ID) {
  getAllUsers(orgID: $orgId) {
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