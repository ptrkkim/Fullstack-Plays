import React from 'react';
import { connect } from 'react-redux';

// sender has two props: name and color
const MessagesList = ({ messages }) => {

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
            const nameStyle = {
              fontWeight: 600,
              color: message.color
            };

            return (
              <li style={liStyles} key={i}>
                {/* `${message.sender}: ${message.text}`*/}
                <span style={nameStyle}>{`${message.sender}`}</span>
                <span>: </span>
                <span>{`${message.text}`}</span>
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

export default connect(mapState)(MessagesList);
// later: calculate li height * number of messages
// .animate scrolltop: height


// return (
// <span style={nameStyle}>{`${message.sender}`}</span>
// <span>:</span>
// <span>{`${message.text}`}</span>
// )
