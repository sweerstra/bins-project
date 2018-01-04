import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearConsole } from '../../actions/index';
import './ConsoleLog.css';
import images from '../../assets/index';

const ConsoleLog = ({ logs, onClearConsole }) => (
  <div className="console">
    <div className="console-header">
      Log
      <div className="icon-buttons">
        <img src={images.trash}
             className="clickable"
             onClick={() => onClearConsole()}
             alt="Clear Console Log"/>
        <img src={images.info}
             title="Use the log function in your code to access this log"
             alt="Console Log Info"/>
      </div>
    </div>
    <div className="console-log">
      {logs.map(({ message, logType }, index) =>
        logType === 'break'
          ? <br key={index}/>
          : <div className={logType === 'error' ? 'error log' : 'log'} key={index}>
            {message}
          </div>
      )}
    </div>
  </div>
);

ConsoleLog.propTypes = {
  logs: PropTypes.array
};

const mapStateToProps = ({ logs }) => ({ logs });

const mapDispatchToProps = (dispatch) => ({
  onClearConsole: () => dispatch(clearConsole())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleLog);
