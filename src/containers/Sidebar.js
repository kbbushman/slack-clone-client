import React, { Component } from 'react';
import decode from 'jwt-decode';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
  }

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  }

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  }

  render() {
    const { teams, team } = this.props;

    let username = '';

    try {
      const token = localStorage.getItem('sc_token');
      const { user } = decode(token);
      username = user.username;
    } catch (err) {}

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'Slackbot'}, { id: 2, name: 'User1' }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        key="sidebar-add-channel-modal"
        open={this.state.openAddChannelModal}
        onClose={this.handleCloseAddChannelModal}
      />
    ];
  }
};

export default Sidebar;
