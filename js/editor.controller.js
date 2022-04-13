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
    drawText(
      meme.lines[0].txt,
      meme.lines[0].size,
      meme.lines[0].align,
      meme.lines[0].color,
      gElCanvas.width / 2,
      50 + meme.selectedLineIdx * 50
    )
  }
}

function drawText(txt, size, align, color, x, y) {
  gCtx.textAlign = align
  gCtx.lineWidth = 2
  gCtx.fillStyle = 'white'
  gCtx.strokeStyle = color
  gCtx.font = `${size}px impact`
  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}
