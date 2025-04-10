<template>
  <v-data-table
    :items="modelValue"
    :headers="headers"
    density="compact"
    disable-sort
    items-per-page="-1"
    hide-default-footer
  >
    <template v-slot:item.powerShieldType="{value}">
      <ShieldValueDisplay :value="value" />
    </template>
    <template v-slot:item.slots="{value}">
      <table class="slots">
        <tbody>
          <tr><td v-if="value[0] || value[1]">{{ value[0] }}</td><td v-if="value[2] || value[3]">{{ value[2] }}</td><td v-if="value[4] || value[5]">{{ value[4] }}</td><td v-if="value[6] || value[7]">{{ value[6] }}</td></tr>
          <tr class="subslot"><td v-if="value[1]">{{ (value[1] ? '+' : '') + value[1] }}</td><td v-if="value[3]">{{ (value[3] ? '+' : '') + value[3] }}</td><td v-if="value[5]">{{ (value[5] ? '+' : '') + value[5] }}</td><td v-if="value[7]">{{ (value[7] ? '+' : '') + value[7] }}</td></tr>
        </tbody>
      </table>
    </template>
    <template v-slot:item.actions="{ item, index }">
      <div class="d-flex ga-2 justify-end">
        <v-icon icon="mdi-menu-up-outline" size="small" :disabled="index === 0" @click="moveUp(index)"></v-icon>
        <v-icon icon="mdi-menu-down-outline" size="small" :disabled="index === modelValue.length - 1" @click="moveDown(index)"></v-icon>
        <v-icon icon="mdi-pencil" size="small" disabled></v-icon>
        <v-icon icon="mdi-delete" size="small" @click="remove(index)"></v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShieldValueDisplay from './ShieldValueDisplay.vue';
import type { TemplateData } from '@/code/api';

export default defineComponent({
  props: {
    modelValue: {
      type: Array<TemplateData>,
      required: true,
    },
  },
  components: { ShieldValueDisplay },
  emits: ['update:modelValue'],
  computed: {
    headers(): object[] {
      return [
        { title: this.$t('profile.templates.fields.name.label'), value: 'templateName' },
        { title: this.$t('profile.templates.fields.chassis.label'), value: 'chassisName' },
        { title: this.$t('profile.templates.fields.shield.label'), value: 'powerShieldType' },
        { title: this.$t('profile.templates.fields.slots.label'), value: 'slots' },
        { title: this.$t('profile.templates.fields.script.label'), value: 'scriptId' },
        { key: 'actions', align: 'end', sortable: false },
      ];
    },
  },
  methods: {
    moveUp(index: number) {
      if (index === 0)
        return;

      let newValues = this.modelValue;
      let element = newValues[index];
      newValues[index] = newValues[index - 1];
      newValues[index - 1] = element;
      this.$emit('update:modelValue', newValues);
    },
    moveDown(index: number) {
      if (index === this.modelValue.length - 1)
        return;
      
      let newValues = this.modelValue;
      let element = newValues[index];
      newValues[index] = newValues[index + 1];
      newValues[index + 1] = element;
      this.$emit('update:modelValue', newValues);
    },
    remove(index: number) {
      let newValues = this.modelValue;
      newValues.splice(index, 1);
      this.$emit('update:modelValue', newValues);
    },
  }
});
</script>

<style scoped>
.slots td {
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding-right: 10px;
  padding-left: 3px;
}
.subslot {
  font-size: smaller;
  opacity: 50%;
}
</style>