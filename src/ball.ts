import { getState, updateState } from "./state"
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
  updateState(state => ({...state, ball: {...state.ball, posX, posY}}))
  const state = getState()
  // console.log(state.ball.posX, state.ball.posY)
  render(state.ball)(state.ballNode)
}

export const setSpeed = (speed: number) => 
  updateState(state => ({...state, ball: {...state.ball, speed}}))

export const setAngle = (angle: number) =>
  updateState(state => ({...state, ball: {...state.ball, angle}}))

export const addAngle = () =>
  setAngle(getState().ball.angle + angleT)

export const decAngle = () =>
  setAngle(getState().ball.angle - angleT)

export const isTouchedWalls = () => {
  const ball = getState().ball
  return ball.posX === radius
      || ball.posY === radius
      || ball.posX === gameField.width - radius
      || ball.posY === gameField.height - radius
}

export const getTouchedWall = () => {
  const ball = getState().ball
  return  ball.posX <= radius ? Wall.Left
        : ball.posY <= radius ? Wall.Top
        : ball.posX >= gameField.width - radius ? Wall.Right
        : ball.posY >= gameField.height - radius ? Wall.Bottom : undefined
}

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