const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songList = [
  {
    name: "2",
    displayName: "Gangnum Style",
    artist: "PSY",
  },
  {
    name: "3",
    displayName: "Look At Her Now",
    artist: "Selena Gomez",
  },
  {
    name: "4",
    displayName: "Tum Kya Mile",
    artist: "Arijit Singh",
  },
];

// Check if Song is Playing
let isPlaying = false;

// Play song
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}

// Pause song
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songList.length - 1) {
    songIndex = 0;
  }
  loadSong(songList[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songList.length - 1;
  }
  loadSong(songList[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songList[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate the display for duration
    const durationInMinutes = Math.floor(duration / 60);
    let durationInSeconds = Math.floor(duration % 60);
    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationInSeconds) {
      durationEl.textContent = `${durationInMinutes}:${durationInSeconds}`;
    }
    // Calculate the display for current
    const currentInMinutes = Math.floor(currentTime / 60);
    let currentInSeconds = Math.floor(currentTime % 60);
    if (currentInSeconds < 10) {
      currentInSeconds = `0${currentInSeconds}`;
    }
    currentTimeEl.textContent = `${currentInMinutes}:${currentInSeconds}`;
  }
}

//  Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
