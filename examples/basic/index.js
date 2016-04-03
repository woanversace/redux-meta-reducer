import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createMeta from 'redux-meta-reducer';

const initialState = {
  users: [],
};

function resource(state = initialState, action = {}) {
  switch (action.type) {
    case 'RECEIVE_USERS_SUCCESS':
      return { users: action.users };
    case 'RECEIVE_USERS_FAILURE':
      return { users: [] };
    default:
      return state;
  }
}

// create the root reducer
const reducer = combineReducers({
  meta: createMeta({
    request: 'REQUEST_USERS',
    success: 'RECEIVE_USERS_SUCCESS',
    failure: 'RECEIVE_USERS_FAILURE',
  }),
  resource,
});

// example action creators
function requestUsers() {
  return { type: 'REQUEST_USERS' };
}

function receiveUsersSuccess(users) {
  const now = (new Date()).toISOString();
  return { type: 'RECEIVE_USERS_SUCCESS', users, now };
}

function receiveUsersFailure(error) {
  const now = (new Date()).toISOString();
  return { type: 'RECEIVE_USERS_FAILURE', error, now };
}

const store = createStore(reducer, applyMiddleware(createLogger()));

// see the developer console for logging of previous/current states
store.dispatch(requestUsers());
store.dispatch(receiveUsersSuccess(['me', 'you']));

store.dispatch(requestUsers());
store.dispatch(receiveUsersFailure({ msg: 'Ah! Error!' }));

store.dispatch(requestUsers());
store.dispatch(receiveUsersSuccess(['him', 'her']));