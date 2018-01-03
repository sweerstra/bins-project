import React from 'react';
import { connect } from 'react-redux';
import { clearConsole } from '../actions/index';
import assets from '../assets/index';

const ConsoleLog = ({ logs, onClearConsole }) => (
  <div className="console">
    <div className="console-header">
      Console Log
      <img src={assets.trash}
           className="clickable"
           onClick={() => onClearConsole()}
           alt="Clear Console Log"/>
      <img src={assets.info}
           title="Use the console.log function in your code to access this log"
           alt="Console Log Info"/>
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

const mapStateToProps = ({ logs }) => ({ logs });

const mapDispatchToProps = (dispatch) => ({
  onClearConsole: () => dispatch(clearConsole())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleLog);
