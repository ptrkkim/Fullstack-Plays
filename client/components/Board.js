import React from 'react';
import { connect } from 'react-redux';
import Row from './Row';

const Board = ({ grid }) => {

  return (
    <div>
      {
      <Row rowId={index}/>
      }
    </div>
  );
};

const mapState = ({ grid }) => {
  return { grid };
};

export default connect(mapState)(Board);
// later: calculate li height * number of messages
// .animate scrolltop: height
