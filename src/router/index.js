import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Puedes crear esta vista para la ruta raíz


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage, // Una vista de inicio simple
  },
  {
    path: '/cards-gallery',
    name: 'cards-gallery',
    // 🟢 Aplicar Lazy Loading para usar Suspense
    component: () => import('../views/CardsGalleryPage.vue'), 
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../views/MusicPage.vue'), 
  },
  {
    path: '/images',
    name: 'image-viewer',
    component: () => import('../views/ImageViewerPage.vue'), 
  }
  // Aquí puedes añadir más rutas para otras secciones de tu aplicación
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;