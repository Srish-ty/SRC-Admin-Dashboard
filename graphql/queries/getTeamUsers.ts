import { gql } from "@apollo/client";

const GET_ALL_TEAMS= gql`
query Query($orgId: ID) {
  getEvents(orgID: $orgId) {
   name
    teamRegistration {
      users {
        idCardPhoto
        srcID
        name
      }
      teamName
      submittedPDF

    }}}
`

export default GET_ALL_TEAMS