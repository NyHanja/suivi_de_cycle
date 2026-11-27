<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/calendrier" />
        </ion-buttons>
        <ion-title>Détail du cycle</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- À FAIRE (la personne A) : début, fin, durées, boutons Terminer et Supprimer (tâche A6) -->
      <ion-text color="medium">
        <p>Page « Détail du cycle » ({{ route.params.id ?? 'nouveau' }}) : à faire par la personne A.</p>
      </ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButtons, IonBackButton,
} from '@ionic/vue';

const route = useRoute();
</script>
