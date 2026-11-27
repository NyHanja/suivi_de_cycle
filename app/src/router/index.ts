import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/tabs/aujourdhui' },
  { path: '/bienvenue', component: () => import('@/views/BienvenuePage.vue') },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      { path: '', redirect: '/tabs/aujourdhui' },
      { path: 'aujourdhui', component: () => import('@/views/AujourdhuiPage.vue') },
      { path: 'calendrier', component: () => import('@/views/CalendrierPage.vue') },
      { path: 'calendrier/:id', component: () => import('@/views/CycleDetailPage.vue') },
      { path: 'journal', component: () => import('@/views/JournalPage.vue') },
      // 'nouveau' AVANT ':id', sinon ':id' attraperait le mot « nouveau »
      { path: 'journal/nouveau', component: () => import('@/views/EntreePage.vue') },
      { path: 'journal/:id', component: () => import('@/views/EntreePage.vue') },
      { path: 'profil', component: () => import('@/views/ProfilPage.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Personne B ajoutera ici la garde : router.beforeEach(...) vers /bienvenue

export default router;
