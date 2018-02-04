import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addAndSelectBin,
  addLog,
  editBin,
  fetchSingleBin,
  saveBin,
  selectBin,
  selectBinByID,
  toggleLibraryMenu
} from '../../actions/index';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import images from '../../assets/images';
import textToClipboard from '../../utils/text-to-clipboard';
import './Selection.css';

class SelectionContainer extends Component {
  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = { selection: '', isEditingName: false };
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
    if (binId) {
      console.log('mounting single fetch');
      this.props.onFetchSingleBin(binId);
    }
  }

  componentDidUpdate(prevProps) {
    const { binId } = this.props.match.params;

    if (prevProps.match.params.binId !== binId) {
      if (binId) {
        this.props.onSelectBinById(binId);
      } else {
        console.log('from selection: select empty bin');
        this.props.onSelectBin({ _id: '', name: '', selection: '' });
      }
    }

    if (this.editingInput) {
      this.editingInput.focus();
      const { selectedBin } = this.props;
      this.editingInput.value = selectedBin.name;
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    if (this.props.selectedBin._id === nextProps.selectedBin._id) return;

    const { selectedBin: { name, selection } } = nextProps;
    this.setState({ selection });
    document.title = name;
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
    const { selection, isEditingName } = this.state;
    const { selectedBin: { _id, name }, librariesVisible } = this.props;
    const selectedBinName = _id ? name : 'Empty bin';

    const binNameEditor = isEditingName ?
      <div className="add-bin">
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
      </div> :
      <div
        className={`edit-bin-name clickable`}
        onClick={this.startEditingName.bind(this)}>
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
            <img className="clickable"
                 src={images.play}
                 onClick={this.runCode.bind(this)}
                 title="Run Code (Ctrl+Enter)"
                 alt="Run Code"/>
            {!isEditingName && <img className="clickable"
                                    src={images.save}
                                    onClick={this.saveBin.bind(this)}
                                    title="Save (Ctrl+S)"
                                    alt="Save"/>}
            <div onClick={(e) => this.shareCode(e)}>
              <div className="popup">
                Link copied!
              </div>
              <img className="clickable"
                   src={images.share}
                   title="Share Code"
                   alt="Share Code"/>
            </div>
            <div onClick={(e) => this.copyCode(e)}>
              <div className="popup">
                Code copied!
              </div>
              <img className="clickable"
                   src={images.clipboard}
                   title="Copy Code To Clipboard"
                   alt="Copy Code To Clipboard"/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="white"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className={`feather feather-folder-plus clickable ${librariesVisible ? 'active' : ''}`}
                 onClick={this.showLibraries.bind(this)}>
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z">
                <title>Toggle Libraries</title>
              </path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
          </div>
          <div className="selection-editor">
            <AceEditor
              style={{ height: '100%', width: '100%' }}
              mode="javascript"
              theme="tomorrow"
              onChange={this.onSelectionChange.bind(this)}
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

    this.setState({ isEditingName: false });
  }

  onBinNameKeyDown(event) {
    if (event.keyCode === 13) {
      this.saveBinNameClick();
    }
  }

  saveEmptyBin(name) {
    this.props.onAddAndSelectBin(name, this.state.selection)
      .then(_id => {
        this.props.history.push(`/${_id}`);
      });
  }

  editBinName(_id, name) {
    const { onEditBin, onSelectBinById } = this.props;
    onEditBin(_id, name);
    onSelectBinById(_id);
  }

  startEditingName() {
    this.setState({ isEditingName: true });
  }

  onSelectionChange(selection) {
    this.setState({ selection });
  }

  /* Icon events */
  runCode() {
    const { selection } = this.state;
    if (selection.trim() === '') return;
    const { onAddLog } = this.props;

    try {
      eval(selection);
    } catch (e) {
      console.error(e.message);
      onAddLog(e.message, 'error');
    }
    onAddLog(null, 'break');
  }

  saveBin() {
    const { selection } = this.state;
    const { selectedBin: { _id }, onSaveBin } = this.props;

    if (!_id) {
      this.startEditingName();
    } else {
      onSaveBin(_id, selection);
    }
  }

  shareCode({ target }) {
    textToClipboard(window.location.href);
    showPopup(target.parentElement.querySelector('.popup'));
  }

  copyCode({ target }) {
    textToClipboard(this.state.selection);
    showPopup(target.parentElement.querySelector('.popup'));
  }

  showLibraries() {
    this.props.onToggleLibraryMenu(!this.props.librariesVisible);
  }
}

const showPopup = (popup) => {
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);
};

SelectionContainer.propTypes = {
  selectedBin: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    selection: PropTypes.string
  })
};

const mapStateToProps = ({ bins: { selectedBin }, libraries: { librariesVisible } }) => {
  return ({ selectedBin, librariesVisible });
};

const mapDispatchToProps = (dispatch) => ({
  onFetchSingleBin: (_id) => dispatch(fetchSingleBin(_id)),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onSelectBinById: (_id) => dispatch(selectBinByID(_id)),
  onEditBin: (_id, name) => dispatch(editBin(_id, name)),
  onAddAndSelectBin: (name, selection) => dispatch(addAndSelectBin(name, selection)),
  onSaveBin: (_id, selection) => dispatch(saveBin(_id, selection)),
  onAddLog: (message, logType) => dispatch(addLog(message, logType)),
  onToggleLibraryMenu: (toggle) => dispatch(toggleLibraryMenu(toggle))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
