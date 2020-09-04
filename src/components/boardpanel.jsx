import React from "react"
import styled from "styled-components"
import Board from "./board"

const Container = styled.div`
  display: flex;
  justify-contents: space-around;
  flex-wrap: wrap;
  margin-auto;
`
const Instruction = styled.div`
  height: 100%;
  width: 50%;
  margin: 10px auto;
`

const BoardPanel = () => {
  return (
    <Container>
      <Board />
      <Instruction> Instructions go here</Instruction>
    </Container>
  )
}

export default BoardPanel
