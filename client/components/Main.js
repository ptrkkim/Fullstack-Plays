import React from 'react';
import { connect } from 'react-redux';
// import Messages from './Messages';
// import InputContainer from '../containers/InputContainer';
import Sidebar from './Sidebar';
// import Numbers from '../components/Numbers';
// <Numbers />
import Board from '../components/Board';
import { Col } from 'react-bootstrap';

const sideColStyles = {
  backgroundColor: '#dbdee3',
  height: '100vh'
};

const Main = props => {
  return (
    <div>
      <Col xs={12} md={8}>
        <h2>Fullstack Plays</h2>
        <Board />
      </Col>
      <div >
        <Col style={sideColStyles} xs={12} md={4}>
          <Sidebar />
        </Col>
      </div>
    </div>
  );
};

Main.propTypes = {
};

const mapState = ({ team }) => ({
  team
});

// sidebarcol: find a height, background-color: whitesmoke, background-clip content-box

export default connect(mapState)(Main);

