// ===============================
// MUSIC PLAYER
// ===============================

const songs = [
{
title: "Song One",
artist: "Artist One",
src: "songs/song1.mp3",
cover: "images/cover1.jpg"
},
{
title: "Song Two",
artist: "Artist Two",
src: "songs/song2.mp3",
cover: "images/cover2.jpg"
},
{
title: "Song Three",
artist: "Artist Three",
src: "songs/song3.mp3",
cover: "images/cover3.jpg"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");

let songIndex = 0;
let isPlaying = false;
let shuffle = false;
let repeat = false;

// ===============================
// LOAD SONG
// ===============================

function loadSong(index){

audio.src = songs[index].src;

title.textContent = songs[index].title;

artist.textContent = songs[index].artist;

cover.src = songs[index].cover;

playlist.forEach(item=>item.classList.remove("active"));

playlist[index].classList.add("active");

}

loadSong(songIndex);

// ===============================
// PLAY
// ===============================

function playSong(){

audio.play();

isPlaying = true;

playBtn.innerHTML='<i class="fas fa-pause"></i>';

cover.classList.add("playing");

}

// ===============================
// PAUSE
// ===============================

function pauseSong(){

audio.pause();

isPlaying=false;

playBtn.innerHTML='<i class="fas fa-play"></i>';

cover.classList.remove("playing");

}

playBtn.onclick=()=>{

isPlaying ? pauseSong() : playSong();

};

// ===============================
// NEXT
// ===============================

function nextSong(){

if(shuffle){

songIndex=Math.floor(Math.random()*songs.length);

}else{

songIndex++;

if(songIndex>=songs.length){

songIndex=0;

}

}

loadSong(songIndex);

playSong();

}

nextBtn.onclick=nextSong;

// ===============================
// PREVIOUS
// ===============================

function prevSong(){

songIndex--;

if(songIndex<0){

songIndex=songs.length-1;

}

loadSong(songIndex);

playSong();

}

prevBtn.onclick=prevSong;

// ===============================
// PROGRESS
// ===============================

audio.addEventListener("timeupdate",()=>{

const {duration:dur,currentTime:cur}=audio;

if(dur){

progress.style.width=`${(cur/dur)*100}%`;

duration.textContent=formatTime(dur);

currentTime.textContent=formatTime(cur);

}

});

// ===============================
// SEEK
// ===============================

progressContainer.addEventListener("click",(e)=>{

const width=progressContainer.clientWidth;

const click=e.offsetX;

audio.currentTime=(click/width)*audio.duration;

});

// ===============================
// FORMAT TIME
// ===============================

function formatTime(time){

const min=Math.floor(time/60);

const sec=Math.floor(time%60);

return `${min}:${sec<10?"0":""}${sec}`;

}

// ===============================
// VOLUME
// ===============================

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

// ===============================
// PLAYLIST
// ===============================

playlist.forEach((item,index)=>{

item.addEventListener("click",()=>{

songIndex=index;

loadSong(songIndex);

playSong();

});

});

// ===============================
// SHUFFLE
// ===============================

shuffleBtn.onclick=()=>{

shuffle=!shuffle;

shuffleBtn.style.color=shuffle?"lime":"white";

};

// ===============================
// REPEAT
// ===============================

repeatBtn.onclick=()=>{

repeat=!repeat;

audio.loop=repeat;

repeatBtn.style.color=repeat?"lime":"white";

};

// ===============================
// AUTOPLAY
// ===============================

audio.addEventListener("ended",()=>{

if(!repeat){

nextSong();

}

});

// ===============================
// KEYBOARD
// ===============================

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

isPlaying?pauseSong():playSong();

}

if(e.key==="ArrowRight"){

nextSong();

}

if(e.key==="ArrowLeft"){

prevSong();

}

});
