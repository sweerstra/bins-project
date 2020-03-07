import React from 'react';
import ConfirmModal from './ConfirmModal';
import { useInput } from '../../hooks/form';
import { Input, Label } from '../../ui';

function CreateBinModal({ isOpen, onSave, onClose }) {
  const [name, setName, onNameChange] = useInput();

  function saveModal() {
    closeModal();
    onSave({ name });
  }

  function closeModal() {
    setName('');
    onClose();
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Create Bin"
      isConfirmable={Boolean(name)}
      onConfirm={saveModal}
      onCancel={closeModal}
      data-testid="create-bin-modal">
      <Label>
        Name
        <Input
          value={name}
          onChange={onNameChange}/>
      </Label>
    </ConfirmModal>
  );
}

export default CreateBinModal;
