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
  status: PlayerStatus
}

export type Ball = {
  initialPosX: number,
  initialPosY: number,
  initialAngle: number,
  speed: number,
  angle: number,
  posX: number,
  posY: number
}

export type State = {
  playerNode: HTMLElement,
  gameFieldNode: HTMLElement,
  ballNode: HTMLElement,
  player: Player,
  ball: Ball
}