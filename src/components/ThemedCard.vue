<template>
  <div
    class="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto
           rounded-lg shadow-md p-4 sm:p-6 lg:p-8
           transition-colors duration-500
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-100
           border dark:border-gray-700"
  >
    <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold mb-3">
      {{ title }}
    </h2>
    <p class="text-sm sm:text-base mb-4">
      {{ description }}
    </p>
    
    <p v-if="secondaryDescription" class="text-sm sm:text-base mb-6 font-caveat">
      {{ secondaryDescription }}
    </p>

    <router-link
      v-if="linkTo"
      :to="linkTo"
      class="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md
             text-white bg-indigo-600 hover:bg-indigo-700
             dark:bg-indigo-500 dark:hover:bg-indigo-600
             transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <font-awesome-icon v-if="linkIcon" :icon="linkIcon" class="mr-2" />
      {{ linkText }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Tarjeta Temática',
  },
  description: {
    type: String,
    default: 'Esta tarjeta se adapta al tema y también al tamaño de tu pantalla.',
  },
  secondaryDescription: {
    type: String,
    default: '', // Opcional
  },
  linkText: {
    type: String,
    default: 'Continuar',
  },
  linkTo: {
    type: [String, Object], // Puede ser una ruta string o un objeto de router-link
    default: null, // Si es null, no se muestra el botón/enlace
  },
  linkIcon: {
    type: Array, // [ 'fas', 'icon-name' ]
    default: () => ['fas', 'arrow-right'], // Icono por defecto
  }
});
</script>

<style scoped>
/* No se necesitan estilos con 'scoped' si todo se maneja con Tailwind CSS */
</style>