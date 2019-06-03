import gql from 'graphql-tag';

export const ALL_TEAMS_QUERY = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
