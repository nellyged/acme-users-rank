import React from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from './store';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return { deleteUserFromList: user => dispatch(deleteUser(user)) };
};

const Users = ({ users, deleteUserFromList }) => {
  return (
    <ul className="list-group">
      {users.map(user => (
        <li className="list-group-item" key={user.id}>
          {user.name}
          <br />
          {user.bio}
          <br />
          <span
            className="badge badge-success"
            style={{ marginBottom: '10px' }}
          >
            {`Ranked ${user.rank}`}
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-warning"
              onClick={() => deleteUserFromList(user)}
            >
              Delete
            </button>
            <Link to={`/users/${user.id}`}>Edit</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Users);
