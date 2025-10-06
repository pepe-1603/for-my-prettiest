<script setup>
// src/App.vue
import { ref } from 'vue'
import WelcomeModal from './components/modals/WelcomeModal.vue'
import SettingsDropdown from './components/SettingsDropdown.vue'

// ESTADO PARA CONTROLAR EL MODAL... (se mantiene igual)
const hasSeenIntro = sessionStorage.getItem('hasSeenIntro') === 'true'
const showIntroModal = ref(!hasSeenIntro)

// FUNCIÓN PARA CERRAR Y MARCAR COMO VISTO... (se mantiene igual)
const handleCloseIntro = () => {
  showIntroModal.value = false
  sessionStorage.setItem('hasSeenIntro', 'true')
}
</script>

<template>
  <div
    id="default-layout"
    class="relative min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <div class="absolute top-4 right-4 z-50">
      <SettingsDropdown />
    </div>
    
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>

    <WelcomeModal :is-visible="showIntroModal" @close="handleCloseIntro" />
    
  </div>
</template>

<style scoped>
/* ... (Estilos de Transición Fade se mantienen iguales) ... */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>