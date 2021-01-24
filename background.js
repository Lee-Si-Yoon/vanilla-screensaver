const body = document.querySelector("body")
const IMG_NUMBER = 3

/*
function handelImgLoad() {

}
*/

function paintImage(n) {
  const image = new Image()
  image.src = `images/${n + 1}.jpg`
  image.classList.add("bgimage")
  body.prepend(image)
  // API 에서 뭘 받을 때는 이게 필요해짐
  // image.addEventListener("loadend", handelImgLoad)
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER)
  return number
}

function init() {
  const randomNumber = genRandom()
  paintImage(randomNumber)
}

init()