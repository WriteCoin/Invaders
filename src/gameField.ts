export const width = 860,
             height = 640

export const setup = () => {
  const gameField = document.getElementById("gameField")

  gameField.style.width = width.toString() + 'px'
  gameField.style.height = height.toString() + 'px'
}