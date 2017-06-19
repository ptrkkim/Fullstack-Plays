import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import InputContainer from '../containers/InputContainer';

const Sidebar = (props) => {
  const msgBackground = {
    backgroundColor: 'whitesmoke',
    marginTop: '10px',
    borderRadius: '5px',
    height: '81vh'
  };

  return (
    <div style={{backgroundClip: 'content-box', width: 'inherit'}}>
      <div id="msgBg" style={msgBackground}>
        <MessagesContainer />
      </div>
      <div style={{width: 'inherit'}}>
        <InputContainer />
      </div>
    </div>
  );
};

export default Sidebar;
