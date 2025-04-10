<template>
  <v-app>
    <v-main>
      <FileEditor :theme="theme" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import FileEditor from './components/FileEditor.vue';

const theme = useTheme();
</script>
