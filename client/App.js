import React, { Component } from 'react';
import Users from './Users';
import Nav from './Nav';
import CreateUser from './CreateUser';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchUsers } from './store';
import { connect } from 'react-redux';

//map the state from our store to the props for the app component
const mapStateToProps = state => {
  return { users: state.users };
};

//map the dispatch capabilities from our store to the the props for the app component
const mapDispatchToProps = dispatch => {
  return { fetchInitialUsers: () => dispatch(fetchUsers()) };
};

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialUsers();
  }
  render() {
    const { users } = this.props;
    const topRank = users.reduce(
      (acc, userRank) => {
        if (userRank.rank < acc.top) {
          acc.top = userRank.rank;
        }
        return acc;
      },
      { top: users[0] ? users[0].rank : 0 }
    ).top;
    const topUsers = users.filter(user => user.rank === topRank);
    return (
      <Router>
        <div>
          <h1>Acme Users With Ranks</h1>
          <br />
          <Route
            render={({ location }) => (
              <Nav
                location={location}
                topUsers={topUsers.length ? topUsers : false}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => <div>We have {users.length} Users!</div>}
          />
          <Route
            exact
            path="/users"
            render={() => (
              <Users users={users.sort((a, b) => a.rank - b.rank)} />
            )}
          />
          <Switch>
            <Route
              path="/users/create"
              exact
              render={({ history }) => <CreateUser history={history} />}
            />
            <Route
              path="/users/topRanked"
              render={() => <Users users={topUsers ? topUsers : users} />}
            />
            <Route
              path="/users/:id"
              render={({ history, match }) => (
                <CreateUser
                  history={history}
                  id={match.params.id}
                  user={users.find(user => user.id === match.params.id * 1)}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
