<script setup lang="js" name="welcomeModal">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  // Controla la visibilidad del modal
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

// Manejador para cerrar el modal
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm mx-4 p-8 text-center transform transition-all duration-500 scale-100 opacity-100"
        role="dialog"
        aria-modal="true"
      >
        <h2 class="text-3xl font-extrabold text-primary-pink dark:text-secondary-pink mb-4">
          ¡Hola, Preciosa!
        </h2>
        
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 font-caveat">
          Tómate un momento para disfrutar de este pequeño rincón digital que creé solo para ti. 
          Aquí hay cartas, música y recuerdos especiales.
        </p>
        
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Pulsa el botón de abajo para empezar a explorar.
        </p>

        <button
          @click="closeModal"
          class="w-full py-3 px-6 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-secondary-pink transition-colors duration-300 transform hover:scale-[1.02]"
        >
          ¡Quiero Entrar! 💖
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Transiciones para que el modal aparezca y desaparezca con estilo */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
/* Opcional: animar la tarjeta del modal al entrar */
.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: all 0.3s ease;
}
.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}
</style>