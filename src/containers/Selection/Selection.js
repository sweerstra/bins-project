import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addLog,
  createBin,
  editBin,
  fetchSingleBin,
  importURLAsBin,
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
      this.props.onFetchSingleBin(binId);
    }
  }

  componentDidUpdate(prevProps) {
    const { binId } = this.props.match.params;

    if (prevProps.match.params.binId !== binId) {
      if (binId) {
        this.props.onSelectBinById(binId);
      } else {
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
    if (this.props.selectedBin._id === nextProps.selectedBin._id) return;

    const { selectedBin: { name, selection } } = nextProps;
    this.setState({ selection });
    document.title = name;
  }

  onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      if (this.props.readOnly) return;
      this.saveBin();
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode === 13) {
      this.runCode();
      e.preventDefault();
    }
  }

  render() {
    const { selection, isEditingName } = this.state;
    const { selectedBin: { _id, name }, librariesVisible, readOnly } = this.props;
    const selectedBinName = _id ? name : 'Empty bin';

    const binNameEditor = readOnly ?
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{selectedBinName}</span>
      </div> :
      isEditingName ?
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
          className={`selection__header__bin-name clickable`}
          onClick={this.startEditingName.bind(this)}>
          <span>{selectedBinName}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
          </svg>
        </div>;

    return (
      <div className="selection">
        <div className="selection__header">
          {binNameEditor}
          <img className="clickable"
               src={images.play}
               onClick={this.runCode.bind(this)}
               title="Run Code (Ctrl+Enter)"
               alt="Run Code"/>
          {!isEditingName && !readOnly && <img className="clickable"
                                               src={images.save}
                                               onClick={this.saveBin.bind(this)}
                                               title="Save (Ctrl+S)"
                                               alt="Save"/>}
          {!readOnly && <img className="clickable"
                             onClick={this.importGist.bind(this)}
                             src={images.externalLink}
                             title="Quick URL import"
                             alt="Quick URL import"/>}
          <div onClick={(e) => this.shareCode(e)}>
            <div className="popup">
              Link copied!
            </div>
            <img className="clickable"
                 src={images.share}
                 title="Share Bin URL"
                 alt="Share Bin URL"/>
          </div>
          <div onClick={(e) => this.copyCode(e)}>
            <div className="popup">
              Code copied!
            </div>
            <img className="clickable"
                 src={images.clipboard}
                 title="Code To Clipboard"
                 alt="Code To Clipboard"/>
          </div>
          {librariesVisible
            ? <img className="clickable"
                   onClick={this.toggleLibraries.bind(this)}
                   src={images.folderMinus}
                   title="Hide Libraries"
                   alt="Hide Libraries"/>
            : <img className="clickable"
                   onClick={this.toggleLibraries.bind(this)}
                   src={images.folderPlus}
                   title="Show Libraries"
                   alt="Show Libraries"/>}
        </div>
        <div className="selection__editor">
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
    );
  };

  saveBinNameClick() {
    const { selection } = this.state;
    const { selectedBin: { _id } } = this.props;

    if (this.editingInput) {
      const { value } = this.editingInput;
      if (!_id) {
        this.saveEmptyBin(value, selection);
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

  saveEmptyBin(name, selection) {
    this.props.onCreateBin(name, selection)
      .then(_id => {
        this.props.history.push(`/bin/${_id}`);
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

  async importGist() {
    const url = prompt('Data URL');

    if (url) {
      const { name, selection } = await importURLAsBin(url);
      this.saveEmptyBin(name, selection);
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

  toggleLibraries() {
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

const mapStateToProps = ({ bins: { selectedBin }, libraries: { librariesVisible }, permission: { hasPermission } }) => {
  return ({ selectedBin, librariesVisible, readOnly: !hasPermission });
};

const mapDispatchToProps = (dispatch) => ({
  onFetchSingleBin: (_id) => dispatch(fetchSingleBin(_id)),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onSelectBinById: (_id) => dispatch(selectBinByID(_id)),
  onEditBin: (_id, name) => dispatch(editBin(_id, name)),
  onCreateBin: (name, selection) => dispatch(createBin(name, selection)),
  onSaveBin: (_id, selection) => dispatch(saveBin(_id, selection)),
  onAddLog: (message, logType) => dispatch(addLog(message, logType)),
  onToggleLibraryMenu: (toggle) => dispatch(toggleLibraryMenu(toggle))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
