import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import EditorContainer from '../containers/EditorContainer';
import BinsContainer from '../containers/BinsContainer';
import Console from '../components/Console';
import LibrariesContainer from '../containers/LibrariesContainer';
import SettingsContainer from '../containers/SettingsContainer';
import Api from '../api/bins';
import { SelectedBinProvider } from '../context/SelectedBin';
import { SettingsProvider } from '../context/Settings';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 30rem;
  grid-template-areas: "navbar navbar" "editor bins" "console bins";
`;

const Dashboard = React.memo(() => {
  const [areLibrariesVisible, showLibraries] = useState(false);
  const [areSettingsVisible, showSettings] = useState(false);

  const toggleLibraries = () => showLibraries(!areLibrariesVisible);
  const toggleSettings = () => showSettings(!areSettingsVisible);

  return (
    <SettingsProvider>
      <SelectedBinProvider>
        <Wrapper>
          <Navbar onViewLibraries={toggleLibraries} onViewSettings={toggleSettings} />
          <EditorContainer />
          <BinsContainer />
          <Console />
          <LibrariesContainer isVisible={areLibrariesVisible} onHide={toggleLibraries} />
          <SettingsContainer isVisible={areSettingsVisible} onHide={toggleSettings} />
        </Wrapper>
      </SelectedBinProvider>
    </SettingsProvider>
  );
});

export default Dashboard;
