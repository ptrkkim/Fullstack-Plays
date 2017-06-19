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

const Main = ({ count, name, inProgress, timeRemaining, victory }) => {
  return (
    <div>
      <Col xs={12} md={8}>
        <h2>Fullstack Plays</h2>
        {
          inProgress
            ? (
              <div>
                <h3>Learn all the technologies before time runs out!</h3>
                <h3>Time remaining: <strong>{`${timeRemaining}`}</strong></h3>
              </div>
              )
            : null
        }
        <h5>
          {
            count === 1
              ? `There is only one, very lonely player.`
              : `There are ${count} players.`
          }
        </h5>
        {
          !name
          ? <h5>Pick a name and join them!</h5>
          : null
        }
        {
          victory === null
            ? <Board />
            : (
              <div>
            {
              victory === 'victory'
                ? <h1>You did it! Now go get a job.</h1>
                : null
            }
            {
              victory === 'failure'
                ? (
                  <div>
                    <img
                      style={{display: 'inline'}}
                      src='https://emoji.slack-edge.com/T024FPYBQ/david-dance/8f48ecef243b3270.png'
                    />
                    <h1>You ran out of time!<br />You'll all be repeating senior phase.</h1>
                  </div>
                  )
                : null
            }
          </div>
          )
        }
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

const mapState = ({ players, sender, gameStatus }) => ({
  count: players.count,
  name: sender.name,
  inProgress: gameStatus.inProgress,
  timeRemaining: gameStatus.timeRemaining,
  victory: gameStatus.victory
});

export default connect(mapState)(Main);
