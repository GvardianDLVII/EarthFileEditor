<template>
  <v-row>
    <v-col sm="12" lg="9">
      <v-data-table-virtual
        :items="modelValue"
        :headers="headers"
        density="compact"
        fixed-header
      >
        <template v-slot:item.commandName="{item, index}">
          {{ getCommandDisplay(index) }}
        </template>
        <template v-slot:item.boundKeys="{item}">
          <span v-if="!item.boundKey"></span>
          <span v-else>
            <span v-if="item.modifierKey"><v-btn readonly class="px-0 key-button" variant="outlined" density="compact" :text="getDikDisplay(item.modifierKey)" /> + </span>
            <v-btn readonly class="px-1 key-button" variant="outlined" density="compact" :text="getDikDisplay(item.boundKey)" />
          </span>
        </template>
        <template v-slot:item.showInTooltip="{value}">
          <v-icon :icon="value ? 'mdi-check-bold' : 'mdi-close-thick'" :color="value ? 'green' : 'red'"></v-icon>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <ShortcutEditDialog :model-value="item" :command-name="getCommandDisplay(index)" @update:model-value="updateShortcut(index, $event)" />
        </template>
      </v-data-table-virtual>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { type ShortcutData, DIK } from '@/code/api';
import { defineComponent } from 'vue';
import ShortcutEditDialog from './ShortcutEditDialog.vue';


export default defineComponent({
  props: {
    modelValue: { type: Array<ShortcutData>, required: true },
  },
  components: { ShortcutEditDialog },
  emits: ['update:modelValue'],
  computed: {
    headers(): object[] {
      return [
        { title: this.$t('profile.shortcuts.fields.name.label'), value: 'commandName' },
        { title: this.$t('profile.shortcuts.fields.key.label'), value: 'boundKeys' },
        { title: this.$t('profile.shortcuts.fields.showInTooltip.label'), value: 'showInTooltip' },
        { key: 'actions', align: 'end', sortable: false },
      ];
    },
  },
  methods: {
    getDikDisplay(key: DIK): string {
      return this.$t(`enums.dikKeys.${DIK[key]}`);
    },
    getCommandDisplay(index: number) : string {
      return this.$t(`enums.commands.C${String(index).padStart(3, '0')}`);
    },
    updateShortcut(index: number, newData: ShortcutData) {
      let newValues = this.modelValue;
      newValues[index] = newData;
      this.$emit('update:modelValue', newValues);
    }
  },
});
</script>

<style>
.key-button {
  min-width: 32px !important;
}
</style>