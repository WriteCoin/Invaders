import { getState, updateState } from "./state"
import { Player, PlayerStatus } from "./types"

export const height = 100
export const width = 15

export const render = (player: Player) => (playerNode: HTMLElement) => 
  playerNode.style.top = player.posY.toString() + "px"

export const setup = () => {
  const state = getState()
  render (state.player) (state.playerNode)
  const playerNode = state.playerNode
  playerNode.style.width = width.toString() + "px"
  playerNode.style.height = height.toString() + "px"
}

export const setPosY = (posY: number) => {
  updateState(st => ({...st, player: {...st.player, posY}}))
  const state = getState()
  render (state.player) (state.playerNode)
}

export const moveUp = (speed: number) => {
  const state = getState()
  setPosY(state.player.posY - speed)
}
export const moveDown = (speed: number) => {
  const state = getState()
  setPosY(state.player.posY + speed)
}

export const setStatus = (status: PlayerStatus) => 
  updateState(st => ({...st, player: {...st.player, status}}))