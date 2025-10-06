<script setup lang="js">
import { ref, computed, onMounted } from 'vue' // 🟢 Importa ref y onMounted
import FlippingCard from '../components/FlippiCard.vue'
import cardsData from '../data/cards.json'
// 🟢 Importa el Skeleton para usarlo aquí
import FlippingCardSkeleton from '../components/skeletons/FlippingCardSkeleton.vue' 

// 🟢 1. ESTADO DE CARGA EXPLÍCITO
const isLoading = ref(true) 
const cards = ref([]) // 🟢 Inicializa 'cards' como un ref vacío

// 🟢 FUNCIÓN ASÍNCRONA PARA CARGAR DATOS
const loadCards = async () => {
  // Ponemos isLoading a true justo antes de la carga (aunque ya esté por defecto)
  isLoading.value = true 
  
  // Simular un delay de 1000ms (1 segundo)
  await new Promise(resolve => setTimeout(resolve, 1000)) 
  
  // 🟢 Asignar los datos al ref
  cards.value = cardsData 
  
  // 🟢 Marcar la carga como terminada
  isLoading.value = false 
}

// 🟢 2. LLAMAR A LA FUNCIÓN AL MONTAR EL COMPONENTE
onMounted(loadCards)

// ... (El computed "saludo" se mantiene igual)
const saludo = computed(() => {
  // ... tu lógica de saludo ...
  const hora = new Date().getHours()
  
  if (hora >= 6 && hora < 12) {
    return '¡Buenos días, tenga usted señorita!'
  } else if (hora >= 12 && hora < 19) {
    return '¡Buenas tardes, tenga usted señorita!'
  } else {
    return '¡Buenas noches, tenga usted señorita!'
  }
})
</script>

<template>
  <section class="px-6 py-10 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
    <div class="max-w-5xl mx-auto text-center mb-12">
      
      <p class="text-xl font-semibold mb-2 text-gray-500 dark:text-gray-300">{{ saludo }}</p>

      <h1 class="text-blue-500 text-4xl">
        Te dedico estas cards especiales con frases llenas de emoción y amor 💖
      </h1>
      
    </div>

    <div v-if="isLoading" class="max-w-5xl mx-auto">
        <FlippingCardSkeleton :count="6" />
    </div>

    <div v-else class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <FlippingCard
        v-for="(card, i) in cards"
        :key="i"
        :frontImage="card.frontImage"
        :title="card.title"
        :message="card.message"
        data-aos="fade-up"
        :data-aos-delay="i * 100"
      />
    </div>

  </section>
</template>