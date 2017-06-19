import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import { clientSocket } from '../clientSocket';
import { setName, setColor } from '../reducer/sender';
import store from '../store';

const isCommand = text => {
  const commands = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
  };
  return commands[text.toUpperCase()];
};

const emitCommand = commandToSend => {
  clientSocket.emit('command', commandToSend);
};

const emitMessage = (name, color, text) => {
  clientSocket.emit('newMsg', { sender: name, color, text });
};

const emitPickName = name => {
  clientSocket.emit('pickName', name);
};

const emitStartGame = () => {
  clientSocket.emit('startGame');
};

const nameIsTaken = name => {
  const namesArray = Object.keys(store.getState().players.names);
  return namesArray.find(nameKey => nameKey.toLowerCase() === name.toLowerCase());
};

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { name, color, dispatchName, dispatchColor } = this.props;
    const text = this.state.inputValue;
    const { inProgress } = store.getState().gameStatus.inProgress;
    const clearInput = () => this.setState({ inputValue: '' });

    // assumes that submit is disabled for taken names
    if (!name) {
      dispatchName(text);
      emitPickName(store.getState().sender.name);
      return clearInput(); // set name and stop
    }

    if (!inProgress && text === 'start') {
      emitStartGame();
      return clearInput();
    }

    if (text === '/rename') {
      dispatchName('');
      return clearInput();
    }

    if (text.slice(0, 6).toLowerCase() === '/color') {
      dispatchColor(text.slice(7));
      return clearInput();
    }

    else if (isCommand(text)) emitCommand(text.toUpperCase());

    emitMessage(name, color, text);
    clearInput();
  }

  render () {
    const inputValue = this.state.inputValue;
    let warning = '';

    if (!inputValue) warning = 'Type something!';
    // !this.props.name is TRUE when NO NAME e.g. in picking phase
    else if (!this.props.name && nameIsTaken(inputValue)) {
      warning = 'This name is taken!';
    }
    else if (!this.props.name && inputValue.length > 16) {
      warning = 'Name must be less than 16 characters';
    }

    return (
      <ChatInput
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        inputValue={inputValue}
        hasName={!!this.props.name}
        warning={warning}
      />
    );
  }
}

const mapState = ({ sender }) => ({
  name: sender.name,
  color: sender.color
});

const mapDispatch = dispatch => {
  return {
    dispatchName (name) { dispatch(setName(name)); },
    dispatchColor (color) { dispatch(setColor(color)); }
  };
};

export default connect(mapState, mapDispatch)(InputContainer);
