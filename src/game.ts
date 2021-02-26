import * as ball from "./ball"
import * as player from "./player"
import { getState, toDeg } from "./state"
import { PlayerStatus, State, Wall } from "./types"

let timer, cooldownTimer
const interval = 125,
      timeCooldown = 1000

const getQuarterAngle = (angle: number): number =>
    angle > 0 && angle < 90 ? 4 :
    angle > 90 && angle < 180 ? 3 :
    angle > 180 && angle < 270 ? 2 :
    angle > 270 && angle < 360 ? 1 : 0

const end = () => {
  clearInterval(timer)
  alert("Игра окончена")
}

const isTouchedPlayer = () => {
  const state = getState()
  return state.ball.posX <= player.width &&
    state.ball.posY >= state.player.posY && state.ball.posY <= state.player.posY + player.height
}

const rebound = (changeFunc: () => State) => {
  ball.setFaced(true)
  cooldownTimer = setInterval(() => {
    clearInterval(cooldownTimer)
    ball.setFaced(false)
  }, timeCooldown)
  changeFunc()
}

const clockwiseDirectionRebound = () => rebound(ball.addAngle),
      anticlockwiseRebound = () => rebound(ball.decAngle)

const update = () => {
  const state = getState()
  const touchedWall = ball.getTouchedWall()
  console.log("стена " + touchedWall)
  // console.log(state.ball.angle)
  // console.log(toDeg(state.ball.angle))
  console.log("ball X: " + state.ball.posX)
  console.log("ball Y: " + state.ball.posY)
  console.log("player Y: " + state.player.posY)
  const isTouched = isTouchedPlayer()
  console.log("Соприкосновение с игроком: " + isTouched)
  console.log("Состояние отскакивания: " + state.ball.hasFaced)
  const quarterAngle = getQuarterAngle(toDeg(state.ball.angle))
  // console.log("угол " + toDeg(state.ball.angle - Math.PI / 2))
  // console.log("четверть " + quarterAngle)
    state.ball.hasFaced ? undefined
  :   touchedWall === Wall.Left ? end()
    : touchedWall === Wall.Bottom ? quarterAngle === 3 ? clockwiseDirectionRebound() : anticlockwiseRebound()
    : touchedWall === Wall.Right ? quarterAngle === 1 ? anticlockwiseRebound() : clockwiseDirectionRebound()
    : touchedWall === Wall.Top ? quarterAngle === 2 ? anticlockwiseRebound() : clockwiseDirectionRebound()
    : touchedWall === undefined ?
        isTouchedPlayer() ? quarterAngle === 3 ? anticlockwiseRebound() : clockwiseDirectionRebound()
      : undefined
    : undefined

  const speedDelta = state.ball.speed / (timeCooldown / interval)
  const angle = state.ball.angle
  const newX = state.ball.posX + speedDelta * Math.cos(angle)
  const newY = state.ball.posY + speedDelta * Math.sin(angle)
  ball.setPosXY(newX)(newY)
}

export const setup = () => timer = setInterval(update, interval)