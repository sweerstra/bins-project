import React, { Component } from 'react';
import Bins from '../components/Bins';
import { addBin, getBins, removeBin, saveBin } from '../api/bins';
import CreateBinModal from '../components/CreateBinModal';

class BinsContainer extends Component {
  state = {
    bins: [],
    search: '',
    createBinModalIsOpen: false
  };

  async componentDidMount() {
    const bins = await getBins();
    this.setState({ bins });

    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      this.saveBin();
    }
  };

  openCreateBinModal = () => this.setState({ createBinModalIsOpen: true });

  addBin = async ({ name }) => {
    // get the editor's code
    const { code } = this.props.bin;

    const bin = await addBin({ name, code });
    this.setState(state => ({
      createBinModalIsOpen: false,
      bins: [...state.bins, bin]
    }));

    this.props.onSelectBin(bin);
  };

  saveBin = async () => {
    const { bin } = this.props;

    if (bin.id) {
      await saveBin(bin);
    } else {
      this.openCreateBinModal();
    }
  };

  removeBin = async ({ id }) => {
    this.setState(({ bins }) => ({
      bins: bins.filter(bin => bin.id !== id)
    }));

    const { bin } = this.props;

    if (id === bin.id) {
      this.props.onSelectBin({});
    }

    await removeBin(id);
  };

  closeCreateBinModal = () => this.setState({ createBinModalIsOpen: false });

  searchBin = (e) => {
    this.setState({ search: e.target.value });
  };

  get filteredBins() {
    const { bins, search } = this.state;
    const regex = new RegExp(search, 'i');
    return bins.filter(bin => bin.name.match(regex));
  }

  render() {
    const { createBinModalIsOpen } = this.state;
    const { bin, onSelectBin } = this.props;

    return (
      <>
        <Bins
          bins={this.filteredBins}
          selected={bin}
          onSelect={onSelectBin}
          onCreateNew={this.openCreateBinModal}
          onSave={this.saveBin}
          onRemove={this.removeBin}
          onSearch={this.searchBin}/>
        <CreateBinModal
          isOpen={createBinModalIsOpen}
          onSave={this.addBin}
          onClose={this.closeCreateBinModal}/>
      </>
    );
  }
}

export default BinsContainer;
