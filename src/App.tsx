/**
 * @jest-environment jsdom
 */

import { useState, useEffect } from "react";
import "./App.css";
import SpreadSheet from "./Components/SpreadSheet";
import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import FileSelector from "./Components/FileSelector";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<FileSelector />} />
            <Route path="/:doc" element={<SpreadSheetWrapper />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

const SpreadSheetWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [documentName, setDocumentName] = useState<string>("");

  useEffect(() => {
    const docNameFromURL = getDocumentNameFromWindow();
    if (!docNameFromURL) {
      navigate("/");
    } else {
      setDocumentName(docNameFromURL);
    }
  }, [navigate]);

  // for the purposes of this demo and for the final project
  // we will use the window location to get the document name
  // this is not the best way to do this, but it is simple
  // and it works for the purposes of this demo
  function getDocumentNameFromWindow() {
    const href = window.location.href;

    // remove  the protocol 
    const protoEnd = href.indexOf('//');
    // find the beginning of the path
    const pathStart = href.indexOf('/', protoEnd + 2);

    if (pathStart < 0) {
      // there is no path
      return '';
    }
    // get the first part of the path
    const docEnd = href.indexOf('/', pathStart + 1);
    if (docEnd < 0) {
      // there is no other slash
      return href.substring(pathStart + 1);
    }
    // there is a slash
    return href.substring(pathStart + 1, docEnd);

  }

  return <SpreadSheet documentName={documentName} />;
};

export default App;
