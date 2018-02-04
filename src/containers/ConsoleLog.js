import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearConsole } from '../actions/index';
import Logs from '../components/Logs/Logs';

const ConsoleLog = (props) => (
  <Logs {...props}/>
);

const mapStateToProps = ({ logs }) => {
  return { logs };
};

const mapDispatchToProps = (dispatch) => ({
  onClearConsole: () => dispatch(clearConsole())
});

ConsoleLog.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      logType: PropTypes.string
    })
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleLog);
