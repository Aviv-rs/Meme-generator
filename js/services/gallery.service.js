'use strict'
let gImgs

const IMGS_KEY = 'memeImgs'

function createImgs() {
  let imgs = loadFromStorage(IMGS_KEY)
  if (!imgs || !imgs.length) {
    imgs = [
      createImg('img/3.jpg', ['cute', 'animals']),
      createImg('img/1.jpg', ['politics', 'trump']),
      createImg('img/2.jpg', ['cute', 'animals']),
      createImg('img/14.jpg', ['movies', 'morphius', 'matrix']),
      createImg('img/5.jpg', ['cute', 'baby']),
      createImg('img/6.jpg', ['aliens']),
      createImg('img/7.jpg', ['funny', 'baby']),
      createImg('img/4.jpg', ['cute', 'animals']),
      createImg('img/10.jpg', ['funny', 'politics', 'obama']),
      createImg('img/8.jpg', ['willy wonka', 'sarcastic']),
      createImg('img/15.jpg', ['movies']),
      createImg('img/9.jpg', ['evil', 'baby']),
      createImg('img/11.jpg', ['funny', 'face to face']),
      createImg('img/12.jpg', ['haim hecht']),
      createImg('img/13.jpg', ['movies', 'leo']),
      createImg('img/16.jpg', ['movies', 'star trek']),
      createImg('img/17.jpg', ['politics', 'putin']),
      createImg('img/18.jpg', ['movies', 'toy story']),
    ]
  }
  gImgs = imgs
  _saveImgsToStorage()
}

function getFilteredImgs(filter) {
  return gImgs.filter(img =>
    img.keywords.some(keyword => keyword.startsWith(filter.toLowerCase()))
  )
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

function getImgs(filter) {
  if (!filter) return gImgs

  const filteredImgs = getFilteredImgs(filter)

  return filteredImgs
}

function _saveImgsToStorage() {
  saveToStorage(IMGS_KEY, gImgs)
}
