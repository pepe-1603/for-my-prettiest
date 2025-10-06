<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'; // Importa 'computed'
import ThemeSwitch from './ThemeSwitch.vue';
import { useRouter } from 'vue-router';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'; 
import { useThemeStore } from '@/stores/useThemeStore'; // Ajusta la ruta

const router = useRouter();
const themeStore = useThemeStore(); // Inicializa el store

const isOpen = ref(false);

// **NUEVO: Consumir el estado de Pinia**
const isDark = computed(() => themeStore.isDark); 

const dropdownButtonRef = ref(null);
const dropdownMenuRef = ref(null);

const redirectToHome = () => {
  router.push({ name: 'home'});
  isOpen.value = false;
};

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const handleClickOutside = (event) => {
  if (
    isOpen.value &&
    dropdownButtonRef.value && !dropdownButtonRef.value.contains(event.target) &&
    dropdownMenuRef.value && !dropdownMenuRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Se eliminó la lógica de tema/localStorage
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
// Se elimina todo el `watch` de `isDark`

</script>

<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      ref="dropdownButtonRef" class="relative flex items-center p-2 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-colors duration-300
              text-gray-800 dark:text-white"
      aria-label="Abrir menú de configuración"
    >
      <font-awesome-icon :icon="['fas', 'gear']" class="text-gray-400 h-5 w-5 hover:animate-spin" />
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        ref="dropdownMenuRef" class="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50
                transition-colors duration-500 p-4"
        @click.stop >
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          <font-awesome-icon :icon="['fas', 'gears']" class="text-purple-400 mr-2" /> Configuración
        </h3>

        <ul class="space-y-2 text-sm">
          <li>
            <div
            class="flex items-center justify-between w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span class="flex items-center gap-2 font-medium">
                <MoonIcon v-if="isDark" class="w-5 h-5 text-gray-300" />
                <SunIcon v-else class="w-5 h-5 text-yellow-600" />
                Tema
              </span>
              <ThemeSwitch size="sm" /> 
            </div>
          </li>
          <li>
            <button
              class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Preferencias
            </button>
          </li>
          <li>
            <button @click="redirectToHome"
              class="w-full flex items-center justify-center px-3 py-2 text-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <font-awesome-icon :icon="['fas', 'reply']" class="size-4 mr-2" /> Ir al inicio
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>