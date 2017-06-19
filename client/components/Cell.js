import React from 'react';
import techLinks from '../../public/techstack';

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

  const buildImgStyles = (tech) => {
    return {
      width: '50%',
      height: '50%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundImage: `url(${techLinks[tech]})`
    };
  };

  const getContentStyle = contentType => {
    switch (contentType) {
      case 'player':
        return playerStyles;
      default:
        return blankStyles;
    }
  };

  const buildImgs = (tech) => {
    switch (tech) {
      case 'js':
        return buildImgStyles('js');
      case 'react':
        return buildImgStyles('react');
      case 'node':
        return buildImgStyles('node');
      case 'css':
        return buildImgStyles('css');
      case 'io':
        return buildImgStyles('io');
      case 'redux':
        return buildImgStyles('redux');
      case 'html':
        return buildImgStyles('html');
      case 'sql':
        return buildImgStyles('sql');
      default:
        return null;
    }
  };

  return (
    <div style={cellStyles}>
      <div style={contentStyles}>
        <div style={techLinks[content] ? buildImgs(content) : getContentStyle(content)}>
        </div>
      </div>
    </div>
  );
};

export default Cell;
