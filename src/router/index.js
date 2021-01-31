import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: 'Home Page' },
    component: () => import('@/components/pages/Index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'REgister Page' },
    component: () => import('@/components/pages/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login Page' },
    component: () => import('@/components/pages/Login.vue')
  },
  {
    path: '/add-new',
    name: 'AddNew',
    meta: { title: 'Add New Entry' },
    // component: () => import('@/components/pages/AddNew.vue')
  },
  {
    path: '/author/:slug',
    name: 'Author',
    meta: { title: 'Author Entries' },
    component: () => import('@/components/pages/Author.vue')
  },
  {
    path: '/entry/:slug',
    name: 'Post',
    meta: { title: 'Single Post' },
    component: () => import('@/components/pages/Post.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  /* Set title */
  document.title = to.params.title ? to.params.title : to.meta.title;

  /* Check auth */
  const fakeToken = localStorage.fakeToken;
  if (fakeToken) {
    store.dispatch('logIn');
    store.dispatch('fetchLoginUser', { token: fakeToken });
  };
  next();

});

export default router
