import gql from "graphql-tag";

const GET_REGISTERED_EVENTS = gql`
query Query($orgId: ID) {
  eventRegistration(orgID: $orgId) {
    eventID
    user {
      college
      email
      id
      mobile
      name
      srcID
      tSize
    }
  }
}
`
export default GET_REGISTERED_EVENTS