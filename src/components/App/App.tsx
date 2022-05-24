import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Workspace from '../Workspace/Workspace';
import './App.scss';

const App = () => {
  
  const [appState, setAppState] = useState({
    notes: []
  });

  
  useEffect(() => {
    const apiUrl = `http://localhost:3002/notes`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setAppState({ notes: result });
      });
  }, [setAppState]);

  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Workspace 
          notes={appState.notes}
        />
      </main>
    </div>
  );
}

export default App;
