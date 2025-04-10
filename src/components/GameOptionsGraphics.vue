<template>
  <v-row>
    <v-col sm="12" md="6" lg="4">
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.graphics.fogOfWar.label') }}</label>
        <v-btn-toggle v-model="fogOfWar" group class="ml-3" color="primary" density="compact" mandatory>
          <v-btn variant="outlined" :value="0">{{ $t('enums.fogOfWarType.Black') }}</v-btn>
          <v-btn variant="outlined" :value="1">{{ $t('enums.fogOfWarType.Environmental') }}</v-btn>
        </v-btn-toggle>
      </div>
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.graphics.tunnelWalls.label') }}</label>
        <v-checkbox :label="$t('profile.gameOptions.graphics.tunnelWalls.front.label')" v-model="tunnelWallsFront" density="compact" color="primary" class="ml-2" hide-details />
        <v-checkbox :label="$t('profile.gameOptions.graphics.tunnelWalls.back.label')" v-model="tunnelWallsBack" density="compact" color="primary" class="ml-2" hide-details />
      </div>
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.graphics.shadows.label') }}</label>
        <v-checkbox :label="$t('profile.gameOptions.graphics.shadows.object.label')" v-model="shadowsObject" density="compact" color="primary" class="ml-2" hide-details />
        <v-checkbox :label="$t('profile.gameOptions.graphics.shadows.terrain.label')" v-model="shadowsTerrain" density="compact" color="primary" class="ml-2" hide-details />
      </div>
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.graphics.weather.label') }}</label>
        <v-checkbox :label="$t('profile.gameOptions.graphics.weather.rain.label')" v-model="weatherRain" density="compact" color="primary" class="ml-2" hide-details />
        <v-checkbox :label="$t('profile.gameOptions.graphics.weather.snow.label')" v-model="weatherSnow" density="compact" color="primary" class="ml-2" hide-details />
      </div>
      <v-checkbox :label="$t('profile.gameOptions.graphics.atmosphericFog.label')" v-model="atmosphericFog" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.graphics.lowResTextures.label')" v-model="lowResTextures" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.graphics.lightCons.label')" v-model="lightCons" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.graphics.shining.label')" v-model="shining" density="compact" color="primary" hide-details />
    </v-col>
    <v-col sm="12" md="6" lg="4" class="mt-3">
      <v-number-input variant="outlined" controlVariant="stacked" v-model="viewRange" density="compact" :label="$t('profile.gameOptions.graphics.viewRange.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="maxZoom" :precision="2" density="compact" :label="$t('profile.gameOptions.graphics.maxZoom.label')" />
      <v-number-input variant="outlined" controlVariant="stacked" v-model="tunnelsAmbient" :precision="2" :step="0.01" density="compact" :label="$t('profile.gameOptions.graphics.tunnelsAmbient.label')" />
      <h4>{{ $t('profile.gameOptions.graphics.gamma.label') }}</h4>
      <v-row>
        <v-col md="4">
          <v-number-input variant="outlined" controlVariant="stacked" v-model="gamma1" :precision="2" :step="0.01" density="compact" />
        </v-col>
        <v-col md="4">
          <v-number-input variant="outlined" controlVariant="stacked" v-model="gamma2" :precision="2" :step="0.01" density="compact" />
        </v-col>
        <v-col md="4">
          <v-number-input variant="outlined" controlVariant="stacked" v-model="gamma3" :precision="2" :step="0.01" density="compact" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type { FogOfWarType, GameOptions } from '@/code/api';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<GameOptions>, required: true },
  },
  emits: ['update:modelValue'],
  computed: {
    fogOfWar: {
      get(): FogOfWarType {
        return this.modelValue.fogOfWar;
      },
      set(value: FogOfWarType) {
        this.$emit('update:modelValue', { ...this.modelValue, fogOfWar: value });
      },
    },
    tunnelWallsFront: {
      get(): boolean {
        return this.modelValue.tunnelWalls;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, tunnelWalls: value });
      },
    },
    tunnelWallsBack: {
      get(): boolean {
        return this.modelValue.tunnelWallsTransparent;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, tunnelWallsTransparent: value });
      },
    },
    shadowsObject: {
      get(): boolean {
        return this.modelValue.objectShadows;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, objectShadows: value });
      },
    },
    shadowsTerrain: {
      get(): boolean {
        return this.modelValue.terrainShadows;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, terrainShadows: value });
      },
    },
    weatherRain: {
      get(): boolean {
        return this.modelValue.rain;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, rain: value });
      },
    },
    weatherSnow: {
      get(): boolean {
        return this.modelValue.snow;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, snow: value });
      },
    },
    atmosphericFog: {
      get(): boolean {
        return this.modelValue.atmosphericFog;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, atmosphericFog: value });
      },
    },
    lowResTextures: {
      get(): boolean {
        return this.modelValue.lowResTextures;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, lowResTextures: value });
      },
    },
    lightCons: {
      get(): boolean {
        return this.modelValue.lightCons;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, lightCons: value });
      },
    },
    shining: {
      get(): boolean {
        return this.modelValue.shining;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, shining: value });
      },
    },
    viewRange: {
      get(): number {
        return this.modelValue.viewDistance;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, viewDistance: value });
      },
    },
    maxZoom: {
      get(): number {
        return this.modelValue.maxZoom;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, maxZoom: value });
      },
    },
    tunnelsAmbient: {
      get(): number {
        return this.modelValue.tunnelsAmbient;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, tunnelsAmbient: value });
      },
    },
    gamma1: {
      get(): number {
        return this.modelValue.gamma1;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, gamma1: value });
      },
    },
    gamma2: {
      get(): number {
        return this.modelValue.gamma2;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, gamma2: value });
      },
    },
    gamma3: {
      get(): number {
        return this.modelValue.gamma3;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, gamma3: value });
      },
    },
  },
});
</script>

<style scoped>
label {
  width: 100px;
  align-self: center;
}
</style>