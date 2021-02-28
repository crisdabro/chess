import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import { FEN } from "./constants/constants";

function App() {
  return (
    <main>
      <Dashboard className="body" fenCode={FEN.CHALLENGE} />
    </main>
  );
}

export default App;
