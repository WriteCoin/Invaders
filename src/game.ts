import * as ball from "./ball"
import * as player from "./player"
import { getState, toDeg } from "./state"
import { PlayerStatus, Wall } from "./types"

let timer
const interval = 125

const getQuarterAngle = (angle: number): number =>
    angle > 0 && angle < 90 ? 1 :
    angle > 90 && angle < 180 ? 2 :
    angle > 180 && angle < 270 ? 3 :
    angle > 270 && angle < 360 ? 4 : 0

const end = () => {
  clearInterval(timer)
  alert("Игра окончена")
}

const update = () => {
  const state = getState()
  const touchedWall = ball.getTouchedWall()
  console.log(touchedWall)
  const quarterAngle = getQuarterAngle(toDeg(state.ball.angle))
  touchedWall === Wall.Left ?
    end()
  : touchedWall === Wall.Bottom ?
    quarterAngle === 3 ? ball.addAngle() : ball.decAngle()
  : touchedWall === Wall.Right ?
    quarterAngle === 1 ? ball.addAngle() : ball.decAngle()
  : touchedWall === Wall.Top ?
    quarterAngle === 2 ? ball.addAngle() : ball.decAngle()
  : touchedWall === undefined ?
    state.ball.posX <= ball.radius + player.width &&
    state.ball.posY <= state.player.posY && state.ball.posY >= state.player.posY - player.height ?
      quarterAngle === 3 ? ball.addAngle() : ball.decAngle()
    : void 0
  : void 0

  const speedDelta = state.ball.speed / (1000 / interval)
  const angle = state.ball.angle
  const newX = state.ball.posX + speedDelta * Math.cos(angle)
  const newY = state.ball.posY + speedDelta * Math.sin(angle)
  ball.setPosXY(newX)(newY)
}

export const setup = () => {
  timer = setInterval(update, interval)
}