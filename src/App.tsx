/**
 * @jest-environment jsdom
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import SpreadSheet from './Components/SpreadSheet';
import FileSelector from './Components/FileSelector';
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<FileSelectorWrapper />} />
            <Route path="/:doc" element={<SpreadSheetWrapper />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}
const FileSelectorWrapper: React.FC = () => {
  return <FileSelector />;
}
const SpreadSheetWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [documentName, setDocumentName] = useState<string>('');
  useEffect(() => {
    const docNameFromURL = getDocumentNameFromWindow();
    if (!docNameFromURL) {
      navigate('/');
    } else {
      setDocumentName(docNameFromURL);
    }
  }, [location.pathname, navigate, getDocumentNameFromWindow]);

  function getDocumentNameFromWindow() {
    const path = location.pathname.substring(1);
    return path || '';
  }
  return <SpreadSheet documentName={documentName} />;
}
export default App;
