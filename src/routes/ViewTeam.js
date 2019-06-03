import React from 'react';
import findIndex from 'lodash/findIndex';
import { graphql } from 'react-apollo';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import { ALL_TEAMS_QUERY } from '../graphql/teams';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) {
    return null;
  }

  const teamIndex = !!teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0;
  const team = allTeams[teamIndex];
  const channelIndex = !!channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
  const channel = team.channels[channelIndex];

  return (
    <AppLayout>
      <Sidebar
        teams={allTeams.map(team => ({
        id: team.id,
        letter: team.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(ALL_TEAMS_QUERY)(ViewTeam);
