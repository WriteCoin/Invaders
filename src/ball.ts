import { getDecAngle, getState, getSumAngle, updateState } from "./state"
import { Ball, Wall } from "./types"
import * as gameField from "./gameField"
import { isBigIntLiteral } from "typescript"

export const radius = 50
export const angleT = Math.PI / 2

export const render = (ball: Ball) => (ballNode: HTMLElement) => {
  // console.log(ball.posX, ball.posY)
  // console.log(ballNode)
  ballNode.style.left = ball.posX.toString() + "px"
  ballNode.style.top = ball.posY.toString() + "px"
}

export const setPosXY = (posX: number) => (posY: number) => {
  // const x = posX - radius * Math.cos(7 * Math.PI / 4)
  // const y = posY - radius * Math.sin(7 * Math.PI / 4)
  const x = posX < 0 ? 0 : posX > gameField.width ? gameField.width : posX
  const y = posY < 0 ? 0 : posY > gameField.height ? gameField.height : posY
  updateState(state => ({...state, ball: {...state.ball, posX: x, posY: y}}))
  const state = getState()
  // console.log(state.ball.posX, state.ball.posY)
  render(state.ball)(state.ballNode)
}

export const setSpeed = (speed: number) => 
  updateState(state => ({...state, ball: {...state.ball, speed}}))

export const setAngle = (angle: number) =>
  updateState(state => ({...state, ball: {...state.ball, angle}}))

export const addAngle = () =>
  setAngle(getSumAngle(getState().ball.angle, angleT))

export const decAngle = () =>
  setAngle(getDecAngle(getState().ball.angle, angleT))

// export const isTouchedWalls = () => {
//   const ball = getState().ball
//   return ball.posX <= radius
//       || ball.posY <= radius
//       || ball.posX >= gameField.width - radius
//       || ball.posY >= gameField.height - radius
// }

export const getTouchedWall = () => {
  const ball = getState().ball
  return  ball.posX <= 0 ? Wall.Left
        : ball.posY <= 0 ? Wall.Top
        : ball.posX >= gameField.width - radius ? Wall.Right
        : ball.posY >= gameField.height - radius ? Wall.Bottom : undefined
}

export const setFaced = (flag: boolean) => 
  updateState(state => ({...state, ball: {...state.ball, hasFaced: flag}}))

export const setup = () => {
  const state = getState()
  const ball = state.ball
  const ballNode = state.ballNode
  ballNode.style.width = radius.toString() + "px"
  ballNode.style.height = radius.toString() + "px"
  // console.log(ball.posX, ball.posY)
  // console.log(ballNode.style.top, ballNode.style.left)
  // console.log(ball.initialPosX, ball.initialPosY)
  setPosXY(ball.initialPosX)(ball.initialPosY)
  // console.log(ball.posX, ball.posY)
  // console.log(ballNode.style.top, ballNode.style.left)
  // const state1 = getState()
  // const ball1 = state1.ball
  // const ballNode1 = state1.ballNode
  // console.log(ball1.posX, ball1.posY)
  // console.log(ballNode1.style.top, ballNode1.style.left)
  
}