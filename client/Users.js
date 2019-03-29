import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
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
            <button className="btn btn-warning">Delete</button>
            <Link to={`/users/${user.id}`}>Edit</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Users;
