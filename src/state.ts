import * as gameField from "./gameField"
import { PlayerStatus, State } from "./types"

const initState = (): State => {
  return {
    playerNode: document.getElementById("player"),
    gameFieldNode: document.getElementById("gameField"),
    player: {
      posY: gameField.height / 2 - 50,
      speed: 150,
      status: PlayerStatus.Idle
    },
  }
}

let state = initState()

export const updateState = (f: (st: State) => State) => state = f(state)

export const getState = () => state