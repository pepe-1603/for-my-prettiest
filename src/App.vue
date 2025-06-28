<script setup>
// src/App.vue
// Este componente ahora es el layout principal de tu aplicación
import SettingsDropdown from './components/SettingsDropdown.vue'
</script>

<template>
  <div id="default-layout" class="relative min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    
    <!-- Menú en esquina superior derecha -->
    <div class="absolute top-4 right-4 z-50">
      <SettingsDropdown />
    </div>

    <!-- Vista de rutas -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>

/* --- Estilos para la Transición Fade --- */

/* Estado inicial y final para la entrada */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s ease-out; /* Duración y curva de la animación de entrada */
}
.fade-enter-to {
  opacity: 1;
}

/* Estado inicial y final para la salida */
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.5s ease-in; /* Duración y curva de la animación de salida */
}
.fade-leave-to {
  opacity: 0;
}
</style>