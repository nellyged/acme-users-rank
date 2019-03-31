import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';
const USER_EDITED = 'USER_EDITED';
const USER_FORM_ERROR = 'USER_FORM_ERROR';

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

const addUser = user => {
  return {
    type: CREATE_USER,
    user,
  };
};

const editUser = user => {
  return {
    type: USER_EDITED,
    user,
  };
};

const errorsOnSave = errors => {
  return {
    type: USER_FORM_ERROR,
    errors,
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

const createEditUser = (userToCreateEdit, history) => {
  return dispatch => {
    axios[userToCreateEdit.id ? 'put' : 'post'](
      `/api/users${userToCreateEdit.id ? `/${userToCreateEdit.id}` : ''}`,
      userToCreateEdit
    )
      .then(response => response.data)
      .then(user => {
        //noticed on a put the rank comes back as a string then converts to an integer on a refresh ... not sure why?
        user.rank = user.rank * 1;
        if (userToCreateEdit.id) {
          dispatch(editUser(user));
        } else {
          dispatch(addUser(user));
        }
      })
      .then(() => {
        //is there ever a chance the push can happen before the new user is added to the state?
        history.push('/users');
      })
      .catch(ex => {
        dispatch(errorsOnSave(ex.response.data.errors));
      });
  };
};

const initialState = {
  users: [],
  userFormErrors: [],
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
    case USER_EDITED:
      return {
        ...state,
        users: [
          ...state.users.filter(user => user.id !== action.user.id),
          action.user,
        ],
      };
    case USER_FORM_ERROR:
      return { ...state, userFormErrors: action.errors };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export { store, fetchUsers, deleteUser, createEditUser };
