import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Board from "./components/board"

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}> Master Mind </h1>
      <Board />
    </div>
  )
}

export default App
