import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//importar router
import router from './router'
/**
 * importar aos para transiocn de scrool
 * 
 */
// Puedes configurar opciones globales aquí
// --- Agrega estas líneas para AOS ---
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa el CSS de AOS
// -----------------------------------

/* Importa los componentes de Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core' //fontawesome core
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //font aweesome icon component

/*
* Importa algunos íconos que probablemente usaremos. ¡Puedes añadir más según necesites!
import { faHeart, faStar, faStarHalf, faCrown, faSmile, faFaceGrinHearts } from '@fortawesome/free-solid-svg-icons'

* Añade los íconos a la librería global de Font Awesome , esssto son cuando queremosss ussar inconos espécificos en lugar de cargar todos
library.add(faHeart, faStar, faStarHalf, faCrown, faSmile, faFaceGrinHearts)

*/

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons' // Importa todos los iconos sólidos
/* add icons to the library */
library.add(fas)



//registro de componetess globales
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon) // ¡Ahora puedes usar <font-awesome-icon> en cualquier lugar!
app.use(router)


app.mount('#app');


// --- Inicializa AOS después de montar la aplicación ---
// Puedes configurar opciones globales aquí
AOS.init({
  duration: 1000, // Duración de la animación en milisegundos (1 segundo para un fade suave)
  once: true,     // La animación se reproduce solo una vez por elemento
});
// ----------------------------------------------------