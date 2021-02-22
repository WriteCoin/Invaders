import * as gameField from "./gameField"
import { Ball, PlayerStatus, State } from "./types"
import * as ball from "./ball"

export const getRandomIntInclusive = (min: number) => (max: number) => {
  const min1 = Math.ceil(min),
        max1 = Math.floor(max)
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1; //Максимум и минимум включаются
}

export const toDeg = (radians: number) => radians * 180 / Math.PI

const initState = (): State => {
  const x = 300
  const initialPosX = getRandomIntInclusive(x + ball.radius)(gameField.width - ball.radius)
  const initialPosY = getRandomIntInclusive(ball.radius)(gameField.height - ball.radius)
  const initialAngle = getRandomIntInclusive(0)(1) === 0 ? 135 : 225
  return {
    playerNode: document.getElementById("player"),
    gameFieldNode: document.getElementById("gameField"),
    ballNode: document.getElementById("ball"),
    player: {
      posY: gameField.height / 2 - 50,
      speed: 150,
      status: PlayerStatus.Idle
    },
    ball: {
      initialPosX: initialPosX,
      initialPosY: initialPosY,
      initialAngle: initialAngle,
      speed: 175,
      angle: initialAngle,
      posX: initialPosX,
      posY: initialPosY,
    }
  }
}

let state = initState()

export const updateState = (f: (st: State) => State) => state = f(state)

export const getState = () => state