import React, { Component, Fragment } from 'react';
import Users from './Users';
import Nav from './Nav';
import CreateUser from './CreateUser';
import { HashRouter as Router, Route } from 'react-router-dom';
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
            path="/users/create"
            render={({ history }) => <CreateUser history={history} />}
          />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
