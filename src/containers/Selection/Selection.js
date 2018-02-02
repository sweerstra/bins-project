import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addAndSelectBin,
  addLog,
  clearConsole,
  editBin,
  fetchSingleBin,
  saveBin,
  selectBin,
  selectBinByID
} from '../../actions/index';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import images from '../../assets/images';
import './Selection.css';
import ConsoleLog from '../../components/ConsoleLog/ConsoleLog';
import LibraryList from '../LibraryList';

class SelectionContainer extends Component {
  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = { selection: '', editing: false };
  }

  static formatLog(log) {
    if (log === undefined) return 'undefined';
    if (log === null) return 'null';
    if (typeof log === 'object') return JSON.stringify(log);
    return log;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);

    window.log = (...messages) => {
      this.props.onAddLog(`>> ${messages.map(SelectionContainer.formatLog).join(' ')}`, 'code');
      console.log(...messages);
    };

    const { binId } = this.props.match.params;
    console.log(binId, 'in mount');
    if (binId) {
      this.props.onFetchSingleBin(binId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.binId === this.props.match.params.binId) return;

    const { binId } = this.props.match.params;

    if (binId) {
      this.props.onSelectBinById(binId);
    } else {
      this.props.onSelectBin({ _id: '', name: '', selection: '' });
    }

    if (this.editingInput) {
      this.editingInput.focus();
      const { selectedBin } = this.props;
      this.editingInput.value = selectedBin.name;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedBin._id === nextProps.selectedBin._id) return;

    const { selectedBin: { selection } } = nextProps;
    this.setState({ selection });
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

  render() {
    const { selection, editing } = this.state;
    const { selectedBin: { _id, name }, logs } = this.props;
    const selectedBinName = _id ? name : 'Empty bin';

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
             src={images.save}
             onClick={this.saveBinNameClick.bind(this)}
             alt="Save Bin"/>
      </div>
      : <div
        className={`edit-bin-name clickable`}
        onClick={this.edit.bind(this)}>
        <span>{selectedBinName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
        </svg>
      </div>;

    return (
      <main className="Selection-Container">
        <div className="selection">
          <div className="selection-header">
            {binNameEditor}
            <div className="icon-buttons" style={{ width: '120px' }}>
              <img className="clickable"
                   src={images.play}
                   onClick={this.runCode.bind(this)}
                   title="Run Code (Ctrl+Enter)"
                   alt="Run Code"/>
              {!editing && <img className="clickable"
                                src={images.save}
                                onClick={this.saveBin.bind(this)}
                                title="Save (Ctrl+S)"
                                alt="Save"/>}
              <img className="clickable"
                   src={images.share}
                   onClick={this.shareCode.bind(this)}
                   title="Share Code"
                   alt="Share Code"/>
            </div>
          </div>
          <div className="selection-editor">
            <AceEditor
              style={{ height: '100%', width: '100%' }}
              mode="javascript"
              theme="tomorrow"
              onChange={this.onChange.bind(this)}
              fontSize={16}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={selection}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2
              }}/>
          </div>
        </div>
        <ConsoleLog
          logs={logs}
          onClearConsole={this.props.onClearConsole}/>
        <LibraryList/>
      </main>
    );
  };

  saveBinNameClick() {
    const { selectedBin: { _id } } = this.props;

    if (this.editingInput) {
      const { value } = this.editingInput;
      if (!_id) {
        this.saveEmptyBin(value);
      } else {
        this.editBinName(_id, value);
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
    this.props.onAddAndSelectBin(name, this.state.selection);
  }

  editBinName(_id, name) {
    const { onEditBin, onSelectBinById } = this.props;
    onEditBin(_id, name);
    onSelectBinById(_id);
  }

  runCode() {
    const { selection } = this.state;
    if (!selection) return;
    const { onAddLog } = this.props;

    try {
      eval(`(function() { ${selection} })()`);
    } catch (e) {
      console.error(e.message);
      onAddLog(e.message, 'error');
    }
    onAddLog(null, 'break');
  }

  onChange(selection) {
    this.setState({ selection });
  }

  edit() {
    this.setState(state => ({ ...state, editing: true }));
  }

  saveBin() {
    const { selection } = this.state;
    const { selectedBin: { _id }, onSaveBin } = this.props;

    if (!_id) {
      this.edit();
    } else {
      onSaveBin(_id, selection);
    }
  }

  shareCode() {
    console.log(this.state.selection);
  }
}

SelectionContainer.propTypes = {
  selectedBin: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    selection: PropTypes.string
  }),
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      logType: PropTypes.string
    })
  )
};

const mapStateToProps = ({ bins: { selectedBin }, logs }) => {
  return ({ selectedBin, logs });
};

const mapDispatchToProps = (dispatch) => ({
  onFetchSingleBin: (_id) => dispatch(fetchSingleBin(_id)),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onSelectBinById: (_id) => dispatch(selectBinByID(_id)),
  onEditBin: (_id, name) => dispatch(editBin(_id, name)),
  onAddAndSelectBin: (name, selection) => dispatch(addAndSelectBin(name, selection)),
  onSaveBin: (_id, selection) => dispatch(saveBin(_id, selection)),
  onAddLog: (message, logType) => dispatch(addLog(message, logType)),
  onClearConsole: () => dispatch(clearConsole())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
