import React from 'react';

const ChatInput = (props) => {

  const formStyles = {
      background: `#000`,
      padding: `3px`,
      position: `fixed`,
      bottom: 0,
      width: `100%`
    };

  const inputStyles = {
    border: 0,
    padding: `10px`,
    width: `90%`,
    margin: `0 .5% 0 0`
  };

  const buttonStyles = {
    width: `9%`,
    background: `rgb(130, 224, 255)`,
    border: `none`,
    padding: `10px`
  };

  return (
    <form action="" style={formStyles}>
      <input
        id="chatInput"
        autoComplete="off"
        placeholder="Send a message..."
      />
      <button>Send</button>
    </form>
  );
};

export default ChatInput;