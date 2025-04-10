<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>{{ $t('profile.gameOptions.header') }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-tabs v-model="tab">
          <v-tab value="graphics">{{ $t('profile.gameOptions.tabs.graphics') }}</v-tab>
          <v-tab value="interface">{{ $t('profile.gameOptions.tabs.interface') }}</v-tab>
          <v-tab value="selection">{{ $t('profile.gameOptions.tabs.selection') }}</v-tab>
          <v-tab value="speed">{{ $t('profile.gameOptions.tabs.speed') }}</v-tab>
          <v-tab value="sound">{{ $t('profile.gameOptions.tabs.sound') }}</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="graphics">
            <GameOptionsGraphics v-model="value" />
          </v-tabs-window-item>
          <v-tabs-window-item value="interface">
            <GameOptionsInterface v-model="value" />
          </v-tabs-window-item>
          <v-tabs-window-item value="selection">
            <GameOptionsSelection v-model="value" />
          </v-tabs-window-item>
          <v-tabs-window-item value="speed">
            <GameOptionsSpeed v-model="value" />
          </v-tabs-window-item>
          <v-tabs-window-item value="sound">
            <GameOptionsSound v-model="value" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import GameOptionsGraphics from './GameOptionsGraphics.vue';
import GameOptionsInterface from './GameOptionsInterface.vue';
import GameOptionsSelection from './GameOptionsSelection.vue';
import GameOptionsSpeed from './GameOptionsSpeed.vue';
import GameOptionsSound from './GameOptionsSound.vue';
import type { GameOptions } from '../code/api';

export default defineComponent({
  data: () => ({
    tab: 'graphics',
  }),
  props: {
    modelValue: { type: Object as PropType<GameOptions>, required: true },
  },
  components: { GameOptionsGraphics, GameOptionsInterface, GameOptionsSelection, GameOptionsSpeed, GameOptionsSound },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get(): GameOptions {
        return this.modelValue;
      },
      set(value: GameOptions) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style scoped>
  .v-expansion-panel-text, .v-expansion-panel-title {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
</style>