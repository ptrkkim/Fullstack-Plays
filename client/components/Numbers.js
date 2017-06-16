import React from 'react';
import { connect } from 'react-redux';

const Numbers = ({ number }) => {

  return (
    <div>
      <h2>{number}</h2>
    </div>
  );
};

const mapState = (state) => {
  return {number: state.number};
};

export default connect(mapState)(Numbers);
