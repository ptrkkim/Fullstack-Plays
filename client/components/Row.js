import React from 'react';
import Cell from './Cell';

const Row = ({ columns, size, rInd }) => {
  const rowStyles = {
    height: `${100 / size}%`,
    boxSizing: 'border-box'
  };

  return (
    <div style={rowStyles}>
      {
        columns && Object.values(columns).map((content, cInd) => {
          return (<Cell
            key={`row${rInd}-col${cInd}`}
            content={content}
            size={size}
            />);
          }
        )
      }
    </div>
  );
};

export default Row;
