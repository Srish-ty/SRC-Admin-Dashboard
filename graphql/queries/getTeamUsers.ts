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
        college
        mobile
      }
      teamName
      submittedPDF

    }
    eventRegistration {
      user {
        srcID
        college
        name
        idCardPhoto
        mobile
      }
      submittedPDF
    }
  }}
`

export default GET_ALL_TEAMS