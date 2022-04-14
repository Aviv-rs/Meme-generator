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
        size: 50,
        align: 'center',
        color: 'white',
      },
      {
        txt: 'insert meme text',
        size: 50,
        align: 'center',
        color: 'white',
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

function _saveImgsToStorage() {
  saveToStorage(IMGS_KEY, gImgs)
}
