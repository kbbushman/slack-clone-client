import React from 'react';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Channels from '../components/Channels';
import Teams from '../components/Teams';

const Sidebar = ({ currentTeamId }) => {
  return (
    <Query query={gql`
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
    `}>
      {
        ({ loading, error, data: { allTeams } }) => {
          if (loading) {
            return <h1>Loading...</h1>;
          }

          console.log(allTeams);

          const teamIndex = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
          const team = allTeams[teamIndex];
          let username = '';

          try {
            const token = localStorage.getItem('sc_token');
            const { user } = decode(token);
            username = user.username;
          } catch (err) {}

          return [
            <Teams key="team-sidebar" teams={allTeams.map(team => ({
              id: team.id,
              letter: team.name.charAt(0).toUpperCase(),
            }))} />,
            <Channels
              key="channels-sidebar"
              teamName={team.name}
              username={username}
              channels={team.channels}
              users={[{ id: 1, name: 'Slackbot'}, { id: 2, name: 'User1' }]}
            />
          ];
        }
      }
    </Query>
  )
}

export default Sidebar;
