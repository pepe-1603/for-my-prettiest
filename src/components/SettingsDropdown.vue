<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'; // Asegúrate de importar onBeforeUnmount
import ThemeSwitch from './ThemeSwitch.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isOpen = ref(false);
const isDark = ref(false);

const THEME_KEY = 'theme';

// Referencias a los elementos del DOM para detectar clics fuera
const dropdownButtonRef = ref(null);
const dropdownMenuRef = ref(null);

const redirectToHome = () => {
  router.push('/');
  isOpen.value = false; // Cierra el menú al navegar
};

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

// --- Lógica mejorada para cerrar al hacer clic fuera ---
const handleClickOutside = (event) => {
  // Si el menú está abierto Y el clic no fue en el botón del menú
  // Y el clic no fue dentro del propio menú desplegable
  if (
    isOpen.value &&
    dropdownButtonRef.value && !dropdownButtonRef.value.contains(event.target) &&
    dropdownMenuRef.value && !dropdownMenuRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    isDark.value = true;
  } else if (saved === 'light') {
    isDark.value = false;
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  document.documentElement.classList.toggle('dark', isDark.value);

  // Añadir el listener al document cuando el componente se monta
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  // Limpiar el listener al desmontar el componente para evitar fugas de memoria
  document.removeEventListener('click', handleClickOutside);
});

watch(isDark, (val) => {
  localStorage.setItem(THEME_KEY, val ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', val);
});
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
              <span>Tema</span>
              <ThemeSwitch size="sm" v-model:is-dark="isDark" />
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
              class="w-full flex items-center justify-center text-left px-3 py-2 text-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <font-awesome-icon :icon="['fas', 'reply']" class="size-4 mr-2" /> Ir al inicio
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>