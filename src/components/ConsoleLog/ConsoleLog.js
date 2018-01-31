import React from 'react';
import images from '../../assets/images';
import './ConsoleLog.css';

const ConsoleLog = ({ logs, onClearConsole }) => (
  <div className="console">
    <div className="console-header">
      Log
      <div className="icon-buttons">
        <img src={images.trash}
             className="clickable"
             onClick={onClearConsole}
             alt="Clear Console Log"/>
        <img src={images.info}
             title="Use the log() function in your code to access this log"
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

export default ConsoleLog;
