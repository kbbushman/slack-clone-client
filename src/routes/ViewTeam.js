import React from 'react';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
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

  if (!allTeams.length) {
    return <Redirect to='/create-team' />;
  }

  let teamIdInteger = parseInt(teamId, 10);
  const teamIndex = teamIdInteger ? findIndex(allTeams, ['id', teamIdInteger]) : 0;
  const team = allTeams[teamIndex];

  let channelIdInteger = parseInt(channelId, 10);
  const channelIndex = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
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
      {channel && <Header channelName={channel.name} />}
      {channel && <Messages channelId={channel.id}>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </Messages>}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  );
};

export default graphql(ALL_TEAMS_QUERY)(ViewTeam);
