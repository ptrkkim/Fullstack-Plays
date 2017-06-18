// ACTIONS \\
const SET_NAME = 'SET_NAME';
const SET_COLOR = 'SET_COLOR';
const DO_NOTHING = 'DO_NOTHING';

const colors = {
  red: '#FF0000',
  orange: '#FF7F50',
  blue: '#0000FF',
  green: '#008000',
  purple: '#8A2BE2',
  pink: '#FF69B4'
};
const randomColorIndex = Math.floor(Math.random() * 6);
const randomDefaultColor = Object.values(colors)[randomColorIndex];
const defaultSender = {
  name: '',
  colorCode: randomDefaultColor
};
const checkHexCode = code => {
  // some wild regex function, thanks smamatti from stackoverflow..
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(code);
};

// ACTION CREATORS BELOW \\
export const setName = name => ({type: SET_NAME, name });
export const setColor = color => {
  if (colors[color]) {
    return ({type: SET_COLOR, colorCode: colors[color] });
  }
  else if (checkHexCode(color)) {
    return ({type: SET_COLOR, colorCode: color });
  }
  else {
    return ({ type: DO_NOTHING });
  }
};

// REDUCER BELOW \\
export default function (state = defaultSender, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, { name: action.name });
    case SET_COLOR:
      return Object.assign({}, state, { colorCode: action.colorCode});
    default:
      return state;
  }
}
