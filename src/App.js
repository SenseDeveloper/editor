import React from 'react';
import { EditorProvider } from './components/EditorContext';
import { Workspace } from './components/Workspace';

function App() {
  return (
    <EditorProvider>
      <Workspace />
    </EditorProvider>
  );
}

export default App;