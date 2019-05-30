import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Home = () => <Query query={gql`
        {
          allUsers {
            id
            username
            email
          }
        }
      `}>
        {({ loading, error, data }) => loading
          ? <h1>Loading...</h1>
          : data.allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)
        }
      </Query>

export default Home;
