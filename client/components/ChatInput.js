import React from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

const ChatInput = ({ handleChange, handleSubmit, inputValue, warning, hasName }) => {
  const formStyles = {
      background: `#dbdee3`,
      padding: `0 17.5px 0 0`,
      position: `fixed`,
      bottom: 0,
      width: `inherit`
    };

  const inputStyles = {
    display: `inline-block`,
    padding: `6px 12px`,
    width: `84%`,
    margin: `0 .5% 0 0`
  };

  const buttonStyles = {
    display: `inline-block`,
    padding: `6px 1px`,
    marginBottom: `1px`,
    width: `12%`,
    background: `rgb(130, 224, 255)`
  };

  const placeholder = hasName ? 'Send a message...' : 'Pick a name!';
  return (
    <div style={formStyles}>
      <form onSubmit={handleSubmit}>
        <FormGroup role="form">
          <FormControl
            style={inputStyles}
            id="chatInput"
            placeholder={placeholder}
            type="text"
            onChange={handleChange}
            value={inputValue}
          />
          <Button
            style={buttonStyles}
            type="submit"
            disabled={!!warning || !inputValue}>
            Chat
          </Button>
        </FormGroup>
      </form>
    </div>
  );
};

export default ChatInput;
