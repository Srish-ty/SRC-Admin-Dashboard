import gql from "graphql-tag";

const GET_ALL_TEAMS= gql`
   query Query($orgId: ID) {
   teamRegistrations(orgID: $orgId) {
    eventID
    teamName
    users {
      name
      srcID
      idCardPhoto
    }
  }
}
`

export default GET_ALL_TEAMS