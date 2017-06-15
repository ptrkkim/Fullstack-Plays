import React from 'react';

const ChatInput = ({ handleChange, handleSubmit, inputValue, warning }) => {

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
    <div>
      <form style={formStyles} onSubmit={handleSubmit}>
        <fieldset>
          <input
            id="chatInput"
            type="text"
            placeholder="Send a message..."
            onChange={handleChange}
            value={inputValue}
          />
          <button type="submit">Send</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ChatInput;
