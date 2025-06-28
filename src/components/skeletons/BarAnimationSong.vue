<template>
  <div class="flex rotate-180">
    <div
      v-for="(delay, index) in delays"
      :key="index"
      class="w-[3px] h-6 rounded mx-[1px]"
      :class="`bg-${color}-500 animate-eq`"
      :style="`animation-delay: ${delay}ms;`"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  color: {
    type: String,
    default: 'green'
  }
});

const delays = [0, 150, 300, 450];
</script>

<style scoped>
@keyframes eq {
  0%, 100% { height: 0.5em; }
  20% { height: 1.5em; }
  40% { height: 0.8em; }
  60% { height: 1.2em; }
  80% { height: 0.7em; }
}

.animate-eq {
  animation: eq 1s infinite ease-in-out;
}
</style>
