<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl
                                bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all
                                border dark:border-gray-700 text-gray-900 dark:text-white">
              <DialogTitle as="h3" class="text-lg font-bold leading-6 flex items-center mb-4">
                <font-awesome-icon :icon="['fas', 'download']" class="text-blue-500 mr-3 text-xl" />
                Descargar Canción
              </DialogTitle>

              <div class="mt-2 text-sm text-gray-500 dark:text-gray-300">
                <p class="mb-2">Estás a punto de descargar:</p>
                <div v-if="song" class="flex items-center space-x-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700">
                  <img :src="song.albumArt || 'https://via.placeholder.com/60/0000FF/FFFFFF?text=Album'"
                       alt="Album Cover" class="w-12 h-12 rounded object-cover" />
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white">{{ song.name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ song.artist }}</p>
                  </div>
                </div>
                <p v-else class="text-red-500">No se ha especificado una canción.</p>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm font-medium
                         text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium
                         text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="confirmDownload"
                >
                  Confirmar Descarga
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  song: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};

const confirmDownload = () => {
  emit('confirm', props.song); // Emite la canción para que el padre la descargue
  closeModal(); // Cierra el modal después de confirmar
};
</script>