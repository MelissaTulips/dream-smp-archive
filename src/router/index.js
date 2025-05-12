import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import UserLoginPage from '../views/UserLoginPage.vue';
import UserRegistrationPage from '../views/UserRegistrationPage.vue';
import CharacterListPage from '../views/CharacterListPage.vue';
import AddCharacterPage from '../views/AddCharacterPage.vue';
import EditCharacterPage from '../views/EditCharacterPage.vue';
import CharacterDetailsPage from '../views/CharacterDetailsPage.vue';
import AdminPanelPage from '../views/AdminPanelPage.vue'; 
import TagsPage from '../views/TagsPage.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: UserLoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegistrationPage,
  },
  {
    path: '/characters',
    name: 'character-list',
    component: CharacterListPage,
  },
  {
    path: '/characters/add',
    name: 'add-character',
    component: AddCharacterPage,
  },
  {
    path: '/characters/edit/:id',
    name: 'edit-character',
    component: EditCharacterPage,
  },
  {
    path: '/characters/:id',
    name: 'character-details',
    component: CharacterDetailsPage,
  },
  {
    path: '/admin', 
    name: 'admin-panel',
    component: AdminPanelPage,
  },

  {
    path: '/tags',
    name: 'tags',
    component: TagsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
