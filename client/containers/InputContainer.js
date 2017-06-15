import React, { Component } from 'react';
import ChatInput from '../components/ChatInput';
import { addMessage } from '../reducer/messages';
import { connect } from 'react-redux';
// import io from 'socket.io-client';

// const socket = io.connect(window.location.host, { reconnect: true });
// // window.location.host was needed to make it work on Heroku, where I don't know the host port
// socket.on('connect', () => {
//   console.log('socket connected');
// });

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
    this.props.addMessage({
      sender: 'stackBot',
      text: this.state.inputValue
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
