import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import EditorContainer from '../../containers/EditorContainer';
import BinsContainer from '../../containers/BinsContainer';
import Console from '../../components/Console';
import { getBin } from '../../api/bins';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 30rem;
  grid-template-areas: "navbar navbar" "editor bins" "console bins";
`;

class Dashboard extends PureComponent {
  state = {
    bin: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id === undefined) return;

    const bin = await getBin(id);
    this.selectBin(bin);
  }

  selectBin = (bin) => {
    this.setState({ bin });
    this.props.history.replace(`/bins/${bin.id}`);
  };

  onBinCodeChange = (code) => {
    this.setState(state => ({
      bin: { ...state.bin, code }
    }));
  };

  viewLibrariesModal = () => {

  };

  render() {
    const { bin } = this.state;

    return (
      <Wrapper>
        <Navbar onViewLibraries={this.viewLibrariesModal}/>
        <EditorContainer bin={bin} onCodeChange={this.onBinCodeChange}/>
        <BinsContainer bin={bin} onSelectBin={this.selectBin}/>
        <Console/>
      </Wrapper>
    );
  }
}

export default Dashboard;
