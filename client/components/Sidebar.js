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

  return (
    <div style={{width: 'inherit'}}>
      <div style={{width: '300%'}}>
        <MessagesList />
      </div>
      <div style={{width: 'inherit'}}>
        <InputContainer />
      </div>
    </div>
  );
};

export default Sidebar;
