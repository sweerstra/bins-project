import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

class SelectionContainer extends Component {
  state = { selection: '' };

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
          <div>{selected}</div>
          {selection && <div className="clickable" title="Ctrl+S">{'Save'}</div>}
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
            tabSize: 2,
          }}/>
      </main>
    )
  };

  onChange(e) {
    console.log(e);
  }
}

const mapStateToProps = ({ bins: { fetching, bins }, selectedBin }) => {
  return { fetching, bins, selectedBin };
};

export default connect(mapStateToProps)(SelectionContainer);
