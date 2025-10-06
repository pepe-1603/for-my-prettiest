<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore' // Ajusta la ruta

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: val => ['sm', 'md', 'lg'].includes(val)
  },
  transparent: {
    type: Boolean,
    default: true
  }
})

const themeStore = useThemeStore();

// Conecta la variable interna del switch con el estado reactivo de Pinia
const isDark = computed(() => themeStore.isDark);

// Lógica de clases para el tamaño (se mantiene)
const sizeClasses = computed(() => {
  const map = {
    sm: 'scale-90',
    md: 'scale-100',
    lg: 'scale-110'
  }
  return map[props.size] || 'scale-100'
})
</script>

<template>
  <label
    :class="[
      'relative inline-block w-14 h-7 cursor-pointer rounded-full bg-gray-300 transition-colors has-[:checked]:bg-gray-900',
      sizeClasses,
      '[-webkit-tap-highlight-color:_transparent]'
    ]"
  >
    <input
      type="checkbox"
      class="peer sr-only"
      :checked="isDark"
      @change="themeStore.toggleTheme()" />
    <span
      class="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all
             peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
    ></span>
  </label>
</template>