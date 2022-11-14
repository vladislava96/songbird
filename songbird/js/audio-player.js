export default class Player {
  constructor(s, place) {
    this.p = document.createElement('div');
    this.p.className = 'player';

    this.play = document.createElement('button');
    this.play.classList = 'play player-icon';

    this.progress = document.createElement('input');
    this.progress.type = "range";
    this.progress.value = "0";
    this.progress.min = "0";
    this.progress.max = "100";
    this.progress.step = "0.1";
    this.progress.className = 'progress'

    this.progressTime = document.createElement('div');
    this.progressTime.textContent = '00:00 / 00:00';
    this.progressTime.className = 'progress-time';

    this.p.append(this.play, this.progress, this.progressTime);
    place.append(this.p);

    this.isPlay = false;
    this.playNum = 0;
    this.audio = new Audio();
    this.audio.src = s;
    this.timerId = null;

    this.play.addEventListener('click', this.toggleBtn.bind(this));
    this.audio.addEventListener('timeupdate', this.progressLine.bind(this), false)
  }

  playAudio() {
    this.append = 0;

    if (!this.isPlay) {
      this.isPlay = true;
      this.audio.play();
      this.timerId = setInterval(() => {

        let audioTimeRound = Math.round(this.audio.currentTime);
        let audioLength = Math.round(this.audio.duration);

        var currentMinutes = Math.floor(audioTimeRound / 60);
        var currentSeconds = (audioTimeRound - currentMinutes * 60);

        var durationMinutes = Math.floor(audioLength / 60);
        var durationSeconds = (audioLength - durationMinutes * 60);

        this.progressTime.textContent = `${(currentMinutes < 10 ? '0' : '') + currentMinutes}:${(currentSeconds < 10 ? '0' : '') + currentSeconds} / 
        ${(durationMinutes < 10 ? '0' : '') + durationMinutes}:${(durationSeconds < 10 ? '0' : '') + durationSeconds}`;

      }, 1000)

    } else {
      this.isPlay = false;  
      this.audio.pause();
      clearInterval(this.timerId) 
    }
  }
  
  toggleBtn() {
    this.play.classList.toggle('pause');
    this.playAudio()
  }

  progressLine() {
    const persent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progress.style.background = `linear-gradient(to right, #386D1D 0%, #386D1D ${persent}%, #FFFFFF ${persent}%, #FFFFFF 100%)`;
    this.progress.value = persent;
  }
  stop() {
    this.isPlay = false;  
    this.audio.pause();
    this.play.classList.remove('pause');
    this.play.classList.add('play');
    clearInterval(this.timerId);
  }
}




