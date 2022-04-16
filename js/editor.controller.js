'use strict'

let gElCanvas, gCtx, gCanvasURL

function onEditorInit(imgId) {
  closeGallery()
  gElCanvas = document.querySelector('.editor-canvas')
  gCtx = gElCanvas.getContext('2d')
  createMeme(imgId)
  renderMeme(imgId)
  openEditor()
  resizeCanvas()
  addListeners()
}

function addListeners() {
  const meme = getMeme()

  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme(meme.selectedImgId)
  })
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
  elTxtInput.value =
    meme.lines[meme.selectedLineIdx].txt !== 'insert meme text'
      ? meme.lines[meme.selectedLineIdx].txt
      : ''

  renderMeme(meme.selectedImgId)
}

function onAddLine() {
  const meme = getMeme()
  addLine()
  meme.selectedLineIdx = 0
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

function saveCanvasAsUrl() {
  gCanvasURL = gElCanvas.toDataURL()
}

function renderCanvasAsImg() {
  const img = new Image()
  const src = gCanvasURL
  img.src = src
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
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
      let x, y
      if (line.align === 'center') x = gElCanvas.width / 2
      else if (line.align === 'left') x = 10
      else x = gElCanvas.width - 10
      if (line.baseLine === 'middle') y = gElCanvas.height / 2
      else if (line.baseLine === 'top') y = 10
      else {
        y = gElCanvas.height - 10
      }
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
