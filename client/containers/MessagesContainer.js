import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom () {
    console.log('before scroll:', this.scrollRef.scrollTop);
    this.scrollRef.scrollIntoView({ behavior: 'smooth' });
    console.log('after scroll:', this.scrollRef.scrollTop);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div>
        <MessagesList messages={this.props.messages} />
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.scrollRef = el; }}
        />
      </div>
    );
  }
}

const mapState = ({ messages }) => {
  return { messages };
};

export default connect(mapState)(MessagesContainer);
