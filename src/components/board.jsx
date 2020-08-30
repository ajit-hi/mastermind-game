import React, { useState } from "react"
import styled from "styled-components"
import { MdUndo } from "react-icons/md"

const WON = "WON"
const LOST = "LOST"
const ON = "ON"

const BoardContainer = styled.div`
  border: 2px solid #795548;
  max-width: 300px;
  margin: auto;
`

const GameMovesArea = styled.div`
  display: flex;
  min-height: 500px;
  padding: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
`
const PegAndKeyRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  justify-content: space-between;
  margin-bottom: 10px;
`

const PegRow = styled.div`
  border: 1px solid #795548;
  width: 60%;
  height: 35px;
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const KeyRow = styled.div`
  border: 1px solid #795548;
  width: 30%;
  height: 25px;
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const PegContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #795548;
  background: ${(props) => (props.color ? props.color : "gray")};
`

const GameActionArea = styled.div`
  display: flex;
  border-top: 2px solid #795548;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`

const GameButton = styled.button`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
`

const UndoAndSubmitActions = styled.div`
  border: 1px solid #795548;
  width: 30%;
  height: 25px;
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Key = styled.div`
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: ${(props) => (props.point === 1 ? "1px solid black" : "none")};
  background: ${(props) => (props.point === 2 ? "black" : "transparent")};
`

const YouLostImage = styled.img`
  width: 80%;
  display: block;
  margin: auto;
`

const YouWonImage = styled.img`
  height: 200px;
  display: block;
  margin: auto;
`

const pegs = ["#ff0000", "#0000ff", "#00ff00", "#ffffff", "#000000", "#FFFF00"]

const formattedPegs = (pegs) => {
  let pegsClone = [...pegs]
  while (pegsClone.length < 4) {
    pegsClone.push(null)
  }
  return pegsClone
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const Board = () => {
  const [guesses, setGuesses] = useState([])
  const [activeGuess, setActiveGuess] = useState([])
  const [secretCode, setSecretCode] = useState([
    getRandomInt(6),
    getRandomInt(6),
    getRandomInt(6),
    getRandomInt(6),
  ])
  const [gameStatus, setGameStatus] = useState(ON)

  const handlePegChoose = (pegColor) => {
    setActiveGuess((activeGuess) => {
      let activeGuessClone = [...activeGuess]
      if (activeGuessClone.length < 4) {
        activeGuessClone.push(pegColor)
      }
      return activeGuessClone
    })
  }

  const handleUndo = () => {
    setActiveGuess((activeGuess) => {
      let activeGuessClone = [...activeGuess]
      activeGuessClone.pop()
      return activeGuessClone
    })
  }

  const handleCodeGuessSubmit = (guess, secretCode) => {
    setActiveGuess([])
    const guessIndexes = guess.map((item) => pegs.indexOf(item))
    if (JSON.stringify(guessIndexes) === JSON.stringify(secretCode)) {
      setGameStatus(WON)
      setGuesses((guesses) => {
        let guessesClone = [...guesses]
        guessesClone.push({ guess, status: WON, keys: [] })
        return guessesClone
      })
      return
    }
    const scoredKeys = {}
    for (let i = 0; i < 4; i++) {
      if (guessIndexes[i] === secretCode[i]) {
        scoredKeys[guessIndexes[i]] = 2
      } else if (
        secretCode.includes(guessIndexes[i]) &&
        !scoredKeys[guessIndexes[i]]
      ) {
        scoredKeys[guessIndexes[i]] = 1
      }
    }

    let keys = Object.values(scoredKeys).sort()
    setGuesses((guesses) => {
      let guessesClone = [...guesses]
      if (guessesClone.length === 6) {
        setGameStatus(LOST)
        guessesClone.push({ guess, keys, status: LOST })
      } else {
        guessesClone.push({ guess, keys })
      }
      return guessesClone
    })
  }

  return (
    <BoardContainer>
      <GameMovesArea>
        {guesses.map((guess, index) => (
          <PegAndKeyRow key={index}>
            <PegRow>
              {formattedPegs(guess.guess).map((peg, index) => (
                <PegContainer key={index} color={peg} />
              ))}
            </PegRow>
            <KeyRow>
              {guess.status === WON
                ? "WINNER"
                : guess.status === LOST
                ? "LOST"
                : guess.keys.map((key, index) => (
                    <Key key={index} point={key} />
                  ))}
            </KeyRow>
          </PegAndKeyRow>
        ))}
        {gameStatus === ON ? (
          <PegAndKeyRow>
            <PegRow>
              {formattedPegs(activeGuess).map((peg, index) => (
                <PegContainer key={index} color={peg} />
              ))}
            </PegRow>
            {/* <KeyRow></KeyRow> */}
            <UndoAndSubmitActions>
              <button
                style={{ cursor: "pointer" }}
                disabled={!activeGuess.length}
                onClick={handleUndo}
              >
                <MdUndo />
              </button>
              <button
                disabled={activeGuess.length < 4}
                onClick={() => handleCodeGuessSubmit(activeGuess, secretCode)}
              >
                ok
              </button>
            </UndoAndSubmitActions>
          </PegAndKeyRow>
        ) : gameStatus === WON ? (
          <YouWonImage src="youwin.gif" />
        ) : (
          <YouLostImage src="youlose.gif" />
        )}
      </GameMovesArea>
      <GameActionArea>
        {pegs.map((peg) => (
          <GameButton
            key={peg}
            onClick={() => handlePegChoose(peg)}
            color={peg}
            disabled={activeGuess.length > 3}
          />
        ))}
      </GameActionArea>
    </BoardContainer>
  )
}

export default Board
