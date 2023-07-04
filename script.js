// Selecionar os elementos do player de música
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTime = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress-bar');
const duration = document.querySelector('.duration');
const volumeDownBtn = document.getElementById('volumeDownBtn');
const volumeUpBtn = document.getElementById('volumeUpBtn');
const volumeBar = document.querySelector('.volume-bar');

// Array de músicas
const songs = [
  // Lista de músicas aqui
  {
    title: 'Sei lá',
    artist: 'Choji, Lil Gabi',
    image:  '../imgs/musica1.jpg',
    audio: '../sounds/sla.mp3',
    duration: '2:27' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'Camisa do Flamengo',
    artist: 'Mc Meno k & Dj Beats',
    image: '../imgs/musica2.jpg',
    audio: '../sounds/camisadoflamengo.mp3',
    duration: '2:32' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'Os coringas do Flamengo',
    artist: 'Mc Poze do Rodo',
    image: '../imgs/musica3.jpg',
    audio: '../sounds/coringasdofla.mp3',
    duration: '2:52' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'Funk do Pet',
    artist: 'Mc Robinho da Prata',
    image: '../imgs/musica4.jpg',
    audio: '../sounds/funkdopet.mp3',
    duration: '3:06' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'Ai Pedro',
    artist: 'FutParódias',
    image: '../imgs/musica5.jpg',
    audio: '../sounds/aiPedro.mp3',
    duration: '2:01' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'O flamengo chegou',
    artist: 'Mc Navi',
    image: '../imgs/musica6.jpg',
    audio: '../sounds/oflamengochegou.mp3',
    duration: '2:51' // Duração da música no formato 'minutos:segundos'
  },
  {
    title: 'Bonde do mengão sem freio',
    artist: 'Mc Rell',
    image: '../imgs/musica7.jpg',
    audio: '../sounds/paradonaesquina.mp3',
    duration: '2:21' // Duração da música no formato 'minutos:segundos'
  },
];

// Variáveis para controlar o estado do player de música
let isPlaying = false;
let currentSongIndex = 0;
let volume = 1; // Volume inicial (varia de 0 a 1)

// Criar instância do objeto Audio
const audio = new Audio();

// Função para alternar entre reproduzir e pausar a música
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  isPlaying = !isPlaying;
}

// Função para reproduzir a música anterior
function playPrevious() {
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  // Atualizar as informações da música atual no player

  if (isPlaying) {
    togglePlay();
  }

  updateCurrentSong();
}

// Função para reproduzir a próxima música
function playNext() {
  currentSongIndex++;

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  // Atualizar as informações da música atual no player

  if (isPlaying) {
    togglePlay();
  }

  updateCurrentSong();
}

// Função para atualizar o tempo da música
function updateTime() {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;

  // Atualizar a posição da barra de progresso
  progressBar.value = progressPercent;

  // Atualizar o tempo atual da música
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  currentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

  // Atualizar a duração total da música
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);
  duration.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}

// Event listener para atualizar o tempo da música
audio.addEventListener('timeupdate', updateTime);

// Event listener para atualizar a música atual no player
audio.addEventListener('ended', playNext);

// Event listener para atualizar o volume da música
audio.volume = volume;
volumeBar.value = volume;

volumeDownBtn.addEventListener('click', () => {
  volume -= 0.1;
  if (volume < 0) volume = 0;
  audio.volume = volume;
  volumeBar.value = volume;
});

volumeUpBtn.addEventListener('click', () => {
  volume += 0.1;
  if (volume > 1) volume = 1;
  audio.volume = volume;
  volumeBar.value = volume;
});

// Atualizar as informações da música atual no player
function updateCurrentSong() {
  const currentSong = songs[currentSongIndex];
  document.querySelector('.song-title').textContent = currentSong.title;
  document.querySelector('.song-artist').textContent = currentSong.artist;
  document.querySelector('.song-image').style.backgroundImage = `url(${currentSong.image})`;
  duration.textContent = currentSong.duration;

  // Atualizar o arquivo de áudio da instância do objeto Audio
  audio.src = currentSong.audio;

  // Iniciar a reprodução automaticamente
  if (isPlaying) {
    audio.play();
  }
}

// Adicionar o evento de clique ao botão de reprodução
playBtn.addEventListener('click', togglePlay);

// Adicionar o evento de clique ao botão anterior
prevBtn.addEventListener('click', playPrevious);

// Adicionar o evento de clique ao botão próximo
nextBtn.addEventListener('click', playNext);

// Chamar a função updateCurrentSong() para definir a primeira música como a música atual
updateCurrentSong();
