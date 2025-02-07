import React from 'react';
import { EditorProvider } from './components/EditorContext';
import Workspace from './components/Workspace';
import Toolbar from './components/Toolbar';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <EditorProvider>
      <AppContainer>
        <Toolbar />
        <Workspace />
      </AppContainer>
    </EditorProvider>
  );
}

export default App;
