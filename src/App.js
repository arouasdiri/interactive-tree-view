import React from "react";
import TreeView from "./components/TreeDiagram";
import data from "./data/treeData";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="title">Interaktives Tree-View-Diagramm</h1>
      <TreeView data={data} />
    </div>
  );
};

export default App;
