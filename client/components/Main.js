import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Messages from './Messages';
import InputContainer from '../containers/InputContainer';
import Numbers from '../components/Numbers';
import Board from '../components/Board';
import DivBoard from '../components/DivBoard';
// import GameBoardContainer from '../containers/GameBoard';
// Component //

const Main = props => {
  return (
    <div>
      <h1>stack.tv</h1>
      <Numbers />
      <DivBoard />
      {/* <Board /> */}
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

