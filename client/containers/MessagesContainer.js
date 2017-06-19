import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessagesList from '../components/MessagesList';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    const magicOffsetNumber = 3.6363635063171387;
    const node = this.container;
    this.shouldScroll = node.scrollTop + magicOffsetNumber + node.offsetHeight >= node.scrollHeight;
  }

  componentDidUpdate() {
    const node = this.container;
    if (this.shouldScroll) {
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const containerStyles = {
      overflowY: 'scroll',
      height: 'inherit'
    };

    return (
      <div style={containerStyles} ref={ele => { this.container = ele; }}>
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
