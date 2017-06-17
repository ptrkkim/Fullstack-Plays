import React from 'react';
import { connect } from 'react-redux';
// import Row from './Row';

const Board = ({ board }) => {

  const tableStyles = {
    margin: `0 auto`
  };

  const tdStyles = {
    border: `1px solid #ddd`,
    width: `18px`,
    height: `18px`
  };

  return (
    <div>
      <table style={tableStyles}>
      {board && Object.values(board.grid).map((row, rInd) => {
        const rowKey = `row${rInd}`;
        return (
          <tr key={`row${rInd}`}>
            {
              Object.values(row).map((col, cInd) => {
                const colKey = `col${cInd}`;
                return (
                  <td
                  key={`${rowKey}-${colKey}`}
                  style={tdStyles}
                  >
                    {board.grid[rowKey][colKey]}
                  </td>);
              })
            }
          </tr>
          );
      })}
      </table>
    </div>
  );
};

const mapState = ({ board }) => {
  return { board };
};

export default connect(mapState)(Board);
// later: calculate li height * number of messages
// .animate scrolltop: height
