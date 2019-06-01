import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

const ViewTeam = () => {
  return (
    <AppLayout>
      <Teams teams={[{ id: 1, letter: 'O' }, { id: 2, letter: 'T' }]} />
      <Channels
        teamName="Team Name"
        username="Username"
        channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
        users={[{ id: 1, name: 'Slackbot'}, { id: 2, name: 'User1' }]}
      />
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
