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
            <DialogPanel class="w-full max-w-sm transform overflow-hidden rounded-2xl
                                bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all
                                border dark:border-gray-700 text-gray-900 dark:text-white">
              <DialogTitle as="h3" class="text-lg sm:xl font-bold leading-6 flex items-center mb-3"
                           :class="{
                             'text-green-500': type === 'success',
                             'text-red-500': type === 'error',
                             'text-blue-500': type === 'info',
                             'text-yellow-500': type === 'warning',
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
  type: {
    type: String, // 'success', 'error', 'info', 'warning'
    default: 'info',
  },
});

const emit = defineEmits(['close']);

const icon = computed(() => {
  switch (props.type) {
    case 'success': return 'check-circle';
    case 'error': return 'times-circle';
    case 'warning': return 'exclamation-triangle';
    case 'info':
    default: return 'info-circle';
  }
});

const closeModal = () => {
  emit('close');
};
</script>