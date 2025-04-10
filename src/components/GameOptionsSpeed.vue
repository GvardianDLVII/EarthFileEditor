<template>
  <v-row class="mt-3">
    <v-col sm="6" lg="4">
      <v-number-input variant="outlined" controlVariant="stacked" :precision="2" :step="0.01" v-model="scrollingMouseSpeed" density="compact" :label="$t('profile.gameOptions.speed.scrollingMouseSpeed.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" :precision="2" :step="0.01" v-model="scrollingKeyboardSpeed" density="compact" :label="$t('profile.gameOptions.speed.scrollingKeyboardSpeed.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" :precision="2" :step="0.01" v-model="mouseSensitivity" density="compact" :label="$t('profile.gameOptions.speed.mouseSensitivity.label')" />
    </v-col>
    <v-col sm="6" lg="4">
      <v-number-input variant="outlined" controlVariant="stacked" v-model="numberOfTicksPerSecond" density="compact" :label="$t('profile.gameOptions.speed.numberOfTicksPerSecond.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="commandFrequency" density="compact" :label="$t('profile.gameOptions.speed.commandFrequency.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="unknownNetworkParameter" density="compact" :label="$t('profile.gameOptions.speed.unknownNetworkParameter.label')" />
    </v-col>
  </v-row>
  <v-checkbox :label="$t('profile.gameOptions.speed.reverseMouse.label')" v-model="reverseMouse" density="compact" color="primary" hide-details />
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
    scrollingMouseSpeed: {
      get(): number {
        return this.modelValue.scrollingMouseSpeed;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, scrollingMouseSpeed: value });
      },
    },
    scrollingKeyboardSpeed: {
      get(): number {
        return this.modelValue.scrollingKeyboardSpeed;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, scrollingKeyboardSpeed: value });
      },
    },
    numberOfTicksPerSecond: {
      get(): number {
        return this.modelValue.numberOfTicksPerSecond;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, numberOfTicksPerSecond: value });
      },
    },
    mouseSensitivity: {
      get(): number {
        return this.modelValue.mouseSensitivity;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, mouseSensitivity: value });
      },
    },
    commandFrequency: {
      get(): number {
        return this.modelValue.commandFrequency;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, commandFrequency: value });
      },
    },
    unknownNetworkParameter: {
      get(): number {
        return this.modelValue.unknownNetworkParameter;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownNetworkParameter: value });
      },
    },
    reverseMouse: {
      get(): boolean {
        return this.modelValue.reverseMouse;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, reverseMouse: value });
      },
    },
  },
});
</script>