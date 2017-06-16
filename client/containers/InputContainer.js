import React, { Component } from 'react';
import ChatInput from '../components/ChatInput';
import { addMessage } from '../reducer/messages';
import { connect } from 'react-redux';
import { clientSocket } from '../clientSocket';
// import io from 'socket.io-client';

// const clientSocket = io(window.location.host, { reconnect: true });

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage (message) {
      dispatch(addMessage(message));
    }
  };
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
    if (!this.state.inputValue.length) return;

    const text = this.state.inputValue;
    const commands = {
      up: 'up'
      // down: 'down',
      // left: 'left',
      // right: 'right'
    };

    // emits a command if input is a valid game command
    if (commands[text]) {
      clientSocket.emit('command', text);
    }

    // messaging logic, always happens
    clientSocket.emit('newMsg', {
      sender: 'stackBot',
      text
    });

    this.setState({ inputValue: '' });
  }

  render () {
    const inputValue = this.state.inputValue;
    let warning = '';

    if (!inputValue) warning = 'Type something!';

    return (
      <ChatInput
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        inputValue={inputValue}
        warning={warning}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InputContainer);
