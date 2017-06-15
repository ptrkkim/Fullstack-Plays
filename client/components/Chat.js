import React from 'react';

const Chat = ({ messages }) => {
  const ulStyles = {
    listStyleType: 'none'
  }
  return (
    <div>
      <ul id="messages" style={ulStyles}>
        {
          messages.map((message) => (
            <li key={message.id}>{`${message.sender}: ${message.text}`}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default Chat;
// later: calculate li height * number of messages
// .animate scrolltop: height
