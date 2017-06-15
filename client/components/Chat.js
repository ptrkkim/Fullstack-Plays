import React from 'react';
import { connect } from 'react-redux';

const Chat = ({ messages }) => {
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

const mapState = ({ messages }) => {
  return { messages };
};

export default connect(mapState)(Chat);
// later: calculate li height * number of messages
// .animate scrolltop: height
