import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';

const gotUsersFromServer = users => {
  return {
    type: GOT_USERS_FROM_SERVER,
    users,
  };
};

const destroyUser = user => {
  return {
    type: DELETE_USER,
    user,
  };
};

const addNewUser = user => {
  return {
    type: CREATE_USER,
    user,
  };
};

const fetchUsers = () => {
  return dispatch => {
    axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => {
        dispatch(gotUsersFromServer(users));
      });
  };
};

const deleteUser = user => {
  return dispatch => {
    axios.delete(`/api/users/${user.id}`, user).then(() => {
      dispatch(destroyUser(user));
    });
  };
};

const createUser = (userToAdd, history) => {
  console.log(userToAdd);
  return dispatch => {
    axios
      .post('/api/users', userToAdd)
      .then(response => response.data)
      .then(user => {
        dispatch(addNewUser(user));
      })
      .then(() => {
        //is there ever a chance the push can happen before the new user is added to the state?
        history.push('/users');
      });
  };
};

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_SERVER:
      return { ...state, users: action.users };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.user.id)],
      };
    case CREATE_USER:
      return { ...state, users: [...state.users, action.user] };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export { store, fetchUsers, deleteUser, createUser };
