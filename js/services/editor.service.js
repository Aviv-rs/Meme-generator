'use strict'
let gMeme

function createMeme(selectedImgId) {
  const canvas = getCanvas()

  gMeme = {
    selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'insert meme text',
        size: 40,
        align: 'center',
        color: 'white',
        baseLine: 'top',
        isDrag: false,
        pos: { x: canvas.width / 2, y: 10 },
      },

      {
        txt: 'insert meme text',
        size: 40,
        align: 'center',
        color: 'white',
        baseLine: 'bottom',
        isDrag: false,
        pos: { x: canvas.width / 2, y: canvas.height - 10 },
      },
    ],
  }
}

function getMeme() {
  return gMeme
}

function setLineText(lineTxt) {
  getSelectedLine().txt = lineTxt
}

function setTxtColor(color) {
  getSelectedLine().color = color
}

function resizeFont(sizeChange) {
  getSelectedLine().size += sizeChange === '+' ? 1 : -1
}

function switchLine() {
  gMeme.selectedLineIdx >= gMeme.lines.length - 1
    ? (gMeme.selectedLineIdx = 0)
    : gMeme.selectedLineIdx++
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function isSelectedLinePressed(clickedPos) {
  const selectedLine = getSelectedLine()
  const txtMetrics = gCtx.measureText(selectedLine.txt)
  const txtWidth = txtMetrics.width
  const pos = selectedLine.pos
  if (selectedLine.baseLine === 'bottom') pos.y -= selectedLine.size
  if (selectedLine.baseLine === 'center') pos.y -= selectedLine.size / 2
  return (
    clickedPos.x >= pos.x - txtWidth / 2 &&
    clickedPos.x <= pos.x + txtWidth / 2 &&
    clickedPos.y >= pos.y &&
    clickedPos.y <= pos.y + selectedLine.size
  )
}

function moveSelectedLine(dx, dy) {
  const selectedLine = getSelectedLine()
  selectedLine.pos.x += dx
  selectedLine.pos.y += dy
}

function addLine() {
  const canvas = getCanvas()

  const newLine = {
    txt: 'insert meme text',
    size: 40,
    align: 'center',
    color: 'white',
    baseLine: 'middle',
    isDrag: false,
    pos: { x: canvas.width / 2, y: canvas.height / 2 },
  }

  gMeme.lines.splice(1, 0, newLine)

  gMeme.selectedLineIdx = 1
}

function removeLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.lines.length <= 1) gMeme.selectedLineIdx = 0
  else gMeme.selectedLineIdx--
}

function setLineDrag(isDrag) {
  getSelectedLine().isDrag = isDrag
}

function alignTxt(align) {
  const currLine = getSelectedLine()
  switch (align) {
    case 'L':
      getSelectedLine().align = 'left'
      currLine.pos.x = 10
      break
    case 'C':
      getSelectedLine().align = 'center'
      currLine.pos.x = gElCanvas.width / 2
      break
    case 'R':
      getSelectedLine().align = 'right'
      currLine.pos.x = gElCanvas.width - 10
      break
  }
}
