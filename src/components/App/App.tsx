import React, { useEffect, useState } from 'react';
import { Note } from '../../types/types';
import Header from '../Header/Header';
import {Workspace} from '../Workspace/Workspace';
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
          notes={appState.notes.map(n => n as Note).sort((a, b) => a.id - b.id)}
        />
      </main>
    </div>
  );
}

export default App;
