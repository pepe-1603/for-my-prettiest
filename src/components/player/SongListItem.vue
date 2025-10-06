<template>
  <li
    class="relative flex items-center justify-start flex-row-reverse gap-4 w-full p-4 rounded-md hover:cursor-pointer transition duration-400 ease-in-out"
    :class="{
      'bg-blue-50 dark:bg-blue-800 shadow-md': isPlaying,
      'hover:bg-gray-50 dark:hover:bg-gray-700': !isPlaying,
      'transform rotate-180': rotateContent
    }"
    @click="togglePlayPause"
  >

    <div
      class="relative min-w-8 max-w-10 grid place-content-center"
      @click.stop
    >
      <font-awesome-icon
        class="h-6 w-6 rounded-full dark:text-gray-400 text-gray-600 hover:text-blue-600 dark:hover:text-white scale-100 hover:scale-110 transition duration-300 cursor-pointer"
        :icon="['fas', 'ellipsis']"
        @click="toggleOptionsDropdown"
        ref="ellipsisButtonRef"
      />

      <transition name="fade">
        <div
          v-if="isOptionsOpen"
          ref="optionsMenuRef"
          class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-50
                 transition-colors duration-500 p-2 text-sm whitespace-nowrap"
          @click.stop
        >
          <ul class="space-y-1">
            <li>
              <button
                @click="requestDownload" class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center"
              >
                <font-awesome-icon :icon="['fas', 'download']" class="mr-2" /> Descargar
              </button>
            </li>
            <li>
              <button
                @click="requestMoreInfo" class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center"
              >
                <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-2" /> Más info
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <div id="song" class="relative h-full w-full self-center space-y-2" :class="{ 'transform rotate-180': rotateContent }">
      <p class="text-base sm:text-lg md:text-xl font-semibold">{{ song.name }}</p>
      <p class="text-xs sm:text-sm">{{ song.artist }}</p>
    </div>

    <div id="albumcover" class="max-h-full h-full min-w-8 max-w-12 ml-4">
      <img
        :src="song.albumArt || 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Album'"
        alt="Album Cover"
        class="w-full h-full object-cover rounded"
      />
    </div>

    <div class="relative max-h-full min-w-8 max-w-10 grid place-content-center">
      <BarAnimationSong v-if="isPlaying" color="blue" />
      <font-awesome-icon
        v-else
        :icon="['fas', 'play']"
        class="w-[60%] h-full text-blue-600 hover:text-blue-800 transition-colors"
      />
    </div>

  </li>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BarAnimationSong from '../skeletons/BarAnimationSong.vue';

const props = defineProps({
  song: Object,
  isPlaying: Boolean,
  rotateContent: {
    type: Boolean,
    default: false
  }
});

// NUEVOS EMITS para los modales
const emit = defineEmits(['play-song', 'pause-song', 'open-download-modal', 'open-more-info-modal']);

const isOptionsOpen = ref(false);
const ellipsisButtonRef = ref(null);
const optionsMenuRef = ref(null);

const togglePlayPause = () => {
  if (isOptionsOpen.value) {
    isOptionsOpen.value = false;
    return;
  }
  
  if (props.isPlaying) {
    emit('pause-song', props.song);
  } else {
    emit('play-song', props.song);
  }
};

const toggleOptionsDropdown = () => {
  isOptionsOpen.value = !isOptionsOpen.value;
};

const handleClickOutside = (event) => {
  if (
    isOptionsOpen.value &&
    ellipsisButtonRef.value && !ellipsisButtonRef.value.contains(event.target) &&
    optionsMenuRef.value && !optionsMenuRef.value.contains(event.target)
  ) {
    isOptionsOpen.value = false;
  }
};

// NUEVAS FUNCIONES: Emiten eventos en lugar de manejar la lógica directamente
const requestDownload = () => {
  emit('open-download-modal', props.song);
  isOptionsOpen.value = false; // Cerrar el dropdown después de emitir
};

const requestMoreInfo = () => {
  // Puedes personalizar el título y mensaje del modal de notificación
  emit('open-more-info-modal', 'info', 'Información de la Canción', `Título: ${props.song.name}\nArtista: ${props.song.artist}\nID: ${props.song.id}`);
  isOptionsOpen.value = false; // Cerrar el dropdown
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>