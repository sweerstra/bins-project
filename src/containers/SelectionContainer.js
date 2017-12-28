import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin, editBin, saveBin } from '../actions';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import assets from '../assets';

class SelectionContainer extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = { selection: '', logs: [] };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);

    const consoleLog = console.log;
    console.log = (message) => {
      this.addLog(`>> ${message}`, 'code');
      consoleLog(message);
    };
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      this.save();
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode === 13) {
      this.runCode();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedBin.id === nextProps.selectedBin.id) return;

    const { selectedBin: { selection } } = nextProps;
    this.setState({ selection });
  }

  render() {
    const { selection, logs } = this.state;
    const { selectedBin: { id, name } } = this.props;
    const selected = id ? name : 'Empty bin';

    return (
      <main>
        <div className="selection">
          <div className="selection-header">
            <div
              className={id ? 'clickable' : ''}
              onClick={this.edit.bind(this)}>{selected}
            </div>
            <div className="selection-header-buttons">
              <img className="clickable"
                   src={assets.save}
                   onClick={this.save.bind(this)}
                   title="Save (Ctrl+S)"
                   alt="Save"/>
              <img className="clickable"
                   src={assets.play}
                   onClick={this.runCode.bind(this)}
                   title="Run Code (Ctrl+Enter)"
                   alt="Run Code"/>
            </div>
          </div>
          <div className="selection-editor">
            <AceEditor
              style={{ height: '100%', width: '100%' }}
              mode="javascript"
              theme="tomorrow"
              onChange={this.onChange.bind(this)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={selection}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}/>
          </div>
        </div>
        <div className="console">
          <div className="console-header">
            Console Log
            <img src={assets.info}
                 title="Use the console.log function in your code to access this log"
                 alt="Console Log Info"/>
          </div>
          <div className="console-log">
            {logs.map(({ message, type }, index) =>
              type === 'break'
                ? <br key={index}/>
                : <div className={type === 'error' ? 'error log' : 'log'} key={index}>
                  {message}
                </div>
            )}
          </div>
        </div>
      </main>
    );
  };

  edit() {
    const { selectedBin, dispatch } = this.props;
    const bin = prompt(`Edit bin name (${selectedBin.name})`);
    if (bin) {
      dispatch(editBin(selectedBin.id, bin));
    }
  }

  save() {
    const { selection } = this.state;
    const { selectedBin: { id }, dispatch } = this.props;

    if (id === 0) {
      const bin = prompt('Choose name for this bin');
      if (bin) {
        dispatch(addAndSelectBin(bin, selection));
      }
    } else {
      dispatch(saveBin(id, selection));
    }
  }

  runCode() {
    const { selection } = this.state;
    if (!selection) return;

    try {
      eval(`(function() { ${selection} })()`);
    } catch (e) {
      console.error(e.message);
      this.addLog(e.message, 'error');
    }
    this.addLog(null, 'break');
  }

  onChange(selection) {
    this.setState({ selection });
  }

  addLog(message, type) {
    this.setState(state => ({
      ...state,
      logs: [
        ...state.logs,
        { message, type }
      ]
    }));
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(SelectionContainer);
