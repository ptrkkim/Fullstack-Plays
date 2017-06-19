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

const Main = ({ count, name }) => {
  return (
    <div>
      <Col xs={12} md={8}>
        <h2>Fullstack Plays</h2>
        <h5>{
          count === 1
            ? `There is only one, very lonely player.`
            : `There are ${count} players.`
        }</h5>
        {
          !name
          ? <h5>Pick a name and join them!</h5>
          : null
        }
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

const mapState = ({ players, sender }) => ({
  count: players.count,
  name: sender.name
});

export default connect(mapState)(Main);
