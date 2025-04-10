<template>
  <v-row class="mt-3">
    <v-col sm="6" lg="4">
      <v-checkbox :label="$t('profile.gameOptions.sound.soundtrack.label')" v-model="soundtrack" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.sound.swapChannels.label')" v-model="swapChannels" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.sound.dontPlayProductionMessages.label')" v-model="dontPlayProductionMessages" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.sound.videoDoubleSized.label')" v-model="videoDoubleSized" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.sound.videoSubtitles.label')" v-model="videoSubtitles" density="compact" color="primary" hide-details />
    </v-col>
    <v-col sm="6" lg="4">
      <v-number-input variant="outlined" controlVariant="stacked" v-model="musicVolume" density="compact" :label="$t('profile.gameOptions.sound.musicVolume.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="soundFxVolume" density="compact" :label="$t('profile.gameOptions.sound.soundFxVolume.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="unitsSpeechVolume" density="compact" :label="$t('profile.gameOptions.sound.unitsSpeechVolume.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="buildingsSpeechVolume" density="compact" :label="$t('profile.gameOptions.sound.buildingsSpeechVolume.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="interfaceVolume" density="compact" :label="$t('profile.gameOptions.sound.interfaceVolume.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="environmentalVolume" density="compact" :label="$t('profile.gameOptions.sound.environmentalVolume.label')" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type { GameOptions } from '@/code/api';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<GameOptions>, required: true },
  },
  emits: ['update:modelValue'],
  computed: {
    musicVolume: {
      get(): number {
        return this.modelValue.musicVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, musicVolume: value });
      },
    },
    soundFxVolume: {
      get(): number {
        return this.modelValue.soundFxVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, soundFxVolume: value });
      },
    },
    unitsSpeechVolume: {
      get(): number {
        return this.modelValue.unitsSpeechVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unitsSpeechVolume: value });
      },
    },
    buildingsSpeechVolume: {
      get(): number {
        return this.modelValue.buildingsSpeechVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, buildingsSpeechVolume: value });
      },
    },
    interfaceVolume: {
      get(): number {
        return this.modelValue.interfaceVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, interfaceVolume: value });
      },
    },
    environmentalVolume: {
      get(): number {
        return this.modelValue.environmentalVolume;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, environmentalVolume: value });
      },
    },
    soundtrack: {
      get(): boolean {
        return this.modelValue.soundtrack;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, soundtrack: value });
      },
    },
    dontPlayProductionMessages: {
      get(): boolean {
        return this.modelValue.dontPlayProductionMessages;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, dontPlayProductionMessages: value });
      },
    },
    swapChannels: {
      get(): boolean {
        return this.modelValue.swapChannels;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, swapChannels: value });
      },
    },
    videoDoubleSized: {
      get(): boolean {
        return this.modelValue.videoDoubleSized;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, videoDoubleSized: value });
      },
    },
    videoSubtitles: {
      get(): boolean {
        return this.modelValue.videoSubtitles;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, videoSubtitles: value });
      },
    },
  },
});
</script>