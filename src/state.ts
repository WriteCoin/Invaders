import * as gameField from "./gameField"
import { Ball, PlayerStatus, State } from "./types"
import * as ball from "./ball"

export const getRandomIntInclusive = (min: number) => (max: number) => {
  const min1 = Math.ceil(min),
        max1 = Math.floor(max)
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1; //Максимум и минимум включаются
}

export const toDeg = (radians: number) => radians * 180 / Math.PI

export const getSumAngle = (angle1: number, angle2: number) =>
  angle1 + angle2 > Math.PI * 2 ? angle1 + angle2 - Math.PI * 2 : angle1 + angle2

export const getDecAngle = (angle1: number, angle2: number) =>
  angle1 - angle2 < 0 ? angle1 - angle2 + Math.PI * 2 : angle1 - angle2

const initState = (): State => {
  const x = 300
  const initialPosX = getRandomIntInclusive(x + ball.radius)(gameField.width - ball.radius) + ball.radius * Math.cos(7 * Math.PI / 4)
  const initialPosY = getRandomIntInclusive(ball.radius)(gameField.height - ball.radius) + ball.radius * Math.sin(7 * Math.PI / 4)
  // const initialAngle = getRandomIntInclusive(0)(1) === 0 ? 3 * Math.PI / 4 : 5 * Math.PI / 4
  const initialAngle = (2 * getRandomIntInclusive(0)(3) + 1) * Math.PI / 4
  return {
    isGameOver: false,
    playerNode: document.getElementById("player"),
    gameFieldNode: document.getElementById("gameField"),
    textScore: document.getElementById("score"),
    ballNode: document.getElementById("ball"),
    player: {
      posY: gameField.height / 2 - 50,
      speed: 150,
      status: PlayerStatus.Idle,
      score: 0
    },
    ball: {
      initialPosX: initialPosX,
      initialPosY: initialPosY,
      initialAngle: initialAngle,
      speed: 175,
      angle: initialAngle,
      posX: initialPosX,
      posY: initialPosY,
      hasFaced: false
    }
  }
}

let state = initState()

export const updateState = (f: (st: State) => State) => state = f(state)

export const getState = () => state