const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const PI2 = Math.PI * 2

const adjustCanvasSize = () => {
  canvas.width = canvas.parentElement.offsetWidth
  canvas.height = canvas.parentElement.offsetHeight
}
adjustCanvasSize()
window.onresize = adjustCanvasSize

const canvasMidWidth = canvas.width / 2
const canvasMidHeight = canvas.height / 2

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
    xleft: x + velx - radius - width,
    ytop: y + vely - radius - width,
    xright: x + velx + radius + width,
    ybottom: y + vely + radius + width
  }
}

const nextPosition = ({ x, y, velx, vely }, { radius, width }) => {
  const peek = peekPosition({ x, y, velx, vely }, { radius, width })
  let nextVelx = velx
  let nextVely = vely

  if (peek.xleft < 0 || peek.xright > canvas.width) {
    nextVelx *= -1
  }
  if (peek.ytop < 0 || peek.ybottom > canvas.height) {
    nextVely *= -1
  }

  return {
    x: x + nextVelx,
    y: y + nextVely,
    velx: nextVelx,
    vely: nextVely
  }
}

const randomInteger = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from)
}

const randomHexColor = () => {
  return `#${randomInteger(0, 16777215).toString(16)}`
}

const randomCircle = () => {
  const x = canvasMidWidth
  const y = canvasMidHeight
  const velx = randomInteger(-30, 30)
  const vely = randomInteger(-30, 30)
  const radius = randomInteger(2, 200)
  const width = randomInteger(1, 50)
  const stroke = randomHexColor()
  const fill = randomHexColor()

  return {
    position: { x, y, velx, vely },
    dimension: { radius, width },
    style: { stroke, fill }
  }
}

const circles = [...Array(20)].map(_ => randomCircle())

const runAnimation = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  circles.forEach((circle) => {
    drawCircle(circle.position, circle.dimension, circle.style)
  })

  circles.forEach((circle) => {
    circle.position = nextPosition(circle.position, circle.dimension)
  })

  window.requestAnimationFrame(runAnimation)
}
window.requestAnimationFrame(runAnimation)
