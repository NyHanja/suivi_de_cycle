<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="aujourdhui" href="/tabs/aujourdhui">
          <ion-icon :icon="waterOutline" />
          <ion-label>Aujourd'hui</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="calendrier" href="/tabs/calendrier">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Calendrier</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="journal" href="/tabs/journal">
          <ion-icon :icon="bookOutline" />
          <ion-label>Journal</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profil" href="/tabs/profil">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { waterOutline, calendarOutline, bookOutline, personCircleOutline } from 'ionicons/icons';
</script>
