<script setup name="FlipingCardSkeleton">
// Propiedad para controlar cuántas tarjetas esqueleto mostrar
defineProps({
  count: {
    type: Number,
    default: 9, // Por defecto, mostrar 9 esqueletos
  },
})
</script>

<template>
  <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <div
      v-for="i in count"
      :key="i"
      class="group w-full h-64 sm:h-80 md:h-96"
    >
      <div
        class="relative h-full w-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl border border-gray-300 dark:border-gray-600 animate-pulse"
      >
        <div class="h-3/4 w-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <span class="text-sm text-gray-500 dark:text-gray-400">Cargando Tarjeta...</span>
        </div>
        
        <div class="h-1/4 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-4">
          <div class="h-4 w-3/4 bg-gray-400 dark:bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS se encarga de la animación 'animate-pulse' */
</style>