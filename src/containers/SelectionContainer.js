import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin, editBin, saveBin } from '../actions';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

class SelectionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { selection: '' };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      this.save();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedBin.id === nextProps.selectedBin.id) return;

    const { bins, selectedBin } = nextProps;
    const { id } = selectedBin;
    const selected = bins[id - 1];

    if (selected) {
      this.setState({ selection: selected.selection });
    }
  }

  render() {
    const { selection } = this.state;
    const { bins, selectedBin } = this.props;
    const { id } = selectedBin;
    const selected = id ? bins[id - 1].name : 'Empty bin';

    return (
      <main className="App-content">
        <div className="selection-header">
          <div
            className={id ? 'clickable' : ''}
            onClick={this.edit.bind(this)}>{selected}
          </div>
          <div className="clickable"
               onClick={this.save.bind(this)}
               title="Ctrl+S">Save
          </div>
        </div>
        <AceEditor
          style={{ width: '100%', height: 'calc(100% - 40px)' }}
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
            tabSize: 2
          }}/>
      </main>
    )
  };

  edit() {
    const { selectedBin, dispatch } = this.props;
    console.log(selectedBin);
    const bin = prompt(`Edit bin name (${selectedBin.name})`);
    if (bin) {
      dispatch(editBin(selectedBin.id, bin));
    }
  }

  save() {
    const { selection } = this.state;
    const { selectedBin: { id }, dispatch } = this.props;
    if (id === 0) {
      console.log('zero');
      const bin = prompt('Choose bin name');
      if (bin) {
        dispatch(addAndSelectBin(bin, selection));
      }
    } else {
      dispatch(saveBin(id, selection));
    }
  }

  onChange(selection) {
    this.setState({ selection });
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(SelectionContainer);
