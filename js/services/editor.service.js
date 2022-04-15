'use strict'
let gMeme, gImgs
const IMGS_KEY = 'memeImgs'

function createMeme(selectedImgId) {
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
      },
      {
        txt: 'insert meme text',
        size: 40,
        align: 'center',
        color: 'white',
        baseLine: 'bottom',
      },
    ],
  }
}

function createImgs() {
  let imgs = loadFromStorage(IMGS_KEY)
  if (!imgs || !imgs.length) {
    imgs = [
      createImg('img/1.jpg', ['politics']),
      createImg('img/2.jpg', ['cute', 'animals']),
      createImg('img/3.jpg', ['cute', 'animals']),
      createImg('img/4.jpg', ['cute', 'animals']),
      createImg('img/5.jpg', ['cute', 'baby']),
      createImg('img/6.jpg', ['cute', 'baby']),
      createImg('img/7.jpg', ['cute', 'baby']),
      createImg('img/8.jpg', ['cute', 'baby']),
      createImg('img/9.jpg', ['cute', 'baby']),
      createImg('img/10.jpg', ['cute', 'baby']),
      createImg('img/11.jpg', ['cute', 'baby']),
      createImg('img/12.jpg', ['cute', 'baby']),
      createImg('img/13.jpg', ['cute', 'baby']),
      createImg('img/14.jpg', ['cute', 'baby']),
      createImg('img/15.jpg', ['cute', 'baby']),
      createImg('img/16.jpg', ['cute', 'baby']),
      createImg('img/17.jpg', ['cute', 'baby']),
      createImg('img/18.jpg', ['cute', 'baby']),
    ]
  }
  gImgs = imgs
  _saveImgsToStorage()
}

function getImgById(imgId) {
  return gImgs.find(img => img.id === imgId)
}

function createImg(url, keywords) {
  return {
    id: makeId(),
    url,
    keywords,
  }
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function setLineText(lineTxt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = lineTxt
}

function setTxtColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function resizeFont(sizeChange) {
  gMeme.lines[gMeme.selectedLineIdx].size += sizeChange === '+' ? 1 : -1
}

function switchLine() {
  gMeme.selectedLineIdx >= gMeme.lines.length - 1
    ? (gMeme.selectedLineIdx = 0)
    : gMeme.selectedLineIdx++
}

function addLine() {
  const newLine = {
    txt: 'insert meme text',
    size: 40,
    align: 'center',
    color: 'white',
    baseLine: 'middle',
  }
  switch (gMeme.lines.length) {
    case 0:
      newLine.baseLine = 'top'
      gMeme.lines.push(newLine)
      break
    case 1:
      newLine.baseLine = gMeme.lines[0].baseLine === 'bottom' ? 'top' : 'bottom'
      gMeme.lines.push(newLine)
      break
    case 2:
      const newLines = [
        gMeme.lines[0],
        newLine,
        gMeme.lines[gMeme.lines.length - 1],
      ]
      gMeme.lines = newLines
      break
    default:
      gMeme.lines.splice(1, 0, newLine)
  }

  gMeme.selectedLineIdx = 0
}

function removeLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  gMeme.selectedLineIdx--
}

function alignTxt(align) {
  switch (align) {
    case 'L':
      gMeme.lines[gMeme.selectedLineIdx].align = 'left'
      break
    case 'C':
      gMeme.lines[gMeme.selectedLineIdx].align = 'center'
      break
    case 'R':
      gMeme.lines[gMeme.selectedLineIdx].align = 'right'
      break
  }
}

function _saveImgsToStorage() {
  saveToStorage(IMGS_KEY, gImgs)
}
