'use strict'

let gElCanvas, gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onEditorInit(imgId) {
  document.querySelector('.gallery-link').classList.remove('active')
  closeGallery()
  gElCanvas = document.querySelector('.editor-canvas')
  gCtx = gElCanvas.getContext('2d')
  createMeme(imgId)
  renderMeme(imgId)
  openEditor()
  resizeCanvas()

  if (gElCanvas.width < 500) createMeme(imgId)
  renderMeme(imgId)
  addListeners()
}

function renderMeme(imgId, isDownload) {
  const elLink = document.querySelector('.download-meme')
  const meme = getMeme()
  const imgUrl = getImgById(imgId).url
  const img = new Image()

  img.src = imgUrl

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
      // Load font before calculations
      gCtx.font = `${line.size}px impact`
      const txtMetrics = gCtx.measureText(line.txt)
      let x = line.pos.x
      let y = line.pos.y

      drawText(line.txt, line.color, x, y, line.align, line.baseLine)

      if (idx === meme.selectedLineIdx && !isDownload) {
        const txtHeight = line.size
        if (line.align === 'center') x -= txtMetrics.width / 2
        else if (line.align === 'right') x -= txtMetrics.width

        if (line.baseLine === 'middle')
          y -= txtMetrics.fontBoundingBoxDescent / 2
        else if (line.baseLine === 'bottom') y -= line.size

        drawRect(x, y, txtMetrics.width, txtHeight)
      }
    })
    if (isDownload) {
      elLink.href = gElCanvas.toDataURL()
      elLink.download = 'my meme'
      elLink.click()
    }
  }
}

function addListeners() {
  const meme = getMeme()
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme(meme.selectedImgId)
  })
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isSelectedLinePressed(pos)) return
  setLineDrag(true)
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const selectedLine = getSelectedLine()
  if (!selectedLine.isDrag) return
  const meme = getMeme()
  const pos = getEvPos(ev)
  const dx = pos.x - selectedLine.pos.x
  const dy = pos.y - selectedLine.pos.y
  moveSelectedLine(dx, dy)
  selectedLine.pos = pos
  renderMeme(meme.selectedImgId)
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    }
  }
  return pos
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = gElCanvas.width
}

function onSetLineText(lineTxt) {
  const meme = getMeme()
  setLineText(lineTxt)
  renderMeme(meme.selectedImgId)
}

function onSetTxtColor(color) {
  const meme = getMeme()
  setTxtColor(color)
  renderMeme(meme.selectedImgId)
}

function onResizeFont(sizeChange) {
  const meme = getMeme()
  resizeFont(sizeChange)
  renderMeme(meme.selectedImgId)
}

function onSwitchLine() {
  switchLine()
  const elTxtInput = document.querySelector('.meme-text')
  const meme = getMeme()
  const selectedLine = getSelectedLine()
  elTxtInput.value =
    selectedLine.txt !== 'insert meme text' ? selectedLine.txt : ''

  renderMeme(meme.selectedImgId)
}

function onAddLine() {
  const meme = getMeme()
  addLine()
  renderMeme(meme.selectedImgId)
}
function onRemoveLine() {
  const meme = getMeme()
  removeLine()
  renderMeme(meme.selectedImgId)
}

function onAlignTxt(align) {
  const meme = getMeme()

  alignTxt(align)
  renderMeme(meme.selectedImgId)
}

function openEditor() {
  document.querySelector('.editor-page').classList.remove('hidden')
}

function closeGallery() {
  document.querySelector('.gallery-page').classList.add('hidden')
}

function onDownloadMeme() {
  const meme = getMeme()
  renderMeme(meme.selectedImgId, true)
}

function getCanvas() {
  return gElCanvas
}

function drawRect(x, y, width, height) {
  gCtx.beginPath()
  gCtx.rect(x, y, width, height)
  gCtx.stroke()
}

function drawText(txt, color, x, y, align, baseLine) {
  gCtx.textAlign = align
  gCtx.textBaseline = baseLine
  gCtx.lineWidth = 2
  gCtx.fillStyle = color

  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}
