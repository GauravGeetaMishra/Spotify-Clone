console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
const audioElement = new Audio('songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
    {songName: "Bhaye Pragat Kripala - (Rajan Ji)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Bholenath - (Kaka)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Pehla Nasha - (Sanam)", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Raabta - (Nikhita Gandhi)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Rim Jhim - (Jubin Nautiyal)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tera Hone Laga - (Slowed + Reverb)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Thoda Thoda Pyar - (Stebin Ben)", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tu Milta Hai Mujhe - (Raj Barman)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tum Agar Samne - (Female)", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tumse Bhi Zyada - (Arijit Singh)", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Matargasti", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Namo Namo - (Amit Trivedi)", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "O Mere Dil Ke Chain - (Sanam)", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Pehli Dafa - (Atif Aslam)", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Tere Bina - (Zaeden)", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Teri Jhuki Nazar - (Shafqat Amanat Ali)", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Tum Hi Aana - (Jubin Nautiyal)", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
];

songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        togglePlayPause(true);
    } else {
        audioElement.pause();
        togglePlayPause(false);
    }
});

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    togglePlayPause(true);
};

const togglePlayPause = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
    gif.style.opacity = isPlaying ? 1 : 0;
};

document.querySelectorAll('.songItemPlay').forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        playSong(songIndex);
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});
