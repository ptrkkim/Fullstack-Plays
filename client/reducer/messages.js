import { browserHistory } from 'react-router';

const ADD_MESSAGE = 'ADD_MESSAGE';

const defaultMessages = [{
  id: 0,
  sender: 'stackBot',
  text: 'Welcome to the game!'
}];

const addMessage = message => ({type: ADD_MESSAGE, message });

export default function (state = defaultMessages, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}
