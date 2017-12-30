import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin, editBin, saveBin, selectBin } from '../../actions/index';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import assets from '../../assets/index';
import './SelectionContainer.css';

class SelectionContainer extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = { selection: '', editing: false, logs: [] };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);

    this.consoleLog = console.log;
    console.log = (...messages) => {
      this.addLog(`>> ${messages.join(' ')}`, 'code');
      this.consoleLog(...messages);
    };
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate() {
    if (this.editingInput) {
      this.editingInput.focus();
      const { selectedBin } = this.props;
      this.editingInput.value = selectedBin.name;
    }
  }

  onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      this.saveBin();
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
    const { selection, editing, logs } = this.state;
    const { selectedBin: { id, name } } = this.props;
    const selected = id ? name : 'Empty bin';

    const binNameEditor = editing
      ? <div className="add-bin">
        <input
          className="textbox"
          type="text"
          placeholder="Type bin name here..."
          spellCheck="false"
          onKeyDown={(e) => this.onBinNameKeyDown(e)}
          ref={(textbox) => {
            this.editingInput = textbox;
          }}/>
        <img className="clickable"
             src={assets.save}
             onClick={this.saveBinNameClick.bind(this)}
             alt="Save Bin"/>
      </div>
      : <div
        className={id ? 'clickable' : ''}
        onClick={this.edit.bind(this)}>{selected}
      </div>;

    return (
      <main className="Selection-Container">
        <div className="selection">
          <div className="selection-header">
            {binNameEditor}
            <div className="selection-header-buttons">
              {!editing && <img className="clickable"
                                src={assets.save}
                                onClick={this.saveBin.bind(this)}
                                title="Save (Ctrl+S)"
                                alt="Save"/>}
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
                showLineNumbers: true,
                tabSize: 2,
              }}/>
          </div>
        </div>
        <div className="console">
          <div className="console-header">
            Console Log
            <img src={assets.trash}
                 className="clickable"
                 onClick={this.clearConsole.bind(this)}
                 alt="Clear Console Log"/>
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

  saveBinNameClick() {
    const { selectedBin: { id } } = this.props;

    if (this.editingInput) {
      const { value } = this.editingInput;
      if (id === 0) {
        this.saveEmptyBin(value);
      } else {
        this.editBinName(id, value);
      }
    }

    this.setState({ editing: false });
  }

  onBinNameKeyDown(event) {
    if (event.keyCode === 13) {
      this.saveBinNameClick();
    }
  }

  saveEmptyBin(name) {
    const { selection } = this.state;
    const { dispatch } = this.props;

    dispatch(addAndSelectBin(name, selection));
  }

  editBinName(id, name) {
    const { dispatch } = this.props;
    dispatch(editBin(id, name));
    dispatch(selectBin({ id, name }));
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

  clearConsole() {
    this.setState(state => ({ ...state, logs: [] }));
  }

  onChange(selection) {
    this.setState({ selection });
  }

  edit() {
    this.setState(state => ({ ...state, editing: true }));
  }

  saveBin() {
    const { selection } = this.state;
    const { selectedBin: { id }, dispatch } = this.props;

    if (id === 0) {
      this.edit();
    } else {
      dispatch(saveBin(id, selection));
    }
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
