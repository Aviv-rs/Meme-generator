'use strict'

function onGalleryInit() {
  createImgs()
  renderGallery()
}

function renderGallery(filter) {
  const imgs = getImgs(filter)
  let htmlStr = imgs.map(
    img =>
      `<div class="meme"><img onclick="onEditorInit('${img.id}')" src="${img.url}" alt="A picture of a meme template" /> </div>`
  )
  const elGallery = document.querySelector('.meme-gallery')
  elGallery.innerHTML = htmlStr.join('')
}

function onMoveToGallery() {
  document.querySelector('.gallery-link').classList.add('active')

  document.body.classList.remove('menu-open')
  document.querySelector('.meme-text').value = ''
  closeEditor()
  openGallery()
}

function onSearchMeme(keyword) {
  renderGallery(keyword)
}

function onFilterByGenre(elGenre) {
  let filter = elGenre.innerText
  if (filter === 'All') filter = ''
  renderGallery(filter)
}

function closeEditor() {
  document.querySelector('.editor-page').classList.add('hidden')
}

function openGallery() {
  document.querySelector('.gallery-page').classList.remove('hidden')
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open')
}

function onOpenAbout() {
  const modal = document.querySelector('.modal-about')
  modal.style.display = 'block'
}

function closeModalAbout(ev) {
  const modal = document.querySelector('.modal-about')
  if (ev.target !== modal) return
  modal.style.display = 'none'
}

function onPressClose() {
  const modal = document.querySelector('.modal-about')
  modal.style.display = 'none'
}
