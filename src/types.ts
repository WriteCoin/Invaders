export enum PlayerStatus {
  Idle,
  MoveUp,
  MoveDown
}

export type Player = {
  posY: number,
  speed: number,
  status: PlayerStatus
}

export type State = {
  playerNode: HTMLElement,
  gameFieldNode: HTMLElement,
  player: Player
}