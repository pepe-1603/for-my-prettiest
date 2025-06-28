<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal(false)" class="relative z-50">
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
              <DialogTitle as="h3" class="text-lg font-bold leading-6 flex items-center mb-3"
                           :class="{
                             'text-yellow-500': type === 'warning',
                             'text-red-500': type === 'danger',
                             'text-blue-500': type === 'info',
                           }">
                <font-awesome-icon
                  :icon="['fas', icon]"
                  class="mr-3 text-xl"
                />
                {{ title }}
              </DialogTitle>

              <div class="mt-2 text-sm text-gray-500 dark:text-gray-300">
                <p>{{ message }}</p>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm font-medium
                         text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="closeModal(false)"
                >
                  {{ cancelButtonText }}
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
                         text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  :class="{
                    'bg-red-500 hover:bg-red-600 focus-visible:ring-red-500': type === 'danger',
                    'bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500': type === 'info',
                    'bg-yellow-500 hover:bg-yellow-600 focus-visible:ring-yellow-500': type === 'warning',
                  }"
                  @click="closeModal(true)"
                >
                  {{ confirmButtonText }}
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
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmButtonText: {
    type: String,
    default: 'Confirmar',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancelar',
  },
  type: {
    type: String, // 'warning', 'danger', 'info'
    default: 'info',
  },
});

const emit = defineEmits(['close', 'confirm']);

const icon = computed(() => {
  switch (props.type) {
    case 'warning': return 'exclamation-triangle';
    case 'danger': return 'exclamation-circle'; // O 'trash' si es para eliminar
    case 'info':
    default: return 'question-circle';
  }
});

const closeModal = (confirmed) => {
  if (confirmed) {
    emit('confirm');
  }
  emit('close'); // Siempre cierra el modal
};
</script>