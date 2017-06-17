import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import Messages from './Messages';
// import InputContainer from '../containers/InputContainer';
import Sidebar from './Sidebar';
// import Numbers from '../components/Numbers';
// <Numbers />
import Board from '../components/Board';
import { Col } from 'react-bootstrap';

const Main = props => {
  return (
    <div>
      <h1>Fullstack Plays</h1>
      <Col xs={12} md={8}>
        <Board />
      </Col>
      <Col xs={12} md={4}>
        <Sidebar />
      </Col>
    </div>
  );
};

Main.propTypes = {
};

const mapState = ({ team }) => ({
  team
});

// const mapDispatch = dispatch => ({
// });

export default connect(mapState)(Main);

