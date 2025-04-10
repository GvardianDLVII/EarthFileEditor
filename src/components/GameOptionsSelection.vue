<template>
  <v-row class="mt-3">
    <v-col sm="12" md="6" lg="4">
      <v-checkbox :label="$t('profile.gameOptions.selection.showHp.label')" v-model="showHp" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showShield.label')" v-model="showShield" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showTemperature.label')" v-model="showTemperature" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showElectronics.label')" v-model="showElectronics" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showAmmo.label')" v-model="showAmmo" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showExperience.label')" v-model="showExperience" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showDynamic.label')" v-model="showDynamic" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showDamageSelection.label')" v-model="showDamageSelection" density="compact" color="primary" hide-details />
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.selection.selectionShape.label') }}</label>
        <v-btn-toggle v-model="selectionShape" group class="ml-3" color="primary" density="compact" mandatory>
          <v-btn variant="outlined" :value="0">{{ $t('enums.selectionShape.Square') }}</v-btn>
          <v-btn variant="outlined" :value="1">{{ $t('enums.selectionShape.Isometric') }}</v-btn>
        </v-btn-toggle>
      </div>
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.selection.screenInfo.label') }}</label>
        <v-btn-toggle v-model="screenInfo" group class="ml-3" color="primary" density="compact" mandatory>
          <v-btn variant="outlined" :value="0">{{ $t('enums.screenInfo.None') }}</v-btn>
          <v-btn variant="outlined" :value="1">{{ $t('enums.screenInfo.Clock') }}</v-btn>
          <v-btn variant="outlined" :value="2">{{ $t('enums.screenInfo.Temperature') }}</v-btn>
        </v-btn-toggle>
      </div>
      <v-number-input variant="outlined" controlVariant="stacked" class="mt-3" v-model="autoSaveTimeMinutes" density="compact" :label="$t('profile.gameOptions.selection.autoSaveTimeMinutes.label')" />
    </v-col>
    <v-col sm="12" md="6" lg="4">
      <v-checkbox :label="$t('profile.gameOptions.selection.commandTooltips.label')" v-model="commandTooltips" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.tooltipsInResearchDialog.label')" v-model="tooltipsInResearchDialog" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.showBuildingTooltips.label')" v-model="showBuildingTooltips" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.scrollbarsOnlyIfNeeded.label')" v-model="scrollbarsOnlyIfNeeded" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.commandList.label')" v-model="commandList" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.pauseInConstructor.label')" v-model="pauseInConstructor" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.pauseInResearchCenter.label')" v-model="pauseInResearchCenter" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.pauseInChangeWeapon.label')" v-model="pauseInChangeWeapon" density="compact" color="primary" hide-details />
      <div class="mt-3 d-flex">
        <label>{{ $t('profile.gameOptions.selection.descriptionType.label') }}</label>
        <v-btn-toggle v-model="descriptionType" group class="ml-3" color="primary" density="compact" mandatory>
          <v-btn variant="outlined" :value="0">{{ $t('enums.descriptionType.Normal') }}</v-btn>
          <v-btn variant="outlined" :value="1">{{ $t('enums.descriptionType.Tooltip') }}</v-btn>
        </v-btn-toggle>
      </div>
      <v-checkbox :label="$t('profile.gameOptions.selection.hpBarOnPanel.label')" v-model="hpBarOnPanel" density="compact" color="primary" hide-details />
      <v-checkbox :label="$t('profile.gameOptions.selection.shieldBarOnPanel.label')" v-model="shieldBarOnPanel" density="compact" color="primary" hide-details />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import type { DescriptionType, GameOptions, ScreenInfo, SelectionShape } from '@/code/api';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<GameOptions>, required: true },
  },
  emits: ['update:modelValue'],
  computed: {
    showHp: {
      get(): boolean {
        return this.modelValue.showHp;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showHp: value });
      },
    },
    showShield: {
      get(): boolean {
        return this.modelValue.showShield;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showShield: value });
      },
    },
    showTemperature: {
      get(): boolean {
        return this.modelValue.showTemperature;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showTemperature: value });
      },
    },
    showElectronics: {
      get(): boolean {
        return this.modelValue.showElectronics;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showElectronics: value });
      },
    },
    showAmmo: {
      get(): boolean {
        return this.modelValue.showAmmo;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showAmmo: value });
      },
    },
    showExperience: {
      get(): boolean {
        return this.modelValue.showExperience;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showExperience: value });
      },
    },
    showDynamic: {
      get(): boolean {
        return this.modelValue.showDynamic;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showDynamic: value });
      },
    },
    showDamageSelection: {
      get(): boolean {
        return this.modelValue.showDamageSelection;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showDamageSelection: value });
      },
    },
    commandTooltips: {
      get(): boolean {
        return this.modelValue.commandTooltips;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, commandTooltips: value });
      },
    },
    tooltipsInResearchDialog: {
      get(): boolean {
        return this.modelValue.tooltipsInResearchDialog;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, tooltipsInResearchDialog: value });
      },
    },
    showBuildingTooltips: {
      get(): boolean {
        return this.modelValue.showBuildingTooltips;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, showBuildingTooltips: value });
      },
    },
    scrollbarsOnlyIfNeeded: {
      get(): boolean {
        return this.modelValue.scrollbarsOnlyIfNeeded;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, scrollbarsOnlyIfNeeded: value });
      },
    },
    commandList: {
      get(): boolean {
        return this.modelValue.commandList;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, commandList: value });
      },
    },
    pauseInConstructor: {
      get(): boolean {
        return this.modelValue.pauseInConstructor;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, pauseInConstructor: value });
      },
    },
    pauseInResearchCenter: {
      get(): boolean {
        return this.modelValue.pauseInResearchCenter;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, pauseInResearchCenter: value });
      },
    },
    pauseInChangeWeapon: {
      get(): boolean {
        return this.modelValue.pauseInChangeWeapon;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, pauseInChangeWeapon: value });
      },
    },
    selectionShape: {
      get(): SelectionShape {
        return this.modelValue.selectionShape;
      },
      set(value: SelectionShape) {
        this.$emit('update:modelValue', { ...this.modelValue, selectionShape: value });
      },
    },
    descriptionType: {
      get(): DescriptionType {
        return this.modelValue.descriptionType;
      },
      set(value: DescriptionType) {
        this.$emit('update:modelValue', { ...this.modelValue, descriptionType: value });
      },
    },
    screenInfo: {
      get(): ScreenInfo {
        return this.modelValue.screenInfo;
      },
      set(value: ScreenInfo) {
        this.$emit('update:modelValue', { ...this.modelValue, screenInfo: value });
      },
    },
    autoSaveTimeMinutes: {
      get(): number {
        return this.modelValue.autoSaveTimeMinutes;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, autoSaveTimeMinutes: value });
      },
    },
    hpBarOnPanel: {
      get(): boolean {
        return this.modelValue.hpBarOnPanel;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, hpBarOnPanel: value });
      },
    },
    shieldBarOnPanel: {
      get(): boolean {
        return this.modelValue.shieldBarOnPanel;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', { ...this.modelValue, shieldBarOnPanel: value });
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