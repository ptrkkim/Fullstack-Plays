import React from 'react';
import MessagesList from './MessagesList';
import InputContainer from '../containers/InputContainer';

const Sidebar = (props) => {
  // const ulStyles = {
  //   listStyleType: 'none'
  // };

  // const liStyles = {
  //   padding: '5px 10px'
  // };
  const msgBackground = {
    width: '300%',
    backgroundColor: 'whitesmoke',
    marginTop: '10px',
    borderRadius: '5px',
    height: '90vh'
  };

  return (
    <div style={{backgroundClip: 'content-box', width: 'inherit'}}>
      <div style={msgBackground}>
        <MessagesList />
      </div>
      <div style={{width: 'inherit'}}>
        <InputContainer />
      </div>
    </div>
  );
};

export default Sidebar;
