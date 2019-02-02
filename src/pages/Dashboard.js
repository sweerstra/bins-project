import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import EditorContainer from '../containers/EditorContainer';
import BinsContainer from '../containers/BinsContainer';
import Console from '../components/Console';
import LibrariesContainer from '../containers/LibrariesContainer';
import SettingsContainer from '../containers/SettingsContainer';
import Api from '../api/bins';
import SettingsContext from '../context/Settings';
import { settings as initialSettings } from '../constants/presets';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 30rem;
  grid-template-areas: "navbar navbar" "editor bins" "console bins";
`;

const Dashboard = React.memo(({ match, history, authenticated, handleAuthentication }) => {
  const [bin, setBin] = useState({});
  const [settings, setSettings] = useState(initialSettings);
  const [librariesToggle, setLibrariesToggle] = useState(false);
  const [settingsToggle, setSettingsToggle] = useState(false);

  useEffect(() => {
    const { id } = match.params;

    if (id !== undefined) {
      Api.getBin(id)
        .then(selectBin)
        .catch(() => history.replace('/bins'));
    }
  }, []);

  function selectBin(bin) {
    setBin(bin);

    const url = bin.id
      ? `/bins/${bin.id}`
      : '/bins';

    history.replace(url);
  }

  function onBinCodeChange(code) {
    setBin({ ...bin, code });
  }

  function onSettingsChange(type, newSettings) {
    setSettings({
      ...settings,
      [type]: newSettings
    });

    /*setSettings({
      ...settings,
      [setting]: {
        ...settings[setting],
        [type]: value
      }
    });*/
  }

  function toggleLibraries() {
    setLibrariesToggle(!librariesToggle);
  }

  function toggleSettings() {
    setSettingsToggle(!settingsToggle);
  }

  function logout() {
    handleAuthentication(false);
  }

  return (
    <SettingsContext.Provider value={{ settings, onSettingsChange }}>
      <Wrapper>
        <Navbar
          onViewLibraries={toggleLibraries}
          onViewSettings={toggleSettings}
          onLogout={logout}
          authenticated={authenticated}/>
        <EditorContainer bin={bin} onCodeChange={onBinCodeChange}/>
        <BinsContainer bin={bin} onSelectBin={selectBin}/>
        <Console/>
        <LibrariesContainer show={librariesToggle} onHide={toggleLibraries}/>
        <SettingsContainer show={settingsToggle} onHide={toggleSettings}/>
      </Wrapper>
    </SettingsContext.Provider>
  );
});

export default Dashboard;
