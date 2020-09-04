import React from "react"
import logo from "./logo.svg"
import "./App.css"
import BoardPanel from "./components/boardpanel"

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginTop: 5 }}> Master Mind </h1>
      <BoardPanel />
    </div>
  )
}

export default App
