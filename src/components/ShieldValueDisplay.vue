<template>
  <div class="shield-display">
    <v-tooltip v-if="value == -1" :text="$t('enums.shieldType.None')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" size="x-small" icon="mdi-shield-remove" color="red"/>
      </template>
    </v-tooltip>
    <v-tooltip v-else :text="shieldName" location="bottom">
      <template v-slot:activator="{ props }">
        <span v-bind="props">
          <v-icon size="x-small" v-for="i in (value + 1)" icon="mdi-shield" color="blue"/>
        </span>
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { ShieldType } from '@/code/api';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
  props: {
    value: {type: Number as PropType<ShieldType>, required: true },
  },
  data: () => ({}),
  computed: {
    shieldName() {
      if (this.value == ShieldType.Small)
        return this.$t('enums.shieldType.Small')
      if (this.value == ShieldType.Medium)
        return this.$t('enums.shieldType.Medium')
      if (this.value == ShieldType.Large)
        return this.$t('enums.shieldType.Large')
    }
  }
})
</script>

<style scoped>
    .shield-display {
        width: 50px;
        display: flex;
        justify-content: center;
        margin-right: 10px;
    }
</style>