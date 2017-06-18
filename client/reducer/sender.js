// ACTIONS \\
const SET_NAME = 'SET_NAME';
const SET_COLOR = 'SET_COLOR';
const DO_NOTHING = 'DO_NOTHING';

const colors = {
  red: '#FF0000',
  orange: '#FF7F50',
  yellow: '#d8d856',
  blue: '#0000FF',
  green: '#008000',
  purple: '#8A2BE2',
  pink: '#FF69B4'
};

const getRandomColor = () => {
  const randColorIndex = Math.floor(Math.random() * 7);
  return Object.values(colors)[randColorIndex];
};

export const isValidHexCode = code => {
  // some wild regex function, thanks smamatti from stackoverflow..
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(code);
};

const defaultSender = {
  name: '',
  color: ''
};


// ACTION CREATORS BELOW \\
export const setName = name => ({type: SET_NAME, name });
export const setColor = color => {
  if (colors[color]) {
    return ({type: SET_COLOR, color: colors[color] });
  }
  else if (isValidHexCode(color)) {
    return ({type: SET_COLOR, color });
  }
  else {
    return ({type: DO_NOTHING });
  }
};

// REDUCER BELOW \\
export default function (state = defaultSender, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name,
        color: getRandomColor()
      });
    case SET_COLOR:
      return Object.assign({}, state, { color: action.color});
    default:
      return state;
  }
}
