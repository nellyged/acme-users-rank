import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ topUsers, location: { pathname } }) => {
  const tabs = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Users',
      path: '/users',
    },
    {
      title: 'Create A User',
      path: '/users/create',
    },
  ];
  if (topUsers) {
    tabs.push({
      title: `Top Ranked (${
        topUsers.reduce((acc, user) => {
          if (acc.names) {
            acc.names = acc.names.concat(` ${user.name}`);
          } else {
            acc.names = user.name;
          }
          return acc;
        }, {}).names
      })`,
      path: '/users/topRanked',
    });
  }
  return (
    <ul className="nav nav-tabs" style={{ marginBottom: '10px' }}>
      {tabs.map(tab => (
        <li className="nav-item" key={tab.title}>
          <Link
            to={tab.path}
            className={`nav-link ${tab.path === pathname ? 'active' : ''}`}
          >
            {tab.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
