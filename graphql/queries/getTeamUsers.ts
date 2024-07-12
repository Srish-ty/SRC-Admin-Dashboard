import { gql } from "@apollo/client";

const GET_ALL_TEAMS= gql`
query Query($orgId: ID) {
  getEvents(orgID: $orgId) {
   name
   isTeamEvent
    teamRegistration {
      users {
        idCardPhoto
        srcID
        name
      }
      teamName
      submittedPDF

    }
    eventRegistration {
      user {
        srcID
        name
        idCardPhoto
      }
      submittedPDF
    }
  }}
`

export default GET_ALL_TEAMS