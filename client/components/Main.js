import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Component //

const Main = props => {

  return (
    <div>
      <h1>stack.tv</h1>
    </div>
  );
};

Main.propTypes = {
};

// Container //

const mapState = ({ team }) => ({
  team
});

// const mapDispatch = dispatch => ({
// });

export default connect(mapState)(Main);

