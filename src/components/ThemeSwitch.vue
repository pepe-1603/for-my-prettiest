<!-- src/components/ThemeSwitch.vue -->
<script setup>
import { ref, onMounted, watch, computed } from 'vue'

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

const isDark = ref(false)
const THEME_KEY = 'theme'

onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  document.documentElement.classList.toggle('dark', isDark.value)
})

watch(isDark, (val) => {
  localStorage.setItem(THEME_KEY, val ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', val)
})

function toggleTheme() {
  isDark.value = !isDark.value
}

// Tamaños que afectan solo escala (sin romper animación)
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
      @change="toggleTheme"
    />
    <span
      class="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all
             peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
    ></span>
  </label>
</template>
