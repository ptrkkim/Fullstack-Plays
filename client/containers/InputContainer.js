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

    // should i assume name has already been validated?
    if (!name) {
      dispatchName(text);
      // console.log(store.getState().sender.name);
      emitPickName(store.getState().sender.name);
      return this.setState({ inputValue: '' }); // set name and stop
    }

    if (text.slice(0, 6).toLowerCase() === '/color') {
      dispatchColor(text.slice(7));
      return this.setState({ inputValue: ''});
    }

    else if (isCommand(text)) emitCommand(text.toUpperCase());

    emitMessage(name, color, text);
    this.setState({ inputValue: '' });
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
