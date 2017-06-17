import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from './Messages';
import InputContainer from '../containers/InputContainer';
import Numbers from '../components/Numbers';
// import GameBoardContainer from '../containers/GameBoard';
// Component //

const Main = props => {
  const initMessages = [{
  id: 0,
  sender: 'stackBot',
  text: 'Welcome to the game!'
}]
  return (
    <div>
      <h1>stack.tv</h1>
      <Numbers />
      <Messages />
      <InputContainer />
    </div>
  );
};

Main.propTypes = {
};

// Container //

const mapState = ({ team }) => ({
  team
});

// const mapDispatch = dispatch => ({
// });

export default connect(mapState)(Main);

