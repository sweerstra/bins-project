import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import EditorContainer from '../../containers/EditorContainer';
import BinsContainer from '../../containers/BinsContainer';
import Console from '../../components/Console';
import LibrariesContainer from '../../containers/LibrariesContainer';
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
    bin: {},
    librariesToggle: false
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id === undefined) return;

    getBin(id)
      .then(this.selectBin)
      .catch(() => this.props.history.replace(`/bins`));
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

  toggleLibraries = () => {
    this.setState(state => ({ librariesToggle: !state.librariesToggle }));
  };

  navigateToPassphrase = () => {
    const { authenticated } = this.props;

    if (authenticated) {
      this.props.setAuthenticated(!authenticated);
    }

    this.props.history.replace('/passphrase');
  };

  render() {
    const { bin, librariesToggle } = this.state;
    const { authenticated } = this.props;

    return (
      <Wrapper>
        <Navbar onViewLibraries={this.toggleLibraries}
                navigateToPassphrase={this.navigateToPassphrase}
                authenticated={authenticated}/>
        <EditorContainer bin={bin} onCodeChange={this.onBinCodeChange}/>
        <BinsContainer bin={bin} onSelectBin={this.selectBin}/>
        <Console/>
        <LibrariesContainer show={librariesToggle} onHide={this.toggleLibraries}/>
      </Wrapper>
    );
  }
}

export default Dashboard;
