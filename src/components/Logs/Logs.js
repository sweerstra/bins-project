import React from 'react';
import images from '../../assets/images';
import './Logs.css';

const Logs = ({ logs, onClearConsole }) => (
  <div className="console">
    <div className="console__header">
      Log
      <img src={images.trash}
           className="clickable"
           onClick={onClearConsole}
           alt="Clear Console Log"/>
      <img src={images.info}
           className="clickable"
           title="Use the log() function in your code to access this log"
           alt="Console Log Info"/>
    </div>
    <div className="console__log">
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

export default Logs;
