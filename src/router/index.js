import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Puedes crear esta vista para la ruta raíz
import CardsGalleryPage from '../views/CardsGalleryPage.vue';
import MusicPage from '../views/MusicPage.vue';
import ImageViewerPage from '../views/ImageViewerPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage, // Una vista de inicio simple
  },
  {
    path: '/cards-gallery',
    name: 'cards-gallery',
    component: CardsGalleryPage,
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: MusicPage
  },
  {
    path: '/images',
    name: 'image-viewer',
    component: ImageViewerPage,
  }
  // Aquí puedes añadir más rutas para otras secciones de tu aplicación
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;