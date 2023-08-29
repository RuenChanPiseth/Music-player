const musicInfor = [
  {
    title: "Until I found you",
    ImgSource: "/img/download.jpeg",
    audioSource:
      "/audio/Stephen Sanchez, Em Beihold - Until I Found You (Lyrics).mp3",
  },
  {
    title: "Night Change",
    ImgSource: "/img/download (1).jpeg",
    audioSource: "/audio/videoplayback.mp3",
  },
  {
    title: "Fire on fire",
    ImgSource: "/img/Fire_on_Fire_single_by_Sam_Smith.jpg",
    audioSource: "/audio/Sam Smith - Fire On Fire (From 'Watership Down').mp3",
  },
];
let songIndex = 0;
const img = document.querySelector(".img-wrapper>img");
const audioSrc = document.querySelector("audio");
const titleSrc = document.querySelector(".title");
const range = document.querySelector("input[type='range']");
const currentTimes = document.getElementById("current-time");
const maxTime = document.getElementById("max-time");
const backwardButton = document.querySelector("i.fa-backward-step");
const playButton = document.querySelector("i.fa-play");
const pauseButton = document.querySelector("i.fa-pause");
const forwardButton = document.querySelector("i.fa-forward-step");
let interval;

function getElement() {
  img.src = musicInfor[songIndex].ImgSource;
  titleSrc.innerHTML = musicInfor[songIndex].title;
  audioSrc.src = musicInfor[songIndex].audioSource;
}
function play() {
  getElement();
  audioSrc.currentTime = range.value;
  audioSrc.play();
  updateRange();
  startSong();
}

function updateRange() {
  audioSrc.addEventListener("loadedmetadata", () => {
    range.max = audioSrc.duration;
    updateTimeDisplay(maxTime, audioSrc.duration);
    interval = setInterval(() => {
      range.value = audioSrc.currentTime;
      updateTimeDisplay(currentTimes, audioSrc.currentTime);
      if (audioSrc.duration == audioSrc.currentTime) {
        range.value = 0;
        endSong();
        clearInterval(interval);
        nextSong();
      }
    }, 500);
  });
}
function setPlay() {
  getElement();
  audioSrc.play();
  updateRange();
  audioSrc.currentTime = range.value;
  startSong();
}
function pause() {
  audioSrc.pause();
  endSong();
}
function startSong() {
  playButton.style.display = "none";
  pauseButton.style.display = "block";
}
function endSong() {
  playButton.style.display = "block";
  pauseButton.style.display = "none";
  currentTimes.innerHTML = "00:00";
}
function updateTimeDisplay(display, time) {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  display.innerHTML = `${minute.toString().padStart(2, "0")}:${second
    .toString()
    .padStart(2, "0")}`;
}
function nextSong() {
  songIndex++;
  if (songIndex >= musicInfor.length) {
    songIndex = 0;
  }
  audioSrc.currentTime = 0;
  range.value = 0;
  play();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = musicInfor.length - 1;
  }
  audioSrc.currentTime = 0;
  range.value = 0;
  play();
}

// addEvent to Listener
backwardButton.addEventListener("click", prevSong);
forwardButton.addEventListener("click", nextSong);
pauseButton.addEventListener("click", pause);
playButton.addEventListener("click", play);
range.addEventListener("input", setPlay);
