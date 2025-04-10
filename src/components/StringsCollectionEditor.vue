<template>
  <div class="values-panel pa-2">
    <h4>{{ header }} <v-btn v-if="!adding" density="compact" variant="plain" icon="mdi-plus" @click="showAdding"></v-btn></h4>
    <v-text-field
      v-if="adding"
      variant="outlined"
      density="compact"
      class="new-element-input"
      hide-details
      v-model="newElement"
      append-inner-icon="mdi-plus"
      append-icon="mdi-close"
      @click:append="hideAdding"
      @click:append-inner="addElement"
      width="250"
    />
    <v-chip-group column v-if="values.length">
      <v-chip v-for="(val, index) in values" :key="index" variant="outlined" density="compact" readonly size="small">{{ val }} <v-icon icon="mdi-close" @click="removeElement(index)" /></v-chip>
    </v-chip-group>
    <span v-else>{{ noDataText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    newElement: '',
    adding: false,
  }),
  props: {
    modelValue: { type: Array<string>, required: true },
    header: { type: String },
    noDataText: { type: String },
  },
  emits: ['update:modelValue'],
  computed: {
    values: {
      get(): string[] {
        return this.modelValue;
      },
      set(value: string[]) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    removeElement(index: number) {
      let values = this.values;
      values.splice(index, 1);
      this.values = values;
    },
    addElement() {
      let values = this.values;
      values.push(this.newElement);
      this.values = values;
      this.hideAdding();
    },
    showAdding() {
      this.adding = true;
    },
    hideAdding() {
      this.newElement = '';
      this.adding = false;
    },
  },
});
</script>

<style>
.values-panel {
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.new-element-input input {
  min-height: 28px;
  font-size: small !important;
}

</style>