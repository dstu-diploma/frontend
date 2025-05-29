export const generateGradient = () => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
    '#E67E22',
    '#2ECC71',
  ]

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
  const color1 = getRandomColor()
  const color2 = getRandomColor()
  const angle = Math.floor(Math.random() * 360)

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`
}
