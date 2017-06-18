// ACTIONS BELOW \\
const ADD_MESSAGE = 'ADD_MESSAGE';

// ACTION CREATORS BELOW \\
const defaultMessages = [{
  sender: 'StackBot',
  color: '#000000',
  message: 'Welcome to the server! Pick a name and start chatting!'
}];

export const addMessage = message => ({type: ADD_MESSAGE, message });

// REDUCER BELOW \\
export default function (state = defaultMessages, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}

