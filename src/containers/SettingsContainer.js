import React from 'react';
import Modal from '../components/Modals/Modal';
import Settings from '../components/Settings/Settings';
import { useSettings } from '../context/Settings';

export default function SettingsContainer({ isVisible, onHide }) {
  const { settings, setSettings } = useSettings();

  function onSettingsChange(type, value) {
    setSettings({ ...settings, [type]: value });
  }

  return (
    <Modal
      isOpen={isVisible}
      title="Settings"
      onClose={onHide}>
      <Settings
        settings={settings}
        onChange={onSettingsChange}/>
    </Modal>
  );
}
