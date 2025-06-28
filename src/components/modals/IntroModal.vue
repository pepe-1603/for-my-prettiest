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
              <DialogTitle as="h3" class="text-lg font-bold leading-6 flex items-center mb-3 text-blue-500">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-3 text-xl" />
                ¡Bienvenido al Visor de Imágenes!
              </DialogTitle>

              <div class="mt-2 text-sm text-gray-500 dark:text-gray-300">
                <p class="mb-2">Aquí te explicamos cómo interactuar:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>**Desliza con los dedos:** Si estás en un dispositivo móvil, simplemente desliza tu dedo hacia la izquierda o derecha sobre la imagen para navegar.</li>
                  <li>**Flechas del teclado:** En el escritorio, puedes usar las teclas de **flecha izquierda** y **flecha derecha** para cambiar de imagen.</li>
                  <li>**Información:** Haz clic en cualquier imagen para ver su número actual y total.</li>
                </ul>
                <p class="mt-3">¡Disfruta explorando las imágenes!</p>
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium
                         text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Entendido
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
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>