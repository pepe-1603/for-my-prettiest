<script setup name="HomePage">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import ThemedCard from '../components/ThemedCard.vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '../stores/useThemeStore';


const themeStore = useThemeStore();

const dedicatedCardProps = {
    title: "Para la Niña Más Linda del Universo 💖",
    description: "Pequeña mi pequeña exploradora, cada rincón de esta aplicación fue pensado con una sonrisa, con la magia de tus ojos y la alegría que irradias. Es un pequeño universo digital, creado con el mismo cariño con el que te miro cada día.",
    secondaryDescription: "Aquí podrás encontrar melodías que te hagan sentir bonito, imágenes que cuenten historias sin palabras y sorpresas que te esperan en cada esquina. Que este espacio te inspire tanta felicidad como tú me das a mí.",
    linkText: "¡Comienza la Aventura!",
    linkTo: { name: 'playlist' },
    linkIcon: ['fas', 'user-astronaut'], 
};

// **NUEVO: Consumir el estado de Pinia**
const isDark = computed(() => themeStore.isDark); 

// 'themeMode' ahora depende directamente del estado de Pinia
const themeMode = computed(() => (isDark.value ? 'Oscuro' : 'Claro'));
const router = useRouter();

</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center gap-10 px-4 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
    
    <section class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white transition-colors duration-500 mb-4">
        Bienvenida, te encuentras en el  Modo {{ themeMode }}
      </h1>
      <p class="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        **En este rincón digital, cada clic es un paso hacia un nuevo horizonte. ¿Listo para explorar?**
      </p>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
      
      <router-link 
        :to="{ name: 'playlist' }" 
        class="flex flex-col items-center justify-center p-6 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg 
               transition-all duration-300 transform hover:scale-105 cursor-pointer text-white text-center"
      >
        <font-awesome-icon :icon="['fas', 'music']" class="text-4xl mb-3" />
        <h2 class="text-xl font-semibold">Tu Playlist Personal</h2>
        <p class="text-sm opacity-90 mt-1">Sumérgete en un océano de sonidos dedicados.</p>
      </router-link>

      <router-link 
        :to="{ name: 'image-viewer' }" 
        class="flex flex-col items-center justify-center p-6 bg-purple-500 hover:bg-purple-600 rounded-lg shadow-lg 
               transition-all duration-300 transform hover:scale-105 cursor-pointer text-white text-center"
      >
        <font-awesome-icon :icon="['fas', 'image']" class="text-4xl mb-3" />
        <h2 class="text-xl font-semibold">Galería de Instantes</h2>
        <p class="text-sm opacity-90 mt-1">Captura la belleza en cada píxel.</p>
      </router-link>

      <router-link 
        :to="{ name: 'cards-gallery' }" 
        class="flex flex-col items-center justify-center p-6 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg 
               transition-all duration-300 transform hover:scale-105 cursor-pointer text-white text-center"
      >
        <font-awesome-icon :icon="['fas', 'id-card']" class="text-4xl mb-3" />
        <h2 class="text-xl font-semibold">Colección de Tarjetas</h2>
        <p class="text-sm opacity-90 mt-1">Explora diseños hecho para ti.</p>
      </router-link>

      </section>

    <div class="mt-8">
      <ThemedCard 
        :title="dedicatedCardProps.title"
        :description="dedicatedCardProps.description"
        :secondary-description="dedicatedCardProps.secondaryDescription"
        :link-text="dedicatedCardProps.linkText"
        :link-to="dedicatedCardProps.linkTo"
        :link-icon="dedicatedCardProps.linkIcon"
      />
    </div>

  </main>
</template>