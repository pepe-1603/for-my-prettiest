<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 dark:bg-black p-4 md:p-8">
    <div class="relative w-full h-full sm:max-w-4xl sm:max-h-[80vh] rounded-xl shadow-2xl overflow-hidden
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                flex items-center justify-center">
      
      <ImageSlider
        :images="imagePaths"
        @open-notification-modal="openNotificationModal"
      />
    </div>

    <IntroModal
      :is-open="isIntroModalOpen"
      @close="closeIntroModal"
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
import { ref, onMounted } from 'vue';
import ImageSlider from '../components/ImageSlider.vue'; // Asegúrate de que la ruta sea correcta
import NotificationModal from '../components/modals/NotificationModal.vue'; // Asegúrate de que la ruta sea correcta
import IntroModal from '../components/modals/IntroModal.vue'; // NUEVA IMPORTACIÓN

// --- Rutas de tus imágenes de ejemplo ---
const imagePaths = ref([
  'https://4kwallpapers.com/images/walls/thumbs_3t/16148.jpg', 
  'https://images8.alphacoders.com/126/thumbbig-1268587.webp',
  'https://images7.alphacoders.com/114/thumbbig-1140691.webp',
  'https://images3.alphacoders.com/846/thumb-440-846645.webp',
  'https://images6.alphacoders.com/134/thumb-440-1347028.webp',
  'https://images8.alphacoders.com/135/thumb-440-1358204.webp',
  'https://images4.alphacoders.com/893/thumb-1920-893006.jpg',
]);

// --- Estado del Modal de Introducción ---
const isIntroModalOpen = ref(false);

const openIntroModal = () => {
  isIntroModalOpen.value = true;
};

const closeIntroModal = () => {
  isIntroModalOpen.value = false;
};

// --- Estado del Modal de Notificación Genérico (para el slider) ---
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

// --- Al cargar la página, abre el modal de introducción ---
onMounted(() => {
  openIntroModal();
});
</script>

<style scoped>
/* No hay estilos específicos aquí, Tailwind maneja la mayoría */
</style>