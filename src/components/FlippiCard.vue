<!-- src/components/FlippingCard.vue -->
<script setup>
defineProps({
  frontImage: String,
  title: String,
  message: String
})
</script>

<template>
  <div class="group [perspective:1000px] w-full h-64 sm:h-80 md:h-96">
    <div
      class="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
    >
      <!-- Frente -->
      <div
        class="absolute inset-0 rounded-xl overflow-hidden bg-center bg-cover  shadow-xl transition-all duration-500 border border-gray-300 dark:border-gray-600"
        :style="{ backgroundImage: `url(${frontImage})` }"
      >
        <div class="h-full w-full bg-black/40 flex items-center justify-center p-4 text-white text-xl font-semibold backdrop-blur-sm">
          {{ title }}
        </div>
      </div>

      <!-- Reverso -->
      <div
        class="absolute inset-0 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-6 transform [transform:rotateY(180deg)] backface-hidden border border-gray-300 dark:border-gray-600 shadow-xl"
      >
        <div class="h-full w-full flex flex-col justify-center items-center text-center">
          <p class="text-base sm:text-lg">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
</style>
