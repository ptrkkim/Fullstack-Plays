import { browserHistory } from 'react-router';

const ADD_MESSAGE = 'ADD_MESSAGE';

const defaultMessages = [{
  sender: 'stackBot',
  text: 'Welcome to the game!'
}];

export const addMessage = message => ({type: ADD_MESSAGE, message });

export default function (state = defaultMessages, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}
