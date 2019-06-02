import React from 'react';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

const ViewTeam = ({ match: { params } }) => {
  return (
    <AppLayout>
      <Sidebar currentTeamId={params.teamId} />
      <Header channelName="general" />
      <Messages>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="general" />
    </AppLayout>
  );
};

export default ViewTeam;
