import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import { FEN } from "./constants/constants";

function App() {
  return (
    <main>
      <h1>CHESS</h1>
      <Dashboard className="body" fenCode={FEN.CHALLENGE} />
    </main>
  );
}

export default App;
