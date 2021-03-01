export enum PlayerStatus {
  Idle,
  MoveUp,
  MoveDown
}

export enum Wall {
  Left,
  Bottom,
  Right,
  Top
}

export type Player = {
  posY: number,
  speed: number,
  status: PlayerStatus,
  score: number
}

export type Ball = {
  initialPosX: number,
  initialPosY: number,
  initialAngle: number,
  speed: number,
  angle: number,
  posX: number,
  posY: number,
  hasFaced: boolean
}

export type State = {
  isGameOver: boolean,
  playerNode: HTMLElement,
  gameFieldNode: HTMLElement,
  textScore: HTMLElement,
  ballNode: HTMLElement,
  player: Player,
  ball: Ball
}