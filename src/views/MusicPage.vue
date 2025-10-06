<script setup>
import SongListPlayer from "../components/SongListPlayer.vue";
import { ref, computed } from "vue"; // Importamos 'computed' para el enlace de WhatsApp

// --- LÓGICA DE COMENTARIOS Y WHATSAPP ---
const comments = ref([]);
const newComment = ref("");

const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE;
// Ej: '5215551234567' (para México)

// Propiedad calculada para el enlace de WhatsApp (mensaje predeterminado)
const whatsappURL = computed(() => {
  // Texto de invitación para la conversación
  const defaultText = encodeURIComponent(
    "Hola! Acabo de ver la playlist que hiciste y quería compartir mi experiencia..."
  );
  return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${defaultText}`;
});

const submitComment = () => {
  const trimmed = newComment.value.trim();
  if (!trimmed) return; // Solo agrega el comentario localmente (sin abrir WhatsApp)

  comments.value.unshift({
    text: trimmed,
    timestamp: new Date().toLocaleString(),
  }); // Limpiar input

  newComment.value = "";
};
</script>

<template>
  
  <div class="container mx-auto p-4 flex flex-col items-center">
    
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">
      Mi Playlist
    </h1>
    
    <p class="text-center text-gray-700">
      ¡Disfruta de la música mi niña linda 😊!
    </p>

    
    <article class="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl my-10">
      
      <SongListPlayer />
    </article>

    
    <div class="container mx-auto my-10 rounded-md bg-blue-50 dark:bg-blue-950 border p-4 sm:p-6" data-aos="fade-up">
      
      <h1 class="text-3xl">Espero y te haya gustado Bb.</h1>
      
      <p class="text-xl leading-relaxed break-words">
        Tu sabes que por ti hago lo que sea sin que me lo pidas, gracias por
        regalarme esto lindos momentos y para poder expressar mis sentimientos
        no hay mejor manera que hacerlo con este pequeño detalle, que es una de
        las miles de formas que tengo pensado 🤭...
      </p>
      
      <span class="text-base">Puedes compartime tu experiencia enviándome un mensaje directo:
      </span>

      <a :href="whatsappURL" target="_blank"
        class="ml-1 mt-4 inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-caveat font-semibold rounded-lg transition shadow-md hover:shadow-lg">
        Enviar Mensaje por WhatsApp
      </a>

      
    </div>

    
    <section class="mt-6" data-aos="fade-up">
      
      <h3 class="text-lg font-semibold mb-2">
        Comentarios (Solo visibles aquí)
      </h3>

      
      <form @submit.prevent="submitComment" class="flex items-center gap-2 mb-4">
        
        <input v-model="newComment" type="text" placeholder="Escribe un comentario..."
          class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white" />
        
        <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          :disabled="!newComment.trim()">
           Comentar
        </button>
      </form>

      <ul v-if="comments.length" class="space-y-3">
     
        <li v-for="(comment, index) in comments" :key="index"
          class="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm text-sm">
         
          <p class="text-gray-800 dark:text-white">{{ comment.text }}</p>
        
          <p class="text-xs text-gray-500 mt-1">{{ comment.timestamp }}</p>
          
        </li>
        
      </ul>
      
      <p v-else class="text-sm text-gray-500">
        No hay comentarios aún. Sé el primero en comentar.
      </p>
    </section>

    
  </div>
</template>

<style scoped>
/* Estilos específicos para este componente si los necesitas */
</style>
