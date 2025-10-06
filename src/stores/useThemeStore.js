// src/stores/useThemeStore.js (o donde guardes tus stores)
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(false);
    const THEME_KEY = 'theme';

    // Función para inicializar el estado del tema al cargar la aplicación
    function initializeTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        
        if (saved === 'dark') {
            isDark.value = true;
        } else if (saved === 'light') {
            isDark.value = false;
        } else {
            // Usa la preferencia del sistema operativo como fallback
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    // Función para alternar el tema (llamada por el ThemeSwitch)
    function toggleTheme() {
        isDark.value = !isDark.value;
    }

    // Watcher para sincronizar Pinia con el DOM y localStorage
    // Esto se ejecuta una vez que el store está inicializado
    watch(isDark, (val) => {
        localStorage.setItem(THEME_KEY, val ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', val);
    }, { immediate: true }); // Se ejecuta inmediatamente para aplicar la clase en el DOM al inicio

    return {
        isDark,
        toggleTheme,
        initializeTheme,
    };
});