import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Users from './Users';
import Nav from './Nav';
import { HashRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    this.loadUsers();
  }
  loadUsers = () => {
    axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => {
        this.setState({ users });
      });
  };
  render() {
    const { users } = this.state;
    let topUsers;
    if (users.length) {
      topUsers = users.filter(
        user =>
          user.rank ===
          users.reduce(
            (acc, userRank) => {
              if (userRank.rank < acc.top) {
                acc.top = user.rank;
              }
              return acc;
            },
            { top: users[0].rank }
          ).top
      );
    }

    return (
      <Router>
        <div>
          <h1>Acme Users With Ranks</h1>
          <br />
          <Route
            render={({ location }) => (
              <Nav location={location} topUsers={topUsers ? topUsers : false} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => <Fragment>We have {users.length} Users!</Fragment>}
          />
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route
            exact
            path="/users/topRanked"
            render={() => <Users users={topUsers ? topUsers : users} />}
          />
        </div>
      </Router>
    );
  }
}
