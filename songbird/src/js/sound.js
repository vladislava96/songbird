export default class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.isPlay = true;
    document.body.appendChild(this.sound);
  }

  play() {
    this.isPlay = true;
    this.sound.play();
  }
}