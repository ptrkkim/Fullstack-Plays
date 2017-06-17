import React from 'react';
import { connect } from 'react-redux';
import Row from './Row';

const Board = ({ grid, size }) => {

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
      <div style={gridStyles}>
        {
          grid && Object.values(grid).map((row, rInd) => {
            return (<Row
              key={`row${rInd}`}
              columns={row}
              rInd={rInd}
              size={size} />);
          })
        }
      </div>
    </div>
  );
};

const mapState = ({ board }) => {
  return {
    grid: board.grid,
    size: board.size
  };
};

export default connect(mapState)(Board);
// later: calculate li height * number of messages
// .animate scrolltop: height
