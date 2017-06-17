import React from 'react';

const Cell = ({ content, size }) => {

  const cellStyles = {
    display: 'inline-block',
    boxSizing: 'border-box',
    margin: '0',
    width: `${100 / size}%`,
    height: '100%',
    border: '1px solid #bbb'
  };

  const contentStyles = {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const blankStyles = {
    width: '50%',
    height: '50%',
    backgroundColor: 'transparent'
  };

  const playerStyles = {
    width: '50%',
    height: '50%',
    backgroundColor: '#555'
  };

  const getContentStyle = contentType => {
    switch (contentType) {
      case 'player':
        return playerStyles;
      default:
        return blankStyles;
    }
  };

  return (
    <div style={cellStyles}>
      <div style={contentStyles}>
        <div style={getContentStyle(content)} />
      </div>
    </div>
  );
};

export default Cell;
