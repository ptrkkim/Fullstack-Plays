import React from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Popover,
  ButtonGroup,
  OverlayTrigger
} from 'react-bootstrap';

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

  const chatBtnStyles = {
    display: `inline-block`,
    padding: `6px 1px`,
    marginBottom: `1px`,
    width: `12%`,
    color: `white`,
    background: `#293241`
  };

  const howToBtnStyles = {
    width: '96.5%',
    backgroundColor: '#98C1D9'
  };

  const popBtnStyles = {
    width: '32.18%',
    backgroundColor: '#A8CCC9',
    borderColor: '#333'
  };

  const howToPopover = (
    <Popover id="instructionPop" title="Instructions">
      Type <strong>up</strong>, <strong>down</strong>, <strong>left</strong>, or <strong>right</strong> to help Geoff cool down.
      <br /> <br />
      The blue ice cubes cool him down, but watch out for traps!
    </Popover>
  );

  const namePopover = (
    <Popover id="nameChange" title="Need a new identity?">
      Typing <strong>/rename</strong> will let you pick a new name.
      <br /> <br />
      Names are unique, and need to be under 16 characters long.
    </Popover>
  );

  const colorPopover = (
    <Popover id="colors" title="Don't like your color?">
      Typing <strong>/color blue</strong> will change your name to blue.
      <br /> <br />
      <strong>Preset colors:</strong><br />
      red<br />
      orange<br />
      yellow<br />
      green<br />
      blue<br />
      purple<br />
      pink<br /> <br />
      <strong>Advanced:</strong><br />
      All valid hex codes will work! e.g. <strong>/color #0000FF</strong>
    </Popover>
  );

  const emotePopover = (
    <Popover id="emotes" title="Don't let your memes be dreams">
      To use emotes, type <strong>EmoteName</strong> (case sensitive!) anywhere in your message.
      <br /> <br />
      <strong>Valid emotes:</strong><br />
      HotGeoff<br />
      SweetDreams<br />
      Howard<br />
      David<br />
      Nimit<br />
      Bhong<br />
      Fullstack
    </Popover>
  );

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
            style={chatBtnStyles}
            type="submit"
            disabled={!!warning || !inputValue}>
            Chat
          </Button>
          {warning && warning !== 'Type something!' && (
            <HelpBlock>{warning}</HelpBlock>
          )
          }
          <ButtonGroup justified>
            <OverlayTrigger trigger="click" placement="left" overlay={howToPopover}>
              <Button style={howToBtnStyles}>How To Play</Button>
            </OverlayTrigger>
          </ButtonGroup>
          <ButtonGroup justified>
            <OverlayTrigger trigger="click" placement="left" overlay={namePopover}>
              <Button style={popBtnStyles}>Change Names</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="top" overlay={colorPopover}>
              <Button style={popBtnStyles}>Colors</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="top" overlay={emotePopover}>
              <Button style={popBtnStyles}>Emotes</Button>
            </OverlayTrigger>
          </ButtonGroup>
        </FormGroup>
      </form>
    </div>
  );
};

export default ChatInput;
