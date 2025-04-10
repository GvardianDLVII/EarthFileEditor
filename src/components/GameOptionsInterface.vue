<template>
  <v-row class="mt-3">
    <v-col sm="12" md="6" lg="4">
      <v-checkbox :label="$t('profile.gameOptions.interface.compass.label')" v-model="compass" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.interface.autoZoom.label')" v-model="autoZoom" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.interface.swapCameras.label')" v-model="swapCameras" density="compact" color="primary" hide-details />
    </v-col>
    <v-col sm="12" md="6" lg="4">
      <v-text-field :label="$t('profile.gameOptions.interface.interface.label')" v-model="interface" variant="outlined" required density="compact" />
    </v-col>
  </v-row>
  <div class="mt-3 d-flex">
    <label>{{ $t('profile.gameOptions.interface.panelPosition.label') }}</label>
    <v-btn-toggle v-model="panelPosition" group class="ml-3" color="primary" density="compact" mandatory>
      <v-btn variant="outlined" :value="0">{{ $t('enums.panelPosition.Top') }}</v-btn>
      <v-btn variant="outlined" :value="1">{{ $t('enums.panelPosition.Bottom') }}</v-btn>
      <v-btn variant="outlined" :value="2">{{ $t('enums.panelPosition.Left') }}</v-btn>
      <v-btn variant="outlined" :value="3">{{ $t('enums.panelPosition.Right') }}</v-btn>
    </v-btn-toggle>
  </div>
  <div class="mt-3 d-flex">
    <label>{{ $t('profile.gameOptions.interface.toolbarPosition.label') }}</label>
    <v-btn-toggle v-model="toolbarPosition" group class="ml-3" color="primary" density="compact" mandatory>
      <v-btn variant="outlined" :value="0">{{ $t('enums.toolbarPosition.Top') }}</v-btn>
      <v-btn variant="outlined" :value="1">{{ $t('enums.toolbarPosition.Bottom') }}</v-btn>
    </v-btn-toggle>
  </div>
  <div class="mt-3 d-flex">
    <label>{{ $t('profile.gameOptions.interface.mapPosition.label') }}</label>
    <v-btn-toggle v-model="mapPosition" group class="ml-3" color="primary" density="compact" mandatory>
      <v-btn variant="outlined" :value="0">{{ $t('enums.mapPosition.TopLeft') }}</v-btn>
      <v-btn variant="outlined" :value="1">{{ $t('enums.mapPosition.BottomRight') }}</v-btn>
    </v-btn-toggle>
  </div>
  <v-row class="mt-3">
    <v-col sm="6" lg="4"><v-number-input variant="outlined" controlVariant="stacked" v-model="consoleSize" density="compact" :label="$t('profile.gameOptions.interface.consoleSize.label')" /></v-col>
    <v-col sm="6" lg="4"><v-number-input variant="outlined" controlVariant="stacked" v-model="consoleDisplayTime" density="compact" :label="$t('profile.gameOptions.interface.consoleDisplayTime.label')" /></v-col>
  </v-row>
</template>

<script lang="ts">
import type { GameOptions, MapPosition, PanelPosition, ToolbarPosition } from '@/code/api';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<GameOptions>, required: true },
  },
  emits: ['update:modelValue'],
  computed: {
    compass: {
      get(): boolean {
        return this.modelValue.compass;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, compass: value });
      },
    },
    autoZoom: {
      get(): boolean {
        return this.modelValue.autoZoom;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, autoZoom: value });
      },
    },
    swapCameras: {
      get(): boolean {
        return this.modelValue.swapCameras;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, swapCameras: value });
      },
    },
    interface: {
      get(): string {
        return this.modelValue.interfaceName;
      },
      set(value: string) {
        this.$emit('update:modelValue', { ...this.modelValue, interfaceName: value });
      },
    },
    panelPosition: {
      get(): PanelPosition {
        return this.modelValue.panelPosition;
      },
      set(value: PanelPosition) {
        this.$emit('update:modelValue', { ...this.modelValue, panelPosition: value });
      },
    },
    toolbarPosition: {
      get(): ToolbarPosition {
        return this.modelValue.toolbarPosition;
      },
      set(value: ToolbarPosition) {
        this.$emit('update:modelValue', { ...this.modelValue, toolbarPosition: value });
      },
    },
    mapPosition: {
      get(): MapPosition {
        return this.modelValue.mapPosition;
      },
      set(value: MapPosition) {
        this.$emit('update:modelValue', { ...this.modelValue, mapPosition: value });
      },
    },
    consoleSize: {
      get(): number {
        return this.modelValue.consoleSize;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, consoleSize: value });
      },
    },
    consoleDisplayTime: {
      get(): number {
        return this.modelValue.consoleDisplayTime;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, consoleDisplayTime: value });
      },
    },
  },
});
</script>

<style scoped>
label {
  width: 120px;
  align-self: center;
}
</style>