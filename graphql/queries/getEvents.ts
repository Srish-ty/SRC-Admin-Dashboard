import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
    query Query($orgId: ID) {
        getEvents(orgID: $orgId) {
            description
            isTeamEvent
            name
            poster
            prizeMoney
            rules
            status
            id
            subHeading
            maxTeamSize
        }
    }
`;
