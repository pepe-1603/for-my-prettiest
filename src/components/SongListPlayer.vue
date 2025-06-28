<template>
  <div class="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto rounded-md shadow dark:shadow-gray-800 p-4 sm:p-6 lg:p-8 transition-colors duration-500 text-gray-800 dark:text-white">
    <section class="flex items-center p-2 mb-4 justify-center">
      <img src="../assets/spotify1.svg" class="w-9 h-9 md:w-14 md:h-14 mr-4" alt="spotify icon" />
      <h1 class="text-xl sm:text-2xl font-bold">Currently Playing</h1>
    </section>

    <section class="p-2">
      <ul id="playlist" class="flex-1 flex flex-col items-center h-fit sm:max-h-[560px] overflow-y-auto ">
        <SongListItem
          v-for="song in songs"
          :key="song.id"
          :song="song"
          :isPlaying="currentPlayingSongId === song.id && !isPaused"
          @play-song="playSong"
          @pause-song="pauseSong"
          @open-download-modal="openDownloadModal" @open-more-info-modal="openNotificationModal" :rotateContent="false"
          />
      </ul>
    </section>

    <div v-if="currentSong" class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
      <h2 class="text-xl font-semibold mb-2">Reproduciendo:</h2>
      <div class="flex items-center space-x-2 sm:space-x-4">
        <div class="mx-2 p-3 border border-gray-400 rounded-full grid place-center">
          <font-awesome-icon :class="isPaused ? 'animate-none' : 'animate-spin transition-700 ' " :icon="['fas', 'music']" class="text-blue-500 size-5 sm:size-6 md:size-7" />
        </div>

        <img
          :src="currentSong.albumArt || 'https://via.placeholder.com/100/0000FF/FFFFFF?text=Album'"
          alt="Album Cover"
          class="w-16 h-16 rounded object-cover"
        />
        <div class="">
          <p class="font-bold">{{ currentSong.name }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentSong.artist }}</p>
        </div>
        <button @click="toggleGlobalPlayPause" class="relative ml-auto p-2.5 md:p-3 grid place-center rounded-full transition-colors"
          :class="isPaused ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'">
          <font-awesome-icon v-if="isPaused" :icon="['fas', 'play']" class="w-5 h-5 text-white" />
          <font-awesome-icon v-else :icon="['fas', 'pause']" class="w-5 h-5 text-white" />
        </button>
      </div>
    </div>

    <audio ref="audioPlayer" @ended="onSongEnded" @canplay="onCanPlay" @waiting="onWaiting" @error="onAudioError"></audio>

    <DownloadModal
      :is-open="isDownloadModalOpen"
      :song="songToDownload"
      @close="closeDownloadModal"
      @confirm="executeDownload"
    />

    <NotificationModal
      :is-open="isNotificationModalOpen"
      :title="notificationModalTitle"
      :message="notificationModalMessage"
      :type="notificationModalType"
      @close="closeNotificationModal"
    />

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import SongListItem from './player/SongListItem.vue';
// import BarAnimationSong from './skeletons/BarAnimationSong.vue'; // No se usa directamente en este template

// Importar los componentes modales
import DownloadModal from './modals/DownloadModal.vue';
import NotificationModal from './modals/NotificationModal.vue';
// import ConfirmModal from './modals/ConfirmModal.vue'; // Si lo necesitas

const songs = ref([
  { id: '1', name: 'El Amor de mi Vida', artist: 'La Adictiva', albumArt: 'https://lh3.googleusercontent.com/nmnesBy7aLnciKJ95iOWFoirmR6yfBo2PPWqqX0hAfp5RmS5xdpdPfRSoRNs3WCK6XK7HnErBZAmT2td=w544-h544-l90-rj', audioSrc: '/music/El Amor de Mi Vida [Gmjs-0ph7gk].mp3' },
  { id: '2', name: 'El Mundo a tus Pies', artist: 'Grupo Firme', albumArt: 'https://lh3.googleusercontent.com/XDPD0h5NI7U7jQOgRxfErA9HVPZFFBa-La9tSXKy-DoIkRjiABoU3C_vElAIMGt-7iRScWQckJtyCkMt-w=w544-h544-l90-rj', audioSrc: '/music/El Mundo a Tus Pies [nRzAcEskdrI].mp3' },
  { id: '3', name: 'Mi Bello Ángel', artist: 'Los Primos MX - Amor Brutal - 2013', albumArt: 'https://lh3.googleusercontent.com/6Q9RuHmqe4eBXehyHvklEqZjgnyKviejBVIFYRvUIgCRytzpY7viPDL76rnE6OZ2Oa_tKIJTrTd022wX=w544-h544-l90-rj', audioSrc: '/music/Mi Bello Ángel [-Xr9-hTYhcQ].mp3' },
  { id: '4', name: 'Quien Se Los Dos Sera', artist: 'Diego Verdaguer', albumArt: 'https://lh3.googleusercontent.com/7vKpGYCcM5jN3Lzs_NYR5AAQ72pBeHXYqoTZtbSOJeowZrFlLvbJ7ZTom_1MxNJTDpQy0dUzmZm_iB0i=w544-h544-l90-rj', audioSrc: '/music/Quién De Los Dos Será [xTEEL3EXCtE].mp3' },
  { id: '5', name: 'Te Regalo', artist: 'Ulices Chaidez Y sus Plebes - Andamos En eL Ruedo - 2016', albumArt: 'https://lh3.googleusercontent.com/OwASkeAFEuQW-o6sq-EsjQIheICMudvzjkrZmhHWWGYqNvPW1D--U-Fjhsj5zJKlGNFwyK9IA6daawM=w544-h544-l90-rj', audioSrc: '/music/Te Regalo [jutZlKx1skw].mp3' },
  { id: '6', name: 'Te Encontre', artist: 'Ulices Chaidez Y sus Plebes - Andamos En eL Ruedo - 2016', albumArt: 'https://lh3.googleusercontent.com/uMEYoTCEwQT6qYcgcg9kZrVvRhHem9L69sLWnnmK7PZ3SkwdhAZP9d5fK810a9ArADy9y9Gbn0l9Xulbpg=w544-h544-l90-rj', audioSrc: '/music/Te Encontre [bkBx5Xgrqtw].mp3' },
]);

const audioPlayer = ref(null);
const currentSong = ref(null);
const currentPlayingSongId = ref(null);
const isPaused = ref(true);
const isLoading = ref(false);
let playPromise = null;
let isProcessing = ref(false);

// --- ESTADO Y FUNCIONES PARA MODALES ---
// Download Modal
const isDownloadModalOpen = ref(false);
const songToDownload = ref(null);

const openDownloadModal = (song) => {
  songToDownload.value = song;
  isDownloadModalOpen.value = true;
};
const closeDownloadModal = () => {
  isDownloadModalOpen.value = false;
  songToDownload.value = null; // Limpiar la canción seleccionada
};
const executeDownload = (song) => {
  // Lógica de descarga que estaba en PlaylistItem, ahora centralizada aquí
  const link = document.createElement('a');
  link.href = song.audioSrc;
  const fileName = `${song.artist} - ${song.name}.mp3`.replace(/[^a-z0-9\-\_.]/gi, '_');
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Opcional: mostrar una notificación de éxito después de la descarga
  openNotificationModal('success', '¡Descarga Iniciada!', `"${song.name}" se está descargando.`);
  closeDownloadModal(); // Cerrar el modal de descarga
};

// Notification Modal
const isNotificationModalOpen = ref(false);
const notificationModalTitle = ref('');
const notificationModalMessage = ref('');
const notificationModalType = ref('info');

const openNotificationModal = (type, title, message) => {
  notificationModalType.value = type;
  notificationModalTitle.value = title;
  notificationModalMessage.value = message;
  isNotificationModalOpen.value = true;
};
const closeNotificationModal = () => {
  isNotificationModalOpen.value = false;
};

// --- FIN ESTADO Y FUNCIONES PARA MODALES ---

const playSong = (songToPlay) => {
  if (isProcessing.value) return;

  isProcessing.value = true;
  if (currentPlayingSongId.value === songToPlay.id && !isPaused.value) return;

  audioPlayer.value.pause();
  audioPlayer.value.currentTime = 0;
  currentSong.value = songToPlay;
  currentPlayingSongId.value = songToPlay.id;
  audioPlayer.value.src = songToPlay.audioSrc;
  isLoading.value = true;

  playPromise = audioPlayer.value.play();
  playPromise?.then(() => {
    isPaused.value = false;
    isLoading.value = false;
    isProcessing.value = false;
  }).catch(err => {
    console.error("Error al iniciar reproducción:", err);
    // Mostrar un modal de error si la reproducción falla
    openNotificationModal('error', 'Error de Reproducción', `No se pudo reproducir "${songToPlay.name}".`);
    isPaused.value = true;
    isLoading.value = false;
    isProcessing.value = false;
  });
};

const pauseSong = (songToPause) => {
  if (isProcessing.value) return;

  isProcessing.value = true;
  if (currentPlayingSongId.value === songToPause.id) {
    audioPlayer.value.pause();
    isPaused.value = true;
  }
  isProcessing.value = false;
};

const toggleGlobalPlayPause = () => {
  if (!currentSong.value || isProcessing.value) return;

  isProcessing.value = true;
  if (isPaused.value) {
    playPromise = audioPlayer.value.play();
    playPromise?.then(() => {
      isPaused.value = false;
      isProcessing.value = false;
    }).catch(error => {
      console.error("Error al reanudar:", error);
      openNotificationModal('error', 'Error de Reproducción', `No se pudo reanudar la reproducción de "${currentSong.value.name}".`);
      isProcessing.value = false;
    });
  } else {
    audioPlayer.value.pause();
    isPaused.value = true;
    isProcessing.value = false;
  }
};

const onSongEnded = () => {
  const idx = songs.value.findIndex(s => s.id === currentPlayingSongId.value);
  if (idx !== -1 && idx < songs.value.length - 1) {
    playSong(songs.value[idx + 1]);
  } else {
    currentSong.value = null;
    currentPlayingSongId.value = null;
    isPaused.value = true;
    audioPlayer.value.src = '';
    openNotificationModal('info', 'Fin de la Lista', 'Has llegado al final de la playlist.');
  }
};

const onCanPlay = () => isLoading.value = false;
const onWaiting = () => isLoading.value = true;

const onAudioError = () => {
  console.error("Error al reproducir la canción. Verifica el archivo o formato.");
  openNotificationModal('error', 'Error de Archivo', 'Hubo un problema al cargar el archivo de música. Intenta con otra canción.');
  audioPlayer.value.pause();
  audioPlayer.value.src = '';
  currentSong.value = null;
  currentPlayingSongId.value = null;
  isPaused.value = true;
};

// Computed para alternar icono de play y bar de animación (mantener si se usa en otro lugar)
// const buttonIcon = computed(() => {
//   return isPaused.value ? ['fas', 'play'] : 'BarAnimationSong';
// });
</script>