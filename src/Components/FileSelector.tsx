import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PortsGlobal } from "../ServerDataDefinitions";

const FileSelector: React.FC = () => {
  const [documents, setDocuments] = useState<string[]>([]);
  const { serverPort } = PortsGlobal;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:${serverPort}/documents`
        );
        if (!response.ok) {
          throw new Error("Invalid network response" + response.statusText);
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    })();
  }, [serverPort]);

  return (
    <div>
      <h1>Select a File</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc}>
            <Link to={`/${doc}`}>{doc}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileSelector;
