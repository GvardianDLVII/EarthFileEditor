<template>
  <v-dialog max-width="400" v-model="dialog">
  <template v-slot:activator="{ props: activatorProps }">
    <v-icon
      v-bind="activatorProps"
      icon="mdi-pencil"
      size="small"
    ></v-icon>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card :title="commandName">
      <v-card-text>
        <h4>{{ $t('profile.shortcuts.edit.currentShortcut') }}</h4>
        <span v-if="!modelValue.boundKey">{{ $t('profile.shortcuts.edit.unbound') }}</span>
        <span v-else>
          <span v-if="modelValue.modifierKey"><v-btn readonly class="px-0 key-button" variant="outlined" density="compact" :text="getDikDisplay(modelValue.modifierKey)" /> + </span>
          <v-btn readonly class="px-1 key-button" variant="outlined" density="compact" :text="getDikDisplay(modelValue.boundKey)" />
        </span>
        <v-divider class="my-4" />
        <h4>{{ $t('profile.shortcuts.edit.newShortcut') }}</h4>
        <div class="d-flex">
          <span class="new-shortcut-label">{{ $t('profile.shortcuts.edit.modifierKey') }}: </span>
          <v-btn v-if="modifierKey" readonly class="px-0 key-button" variant="outlined" density="compact" :text="getDikDisplay(modifierKey)" />
          <span v-else>{{ $t('profile.shortcuts.edit.none') }}</span>
          <v-spacer />
          <v-btn variant="plain" density="compact" icon="mdi-backspace" @click="modifierKey = undefined"></v-btn>
          <v-text-field ref="modifierKeyInput" variant="outlined" density="compact" hide-details max-width="65px" class="ml-2" :label="$t('profile.shortcuts.edit.set')" @keydown.prevent="setModifierKey" readonly></v-text-field>
        </div>
        <div class="d-flex">
          <span class="new-shortcut-label">{{ $t('profile.shortcuts.edit.boundKey') }}: </span>
          <v-btn v-if="boundKey" readonly class="px-0 key-button" variant="outlined" hide-details density="compact" :text="getDikDisplay(boundKey)" />
          <span v-else>{{ $t('profile.shortcuts.edit.none') }}</span>
          <v-spacer />
          <v-btn variant="plain" density="compact" icon="mdi-backspace" @click="boundKey = undefined"></v-btn>
          <v-text-field ref="boundKeyInput" variant="outlined" density="compact" max-width="65px" class="ml-2" :label="$t('profile.shortcuts.edit.set')" @keydown.prevent="setBoundKey" readonly></v-text-field>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :text="$t('profile.shortcuts.edit.discard')"
          @click="discard"
        ></v-btn>
        <v-btn
          color="primary"
          :text="$t('profile.shortcuts.edit.accept')"
          @click="accept"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  </v-dialog>
</template>

<script lang="ts">
import { DIK, type ShortcutData } from '@/code/api';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  data() {
    return {
      dialog: false,
      showTooltip: false,
      modifierKey: undefined as DIK | undefined,
      boundKey: undefined as DIK | undefined,
    };
  },
  props: {
    modelValue: { type: Object as PropType<ShortcutData>, required: true },
    commandName: {type: String, required: true },
  },
  mounted() {
    this.showTooltip = this.modelValue.showInTooltip;
    this.modifierKey = this.modelValue.modifierKey;
    this.boundKey = this.modelValue.boundKey;
  },
  emits: ['update:modelValue'],
  methods: {
    getDikDisplay(key: DIK): string {
      return this.$t(`enums.dikKeys.${DIK[key]}`);
    },
    accept() {
      this.dialog = false;
      this.$emit('update:modelValue', {
        showInTooltip: this.showTooltip,
        modifierKey: this.modifierKey,
        boundKey: this.boundKey,
      });
    },
    discard() {
      this.dialog = false;
    },
    setModifierKey(event: KeyboardEvent) {
      this.modifierKey = this.getDikFromEvent(event);
      (this.$refs.modifierKeyInput as any).blur();
    },
    setBoundKey(event: KeyboardEvent) {
      this.boundKey = this.getDikFromEvent(event);
      (this.$refs.boundKeyInput as any).blur();
    },
    getDikFromEvent(event: KeyboardEvent) {
      const keyToDik: Record<string, DIK | undefined> = {
        Escape: DIK.Escape,
        '1': DIK.D1,
        '2': DIK.D2,
        '3': DIK.D3,
        '4': DIK.D4,
        '5': DIK.D5,
        '6': DIK.D6,
        '7': DIK.D7,
        '8': DIK.D8,
        '9': DIK.D9,
        '0': DIK.D0,
        '-': DIK.Minus,
        '=': DIK.Equals,
        Backspace: DIK.Backspace,
        Tab: DIK.Tab,
        q: DIK.Q,
        w: DIK.W,
        e: DIK.E,
        r: DIK.R,
        t: DIK.T,
        y: DIK.Y,
        u: DIK.U,
        i: DIK.I,
        o: DIK.O,
        p: DIK.P,
        '[': DIK.LeftBracket,
        ']': DIK.RightBracket,
        Enter: DIK.Enter,
        a: DIK.A,
        s: DIK.S,
        d: DIK.D,
        f: DIK.F,
        g: DIK.G,
        h: DIK.H,
        j: DIK.J,
        k: DIK.K,
        l: DIK.L,
        ';': DIK.Semicolon,
        "'": DIK.Apostrophe,
        '`': DIK.Grave,
        '\\': DIK.Backslash,
        z: DIK.Z,
        x: DIK.X,
        c: DIK.C,
        v: DIK.V,
        b: DIK.B,
        n: DIK.N,
        m: DIK.M,
        ',': DIK.Comma,
        '.': DIK.Period,
        '/': DIK.Slash,
        ' ': DIK.Space,
        CapsLock: DIK.CapsLock,
        F1: DIK.F1,
        F2: DIK.F2,
        F3: DIK.F3,
        F4: DIK.F4,
        F5: DIK.F5,
        F6: DIK.F6,
        F7: DIK.F7,
        F8: DIK.F8,
        F9: DIK.F9,
        F10: DIK.F10,
        F11: DIK.F11,
        F12: DIK.F12,
        F13: DIK.F13,
        F14: DIK.F14,
        F15: DIK.F15,
        ScrollLock: DIK.ScrollLock,
        Pause: DIK.Pause,
        Insert: DIK.Insert,
        Delete: DIK.Delete,
        Home: DIK.Home,
        End: DIK.End,
        PageUp: DIK.PageUp,
        PageDown: DIK.PageDown,
        ArrowUp: DIK.UpArrow,
        ArrowDown: DIK.DownArrow,
        ArrowLeft: DIK.LeftArrow,
        ArrowRight: DIK.RightArrow,
        ContextMenu: DIK.Menu,
      };
      const keyToDikLeft: Record<string, DIK | undefined> = {
        Control: DIK.LeftControl,
        Shift: DIK.LeftShift,
        Alt: DIK.LeftAlt,
        Meta: DIK.LeftWindows,
      };
      const keyToDikRight: Record<string, DIK | undefined> = {
        Control: DIK.RightControl,
        Shift: DIK.RightShift,
      };
      const keyToDikNumpad: Record<string, DIK | undefined> = {
        NumLock: DIK.NumLock,
        '/': DIK.NumpadDivide,
        '*': DIK.NumpadMultiply,
        '-': DIK.NumpadMinus,
        '+': DIK.NumpadPlus,
        Enter: DIK.NumpadEnter,
        ',': DIK.NumpadPeriod,
        '.': DIK.NumpadPeriod,
        '0': DIK.Numpad0,
        '1': DIK.Numpad1,
        '2': DIK.Numpad2,
        '3': DIK.Numpad3,
        '4': DIK.Numpad4,
        '5': DIK.Numpad5,
        '6': DIK.Numpad6,
        '7': DIK.Numpad7,
        '8': DIK.Numpad8,
        '9': DIK.Numpad9,
      };

      switch(event.location) {
        case 0: return keyToDik[event.key];
        case 1: return keyToDikLeft[event.key];
        case 2: return keyToDikRight[event.key];
        case 3: return keyToDikNumpad[event.key];
      }

      return undefined;
    },
  },
});
</script>

<style scoped>
.new-shortcut-label {
  width: 150px;
}
</style>