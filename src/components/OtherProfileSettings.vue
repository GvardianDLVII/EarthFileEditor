<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>{{ $t('profile.otherSettings.header') }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-banner icon="mdi-alert" color="warning" border="sm" density="compact" class="mb-3">{{ $t('profile.otherSettings.warning') }}</v-banner>
        <v-row>
          <v-col sm="12" md="6" lg="4">
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue2" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue2.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue3" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue3.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue4" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue4.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue5" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue5.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownCollectionValue6" density="compact" :label="$t('profile.otherSettings.unknownCollectionValue6.label')" />
          </v-col>
          <v-col sm="12" md="6" lg="4">
            <v-text-field readonly disabled variant="outlined" :model-value="unknownGuid" density="compact" :label="$t('profile.otherSettings.unknownGuid.label')" />
            <v-text-field :label="$t('profile.otherSettings.unknownString.label')" v-model="unknownString" variant="outlined" required density="compact" />
            <v-text-field type="number" variant="outlined" v-model="unknownValue" density="compact" :label="$t('profile.otherSettings.unknownValue.label')" />
            <v-text-field type="number" variant="outlined" v-model="unknownValue2" density="compact" :label="$t('profile.otherSettings.unknownValue2.label')" />
            <StringsCollectionEditor v-model="unknownValues" :header="$t('profile.otherSettings.unknownValues.label')" :no-data-text="$t('profile.otherSettings.noValues')" />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ProfileData } from '@/code/api';
import StringsCollectionEditor from './StringsCollectionEditor.vue';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<ProfileData>, required: true },
  },
  components: { StringsCollectionEditor },
  emits: ['update:modelValue'],
  computed: {
    unknownCollectionValue: {
      get(): number {
        return this.modelValue.unknownCollectionValue;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue: value });
      },
    },
    unknownCollectionValue2: {
      get(): number {
        return this.modelValue.unknownCollectionValue2;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue2: value });
      },
    },
    unknownCollectionValue3: {
      get(): number {
        return this.modelValue.unknownCollectionValue3;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue3: value });
      },
    },
    unknownCollectionValue4: {
      get(): number {
        return this.modelValue.unknownCollectionValue4;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue4: value });
      },
    },
    unknownCollectionValue5: {
      get(): number {
        return this.modelValue.unknownCollectionValue5;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue5: value });
      },
    },
    unknownCollectionValue6: {
      get(): number {
        return this.modelValue.unknownCollectionValue6;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownCollectionValue6: value });
      },
    },
    unknownGuid: {
      get(): string {
        return this.modelValue.unknownGuid;
      },
      set(value: string) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownGuid: value });
      },
    },
    unknownString: {
      get(): string {
        return this.modelValue.unknownString;
      },
      set(value: string) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownString: value });
      },
    },
    unknownValue: {
      get(): number {
        return this.modelValue.unknownValue;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownValue: value });
      },
    },
    unknownValue2: {
      get(): number {
        return this.modelValue.unknownValue2;
      },
      set(value: number) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownValue2: value });
      },
    },
    unknownValues: {
      get(): string[] {
        return this.modelValue.unknownValues;
      },
      set(value: string[]) {
        this.$emit('update:modelValue', { ...this.modelValue, unknownValues: value });
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