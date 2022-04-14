'use strict'

let gElCanvas, gCtx

function onEditorInit(imgId) {
  closeGallery()
  gElCanvas = document.querySelector('.editor-canvas')
  gCtx = gElCanvas.getContext('2d')
  createMeme(imgId)
  renderMeme(imgId)
  openEditor()
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
  const elTxtInput = document.querySelector('.meme-text')
  switchLine()
  const meme = getMeme()
  elTxtInput.value =
    meme.lines[meme.selectedLineIdx].txt !== 'insert meme text'
      ? meme.lines[meme.selectedLineIdx].txt
      : ''

  renderMeme(meme.selectedImgId)
  setTimeout(renderLineFocus, 100)
}

function openEditor() {
  document.querySelector('.editor-page').classList.remove('hidden')
}

function closeGallery() {
  document.querySelector('.gallery-page').classList.add('hidden')
}

function renderMeme(imgId) {
  const meme = getMeme()
  const imgUrl = getImgById(imgId).url
  const img = new Image()
  img.src = imgUrl

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
      const lineY =
        meme.lines.length - 1 === idx
          ? gElCanvas.height - line.size / 2
          : line.size + idx * line.size
      drawText(
        line.txt,
        line.size,
        line.align,
        line.color,
        gElCanvas.width / 2,
        lineY
      )
      renderLineFocus()
    })
  }
}

function renderLineFocus() {
  const meme = getMeme()
  const textSize = meme.lines[meme.selectedLineIdx].size
  const lineYend =
    meme.lines.length - 1 === meme.selectedLineIdx
      ? gElCanvas.height - textSize / 2
      : textSize + meme.selectedLineIdx * textSize

  drawRect(
    textSize,
    lineYend - textSize + 10,
    gElCanvas.width - textSize * 2,
    textSize
  )
}

function drawText(txt, size, align, color, x, y) {
  gCtx.textAlign = align
  gCtx.lineWidth = 2
  gCtx.fillStyle = color
  gCtx.font = `${size}px impact`
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function drawRect(x, y, xEnd, Yend) {
  gCtx.beginPath()
  gCtx.rect(x, y, xEnd, Yend)
  gCtx.stroke()
}
