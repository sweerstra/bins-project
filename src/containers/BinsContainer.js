import React, { useEffect, useState } from 'react';
import Bins from '../components/Bins';
import Api from '../api/bins';
import CreateBinModal from '../components/CreateBinModal/CreateBinModal';
import { useInput } from '../hooks/form';
import { useKeyDown } from '../hooks/event';

export default function BinsContainer({ bin, onSelectBin }) {
  const [bins, setBins] = useState([]);
  const [search, setSearch, onSearchChange] = useInput();
  const [createBinModalIsOpen, setCreateBinModalIsOpen] = useState(false);

  useEffect(async () => {
    const bins = await Api.getBins();
    setBins(bins);
  }, []);

  useKeyDown(e => e.ctrlKey && e.key === 's', e => {
    e.preventDefault();
    saveBin();
  });

  async function createBin({ name }) {
    const bin = await Api.addBin({ name });

    closeCreateBinModal();
    setSearch('');
    setBins([...bins, bin]);
    onSelectBin(bin);
  }

  async function saveBin() {
    if (bin.id) {
      await Api.saveBin(bin);
    } else {
      openCreateBinModal();
    }
  }

  async function removeBin({ id }) {
    setBins(bins.filter(bin => bin.id !== id));

    // removed bin is selected
    if (id === bin.id) {
      onSelectBin({});
    }

    await Api.removeBin(id);
  }

  function openCreateBinModal() {
    setCreateBinModalIsOpen(true);
  }

  function closeCreateBinModal() {
    setCreateBinModalIsOpen(false);
  }

  const regex = new RegExp(search, 'i');
  const filteredBins = bins.filter(bin => bin.name.match(regex));

  return (
    <>
      <Bins
        bins={filteredBins}
        selected={bin}
        onSelect={onSelectBin}
        onCreateNew={openCreateBinModal}
        onSave={saveBin}
        onRemove={removeBin}
        onSearch={onSearchChange}/>
      <CreateBinModal
        isOpen={createBinModalIsOpen}
        onSave={createBin}
        onClose={closeCreateBinModal}/>
    </>
  );
}
