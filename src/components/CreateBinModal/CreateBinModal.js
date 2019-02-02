import React from 'react';
import ConfirmModal from '../modals/ConfirmModal';
import { useInput } from '../../hooks/form';
import { Input, Label } from '../../ui';

function CreateBinModal({ isOpen, onSave, onClose }) {
  const [name, setName, onNameChange] = useInput();

  function closeModal() {
    onClose();
    setName('');
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Create Bin"
      onModalClose={closeModal}
      onConfirm={() => onSave({ name })}
      disableSave={!name}>
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
