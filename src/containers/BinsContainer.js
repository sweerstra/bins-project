import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Bins from '../components/Bins/Bins';
import Api from '../api/bins';
import CreateBinModal from '../components/Modals/CreateBinModal';
import { useSelectedBin } from '../context/SelectedBin';
import { useInput } from '../hooks/form';
import { useKeyDown } from '../hooks/event';

export default function BinsContainer() {
  const history = useHistory();
  const { id: binId } = useParams();
  const { selectedBin, setSelectedBin } = useSelectedBin();
  const [bins, setBins] = useState([]);
  const [search, setSearch, onSearchChange] = useInput();
  const [createBinModalIsOpen, setCreateBinModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchBins() {
      const bins = await Api.getBins();
      setBins(bins);
    }
    fetchBins();
  }, []);

  useEffect(() => {
    if (binId !== undefined) {
      Api.getBin(binId)
        .then(updateSelectedBin)
        .catch(() => history.replace('/bins'));
    }
  }, []);

  useKeyDown(
    e => e.ctrlKey && e.key === 's',
    true,
    () => saveBin()
  );

  function updateSelectedBin(bin) {
    setSelectedBin(bin);
    updateUrlWithBin(bin);
  }

  function updateUrlWithBin(bin) {
    const path = bin.id ? `/bins/${bin.id}` : '/bins';
    history.replace(path);
  }

  async function createBin({ name }) {
    const bin = await Api.addBin({ name });
    setSearch('');
    setBins([...bins, bin]);
    updateSelectedBin(bin);
  }

  async function saveBin() {
    if (selectedBin.id) {
      await Api.saveBin(selectedBin);
    } else {
      openCreateBinModal();
    }
  }

  async function removeBin({ id }) {
    setBins(bins.filter(bin => bin.id !== id));

    // if removed bin is currently selected, reset it
    if (id === selectedBin.id) {
      updateSelectedBin({});
    }

    await Api.removeBin(id);
  }

  const openCreateBinModal = () => setCreateBinModalIsOpen(true);
  const closeCreateBinModal = () => setCreateBinModalIsOpen(false);

  const regex = new RegExp(search, 'i');
  const filteredBins = bins.filter(bin => bin.name.match(regex));

  return (
    <>
      <Bins
        bins={filteredBins}
        selected={selectedBin}
        onSelect={updateSelectedBin}
        onCreate={openCreateBinModal}
        onSave={saveBin}
        onRemove={removeBin}
        onSearch={onSearchChange} />
      <CreateBinModal
        isOpen={createBinModalIsOpen}
        onSave={createBin}
        onClose={closeCreateBinModal} />
    </>
  );
}
