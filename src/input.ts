import * as player from "./player"
import { getState, updateState } from "./state"
import { PlayerStatus } from "./types"
import * as gameField from "./gameField"

let moveTimer
const allowedKeys: string[] = ["ArrowUp", "ArrowDown"]
const interval = 100

const onKeyDown = (event: KeyboardEvent) => {
  const state = getState()

  const isMove = allowedKeys.includes(event.key)

  const isIdle = state.player.status === PlayerStatus.Idle

  const isDown = event.key === "ArrowDown"
  const isUp = event.key === "ArrowUp"

  const isDownCheck = isIdle && isDown
  const isUpCheck = isIdle && isUp

  isMove ? (isDownCheck ? player.setStatus(PlayerStatus.MoveDown) : isUpCheck ? player.setStatus(PlayerStatus.MoveUp) : void 0)
    : undefined
}

const onKeyUp = (event: KeyboardEvent) => {
  allowedKeys.includes(event.key) && player.setStatus(PlayerStatus.Idle)
}

const onMoveInterval = () => {
  const state = getState()

  const speedDelta = state.player.speed / (1000 / interval)

  const isMoveDown = state.player.status === PlayerStatus.MoveDown
  const isMoveUp = state.player.status === PlayerStatus.MoveUp

  // console.log(gameField.height, player.height)
  const limDown = gameField.height - player.height
  // console.log(limDown)

  const isMoveDownCheck = isMoveDown && state.player.posY < limDown
  const isMoveUpCheck = isMoveUp && state.player.posY > 0

  isMoveDownCheck && player.moveDown(speedDelta)
  isMoveUpCheck && player.moveUp(speedDelta)

  state.isGameOver && clearInterval(moveTimer) 
}

export const setup = () => {
  window.addEventListener("keydown", onKeyDown)
  window.addEventListener("keyup", onKeyUp)
  moveTimer = setInterval(onMoveInterval, interval)
}