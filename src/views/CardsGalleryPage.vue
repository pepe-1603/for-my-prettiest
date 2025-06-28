<!-- src/pages/CardsGallery.vue -->
<script setup>
import { computed } from 'vue'

import FlippingCard from '../components/FlippiCard.vue'

const cards = [
  {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.X_q2fb0PJ8_cNYb7czhIdAHaFj%3Fpid%3DApi&f=1&ipt=62a5f8420de4ddfbef14e3373355f498bf5f81cf97094c868b56dd988ef94bef&ipo=images',
    title: 'Para Ti 💐',
    message: 'Eres la flor más hermosa de este jardín llamado vida.'
  },
    {
    frontImage: 'https://picsum.photos/id/273/600/800',
    title: 'con cariño para ti',
    message: 'Quiero que sepas k Lo mas lindo de tí; se encuentra dentro no fuera, una diculpa sí mi 💖 palpita, es k eres lo que mi 💖 había esperado 🥰.'
  },
  {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F6e%2F26%2Fcc%2F6e26cc96f4068f1274a9dff3e1bd6647.jpg&f=1&nofb=1&ipt=f447a9ab6e34916beee2be68963a873405fdf1ccc6d4e9337606117701d0f766',
    title: 'Bajo las Estrellas ✨',
    message: 'Aunque estemos lejos, siempre miraré al cielo y pensaré en ti.'
  },
    {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2022%2F12%2F09%2F23%2F02%2Fhearts-7646249_1280.jpg&f=1&nofb=1&ipt=c8687a59350e343578ade9d86c1d9d7ba94635ab15d62a74b1e4d17bade2d274',
    title: 'No te lo habia dicho pero..',
    message: 'Quiero ser esa perssona k tu 100pre hechas de menos.'
  },
  {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.craiyon.com%2F2023-05-24%2Fa77504e128e44592a85c987df0ccd9b0.webp&f=1&nofb=1&ipt=530280885707170e3842171cb4233773f871a7dcdb57d9cfe93572e7cb8e2c05',
    title: 'Gracias ☀️',
    message: 'Tu luz ha iluminado mi camino incluso en los días nublados.'
  },
    {
    frontImage: 'https://picsum.photos/id/256/600/800',
    title: 'Yo Solo quiero decirte 🥺',
    message: 'No tengo lujos, ni dinero 💰, ni carro 🚗, ni millones 💵 pero para conquistarte tengo miles de maneras y esta es una de las miles k tengo. .'
  },
    {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2024%2F05%2F26%2F15%2F27%2Fanime-8788959_1280.jpg&f=1&nofb=1&ipt=2433ece01d292bc82e97c6270ab0c6e12d584be9529ff932886cae35823278a7',
    title: 'No entiendo algo... ',
    message: 'Como  tú siendo tan pequeña logras cosas tan gigantes, si en vez de mariposas 🦋 me haces sentir elefantes 🐘. tkm espero y lo entiendas.'
  },
    {
    frontImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.superaficionados.com%2Fimagenes%2F4-mejores-animes-de-romance-boku-no-kokoro-no-yabai-yatsu.jpg&f=1&nofb=1&ipt=c2e10f0772e2652d3d34336c88ca1076be27fb6b2877b0743faa646f0ac0d187',
    title: 'Quiero ser sincero',
    message: 'Caminar de la mano contigo es un sueño k kiero hacer realidad .'
  },
]

const saludo = computed(() => {
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
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-10">Galería de Cartas</h1>
     
      <div class="w-xl h-fit border border-gray-200 border-2 border-dashed rounded p-4">
         <p> <span class="font-semibold text-lg text-current">{{  saludo  }}</span>, te dedico esto por bonita, te la dedico para darte  gracias por esos lindos momentos que paso contigo, y por los bellos momentos que que pasaran,   </p>
      <p>Seran mas lindos que estos, lo prometo si te gusta volveran.

          Te cuento un secreto, se aproximan bellos momentos, te a apuesto que  esos momentos que pasaran seran tan bellos que los dias ni se sentiran los dias,  pues los minutos nos volaran y que al perdenrnos con miradas los minutos nos contaran.

            Para mi seria una ilusión el día que llegue Y mirarte y invitarte soñar, volar; 
            Imaginando los instantes que se harían realidad 😇 

        </p>
      </div>
      <h1 class="mt-16 text-blue-500 text-4xl">
        Te dedico estas cards especiales con frases llenas de emoción y amor 💖
      </h1>

    </div>


    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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

    <div class="container mx-auto  p-2 flex text-center items-center gap-2 border-t mt-12">
        <router-link to="/" class="font-semibold text-lg text-blue-500 hover:underline font-caveat" > Seguir Explorando </router-link>
        <font-awesome-icon :icon="['fas', 'angles-right']" class="w-5 h-5 text-blue-500" />
    </div>

  </section>
</template>
