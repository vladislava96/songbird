export default class Player {
  constructor(s, place) {
    this.audioPlayer = document.createElement('div');
    this.audioPlayer.className = 'audio-player';

    this.playBtn = document.createElement('button');
    this.playBtn.classList = 'play player-icon';

    this.progress = document.createElement('input');
    this.progress.type = "range";
    this.progress.value = "0";
    this.progress.min = "0";
    this.progress.max = "100";
    this.progress.step = "0.1";
    this.progress.className = 'progress';


    this.progressTime = document.createElement('div');
    this.progressTime.className = 'progress-time';

    this.currentProgressTime = document.createElement('div');
    this.currentProgressTime.textContent = '00:00';
    this.allProgressTime = document.createElement('div');
    this.allProgressTime.textContent = '00:00';

    this.progressTime.append(this.currentProgressTime, this.allProgressTime);

    this.timeBar = document.createElement('div');
    this.timeBar.classList = 'time-bar';
    this.timeBar.append(this.progress, this.progressTime);

    this.songControl = document.createElement('div');
    this.songControl.classList = 'song-control';
    this.songControl.append(this.playBtn, this.timeBar);

    this.soundControl = document.createElement('div');
    this.soundControl.classList = 'sound-control';

    this.soundBtn = document.createElement('div');
    this.soundBtn.classList = 'sound';

    this.progressSound = document.createElement('input');
    this.progressSound.classList = 'progress-sound';
    this.progressSound.type = 'range';
    this.soundValue = '0.4';
    this.progressSound.value = this.soundValue;
    this.progressSound.min = '0';
    this.progressSound.max = '1';
    this.progressSound.step = '0.01';

    this.soundControl.append(this.soundBtn, this.progressSound);

    this.audioPlayer.append(this.songControl, this.soundControl);

    place.append(this.audioPlayer);

    this.isPlay = false;
    this.playNum = 0;
    this.audio = new Audio();
    this.audio.src = s;
    this.timerId = null;

    this.playBtn.addEventListener('click', this.toggleBtn.bind(this));
    this.audio.addEventListener('timeupdate', this.progressLine.bind(this), false);
    this.soundBtn.addEventListener('click', this.toggleMute.bind(this));
    this.progress.addEventListener('input', this.changeProgress.bind(this), false);
    this.progressSound.addEventListener('input', this.changeProgressSound.bind(this), false);
    this.audio.addEventListener('volumechange', this.volumeChange.bind(this), false);
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

        this.currentProgressTime.textContent = `${(currentMinutes < 10 ? '0' : '') + currentMinutes}:${(currentSeconds < 10 ? '0' : '') + currentSeconds}`;

        this.allProgressTime.textContent = `${(durationMinutes < 10 ? '0' : '') + durationMinutes}:${(durationSeconds < 10 ? '0' : '') + durationSeconds}`

      }, 1000)

    } else {
      this.isPlay = false;  
      this.audio.pause();
      clearInterval(this.timerId) 
    }

  }
  
  toggleBtn() {
    this.playBtn.classList.toggle('pause');
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
    this.playBtn.classList.remove('pause');
    this.playBtn.classList.add('play');
    clearInterval(this.timerId);
  }

  toggleMute() {
    if (this.audio.muted) {
        this.audio.muted = false;
        console.log(this.progressSound.value)
        console.log(this.audio.volume)
        this.progressSound.value = this.soundValue;
        this.audio.volume = this.progressSound.value;
        console.log(this.progressSound.value)
        console.log(this.audio.volume)
    } else {
        this.audio.muted = true;
        this.progressSound.value = 0;
    }
  }

  changeProgress() {
    this.audio.currentTime = (this.audio.duration * this.progress.value) / 100;
  }

  changeProgressSound() {
    this.soundValue = this.progressSound.value;
    this.audio.volume = this.soundValue;
  }

  volumeChange() {
    const persent = this.progressSound.value * 100;
    this.progressSound.style.background = `linear-gradient(to right, #386D1D 0%, #386D1D ${persent}%, #FFFFFF ${persent}%, #FFFFFF 100%)`;
    
    if (persent === 0) {
      this.audio.muted = true;
    } else if (persent !== 0) {
      this.audio.muted = false;
    }

    if (this.audio.muted) {
        this.soundBtn.style.backgroundImage = "url('../svg/soundMuted.svg')";
    } else if(this.audio.muted === false){
        this.soundBtn.style.backgroundImage = "url('../svg/sound.svg')";
    }

  }

}




