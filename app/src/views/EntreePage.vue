<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/journal" />
        </ion-buttons>
        <ion-title>Entrée du journal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- À FAIRE (la personne B) : mode nouveau (formulaire) ou mode :id (lecture + Supprimer) (tâche B8) -->
      <ion-text color="medium">
        <p>Page « Entrée du journal » ({{ route.params.id ?? 'nouveau' }}) : à faire par la personne B.</p>
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
