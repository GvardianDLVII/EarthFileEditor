<template>
  <v-select
    :items="options"
    :label="$t('profile.type.label')"
    v-model="value"
    item-title="label"
    item-value="value"
    density="compact"
    required
    variant="outlined"
  />
</template>

<script lang="ts">
import { ProfileType, ShieldType } from '@/code/api';
import { defineComponent } from 'vue';


export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    options() {
      return [
        {value: ProfileType.ED, label: this.$t('enums.profileType.ED')},
        {value: ProfileType.UCS, label: this.$t('enums.profileType.UCS')},
        {value: ProfileType.LC, label: this.$t('enums.profileType.LC')},
        {value: ProfileType.SnN, label: this.$t('enums.profileType.SnN')},
      ];
    },
    value: {
      get(): ProfileType {
        return this.modelValue;
      },
      set(value: ProfileType) {
        this.$emit('update:modelValue', value);
      },
    }
  },
})
</script>