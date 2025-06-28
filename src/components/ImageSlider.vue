<template>
  <div
    ref="sliderContainer"
    class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-900"
    tabindex="0"
    @keydown="handleKeydown"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <transition name="slide-fade" mode="out-in">
      <img
        :key="currentImageIndex"
        :src="images[currentImageIndex]"
        alt="Slider image"
        class="absolute object-contain max-w-full max-h-full"
        @click="openNotificationModal('info', 'Información', `Imagen ${currentImageIndex + 1} de ${images.length}`)"
      />
    </transition>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 px-4 rounded-full bg-black bg-opacity-60 text-white text-sm font-semibold">
      {{ currentImageIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['open-notification-modal']); // Para mostrar notificaciones si es necesario

const currentImageIndex = ref(0);
const sliderContainer = ref(null); // Referencia al div del slider para manejar focus y eventos

// --- Lógica de navegación ---
const goToNextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const goToPrevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};

// --- Manejo de Teclado (Flechas Izquierda/Derecha) ---
const handleKeydown = (event) => {
  if (event.key === 'ArrowRight') {
    goToNextImage();
    event.preventDefault(); // Evita el scroll si el foco está en el body
  } else if (event.key === 'ArrowLeft') {
    goToPrevImage();
    event.preventDefault(); // Evita el scroll
  }
};

// --- Manejo de Gestos Táctiles (Touch Events) ---
const touchStartX = ref(0);
const touchEndX = ref(0);
const minSwipeDistance = 50; // Distancia mínima en píxeles para considerar un swipe

const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value;
  if (diff > minSwipeDistance) {
    // Swipe hacia la izquierda (mover a la siguiente imagen)
    goToNextImage();
  } else if (diff < -minSwipeDistance) {
    // Swipe hacia la derecha (mover a la imagen anterior)
    goToPrevImage();
  }
  // Resetear valores
  touchStartX.value = 0;
  touchEndX.value = 0;
};

// --- Métodos públicos (si el padre necesita forzar la navegación) ---
const next = () => goToNextImage();
const prev = () => goToPrevImage();

// --- Integración con el Modal de Notificación ---
const openNotificationModal = (type, title, message) => {
  emit('open-notification-modal', type, title, message);
};

// --- Ciclo de vida ---
onMounted(() => {
  // Asegurarse de que el div sea enfocable para los eventos de teclado
  if (sliderContainer.value) {
    sliderContainer.value.focus();
  }
  // Añadir listener global de teclado si el slider no está enfocado
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Exponer funciones si el padre las necesita
defineExpose({
  next,
  prev,
});
</script>

<style scoped>
/* Animación de deslizamiento suave */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%); /* Viene desde la derecha */
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%); /* Sale hacia la izquierda */
}

/* Puedes ajustar esto para transiciones de izquierda a derecha también si quieres una dirección más clara */
/* Por ejemplo, para que siempre entren desde la dirección del "siguiente" */
/*
.slide-fade-left-enter-from { opacity: 0; transform: translateX(-100%); }
.slide-fade-left-leave-to { opacity: 0; transform: translateX(100%); }
*/
</style>