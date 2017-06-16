import { browserHistory } from 'react-router';

const NEW_NUMBER = 'NEW_NUMBER';

const defaultNumber = 0;

export const newNumber = number => ({type: NEW_NUMBER, number });

export default function (state = defaultNumber, action) {
  switch (action.type) {
    case NEW_NUMBER:
      return action.number;
    default:
      return state;
  }
}

