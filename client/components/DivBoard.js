import React from 'react';
import { connect } from 'react-redux';
import Row from './Row';

const Board = ({ board }) => {

  const boardContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    lineHeight: '0',
    fontSize: '0px'
  };

  const gridStyles = {
    width: '70vmin',
    height: '70vmin',
    border: '1px solid #bbb'
  };

// BOARD IS THE GRID OBJECT, AND ONLY THE GRID OBJECT
  return (
    <div style={boardContainerStyles}>
      <div id="grid" style={gridStyles}>
        {
          board && Object.values(board).map((row, rInd) => {
            return <Row key={`row${rInd}`} columns={row} />;
          })
        }
      </div>
    </div>
  );
};

const mapState = ({ board }) => {
  return { board };
};

export default connect(mapState)(Board);
// later: calculate li height * number of messages
// .animate scrolltop: height
