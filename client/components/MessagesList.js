import React from 'react';
import { connect } from 'react-redux';

// sender has two props: name and color
const MessagesList = ({ messages, sender }) => {

  // text color #19171c;
  const ulStyles = {
    listStyleType: 'none'
  };

  const liStyles = {
    padding: '5px 10px'
  };

  return (
    <div>
      <ul id="messages" style={ulStyles}>
        {
          messages.map((message, i) => {
            const shaded = i % 2 === 1 ? '#eee' : 'fff';
            const style = Object.assign({}, liStyles, {background: shaded});

            return (
              <li style={style} key={i}>
                {`${message.sender}: ${message.text}`}
              </li>
            );
        })
        }
      </ul>
    </div>
  );
};

const mapState = ({ messages, sender }) => {
  return { messages, sender };
};

export default connect(mapState)(MessagesList);
// later: calculate li height * number of messages
// .animate scrolltop: height