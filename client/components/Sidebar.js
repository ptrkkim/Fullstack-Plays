import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';
import InputContainer from '../containers/InputContainer';

const Sidebar = (props) => {
  const ulStyles = {
    listStyleType: 'none'
  };

  const liStyles = {
    padding: '5px 10px'
  };

  return (
    <div>
      <MessagesList />
      <InputContainer />
    </div>
  );
};

const mapState = ({ Sidebar }) => {
  return { Sidebar };
};

export default connect(mapState)(Sidebar);
// later: calculate li height * number of Sidebar
// .animate scrolltop: height
