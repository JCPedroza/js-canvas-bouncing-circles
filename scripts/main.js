const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = canvas.parentElement.offsetWidth
canvas.height = canvas.parentElement.offsetHeight

const PI2 = Math.PI * 2

const drawCircle = ({ x, y }, { radius, width }, { stroke, fill }) => {
  context.beginPath()
  context.arc(x, y, radius, 0, PI2, false)
  context.fillStyle = fill
  context.fill()
  context.lineWidth = width
  context.strokeStyle = stroke
  context.stroke()
}

const peekPosition = ({ x, y, velx, vely }, { radius, width }) => {
  return {
    xsmall: x + velx - radius - width,
    ysmall: y + vely - radius - width,
    xbig: x + velx + radius + width,
    ybig: y + vely + radius + width
  }
}

const nextPosition = ({ x, y, velx, vely }, { radius, width }) => {
  const peek = peekPosition({ x, y, velx, vely }, { radius, width })
  let nextVelx, nextVely

  if (peek.xsmall < 0 || peek.xbig > canvas.width) {
    nextVelx = velx * -1
  } else {
    nextVelx = velx
  }
  if (peek.ysmall < 0 || peek.ybig > canvas.height) {
    nextVely = vely * -1
  } else {
    nextVely = vely
  }

  return {
    x: x + nextVelx,
    y: y + nextVely,
    velx: nextVelx,
    vely: nextVely
  }
}

const circles = [
  {
    position: { x: canvas.width / 2, y: canvas.height / 2, velx: 2, vely: 4 },
    dimension: { radius: 200, width: 2 },
    style: { stroke: 'black', fill: 'blue' }
  },
  {
    position: { x: canvas.width / 2, y: canvas.height / 2, velx: -3, vely: 2 },
    dimension: { radius: 100, width: 3 },
    style: { stroke: 'red', fill: 'yellow' }
  },
  {
    position: { x: canvas.width / 2, y: canvas.height / 2, velx: 10, vely: 16 },
    dimension: { radius: 20, width: 1 },
    style: { stroke: 'green', fill: 'purple' }
  }
]

const frameLimit = 1000000
let frames = 0

const runAnimation = () => {
  frames += 1

  context.clearRect(0, 0, canvas.width, canvas.height)
  circles.forEach((circle) => {
    drawCircle(circle.position, circle.dimension, circle.style)
  })
  circles.forEach((circle) => {
    circle.position = nextPosition(circle.position, circle.dimension)
  })
  if (frames < frameLimit) {
    window.requestAnimationFrame(runAnimation)
  }
}
window.requestAnimationFrame(runAnimation)
