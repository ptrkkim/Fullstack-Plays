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
    <div>
      <MessagesList />
      <InputContainer />
    </div>
  );
};

export default Sidebar;
