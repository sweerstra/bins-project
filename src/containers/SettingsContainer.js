import React, { useContext } from 'react';
import Modal from '../components/modals/Modal';
import Settings from '../components/Settings';
import SettingsContext from '../context/Settings';

export default function SettingsContainer({ show, onHide }) {
  const { settings, onSettingsChange } = useContext(SettingsContext);

  return (
    <Modal
      isOpen={show}
      title="Settings"
      onModalClose={onHide}>
      <Settings
        settings={settings}
        onChange={onSettingsChange}/>
    </Modal>
  );
}
