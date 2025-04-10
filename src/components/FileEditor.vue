<template>
  <v-container class="fill-height">
    <v-row class="fill-height" style="max-width: 100% !important;">
      <v-col sm="12" md="4" lg="3" xl="2">
        <v-card outlined :elevation="8" class="fill-height left-panel">
          <v-card-title class="d-flex align-center">
            <span> {{ $t("main.title") }} </span>
            <v-spacer />
            <v-switch
              v-model="darkTheme"
              color="primary"
              density="compact"
              @update:model-value="updateTheme"
              hide-details
            ></v-switch>
            <v-icon class="ml-2" icon="mdi-weather-night" :color="darkTheme ? 'primary' : ''" />
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-file-input
              v-model="file"
              density="compact"
              :label="$t('main.fileInput.title')"
              :hint="$t('main.fileInput.placeholder')"
              persistent-hint
              variant="outlined"
              @update:model-value="readFile"
              :clearable="false"
              prepend-icon=""
              class="earth-file-input mb-2"
            />
            <v-btn color="primary" variant="outlined" prepend-icon="mdi-file-download"@click="saveProfile">Download profile</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="8" lg="9" xl="10" id="dataCol">
        <v-card v-if="profile" outlined :elevation="8" class="fill-height">
          <v-card-title>{{ profile?.name }}'s profile</v-card-title>
          <v-card-text>
            <v-row>
              <v-col sm="12" md="6" lg="4" xl="3">
                <ProfileTypeEditor v-model="profile.type" />
                <v-text-field :label="$t('profile.name.label')" v-model="profile.name" variant="outlined" required density="compact" />
              </v-col>
              <v-col sm="12" md="6" lg="4" xl="3">
                <v-text-field :label="$t('profile.earthNetLogin.label')" v-model="profile.earthNetLogin" variant="outlined" required density="compact" />
                <v-text-field
                  :label="$t('profile.earthNetPassword.label')"
                  v-model="profile.earthNetPassword"
                  :append-inner-icon="enPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="enPasswordVisible ? 'text' : 'password'"
                  @click:append-inner="enPasswordVisible = !enPasswordVisible"
                  variant="outlined"
                  required
                  density="compact"
                  />
              </v-col>
              <v-col sm="12" md="6">
                <StringsCollectionEditor v-model="profile.recentIpAddresses" :header="$t('profile.recentIps.label')" :no-data-text="$t('profile.noRecentIps')" />
              </v-col>
            </v-row>
            <v-row class="mx-0 mb-3">
              <v-col sm="12" class="enabled-videos-panel pa-2">
                <StringsCollectionEditor v-model="profile.enabledVideos" :header="$t('profile.enabledVideos.label')" :no-data-text="$t('profile.noVideos')" />
              </v-col>
            </v-row>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>{{ $t('profile.templates.edHeader') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <UnitTemplates v-model="profile.edTemplates" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>{{ $t('profile.templates.ucsHeader') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <UnitTemplates v-model="profile.ucsTemplates" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>{{ $t('profile.templates.lcHeader') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <UnitTemplates v-model="profile.lcTemplates" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <GameOptions v-model="profile.gameOptions" />
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>{{ $t('profile.shortcuts.header') }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <Shortcuts v-model="profile.gameOptions.shortcuts" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <OtherProfileSettings v-model="profile" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { readFile, serializeProfileData } from '@/code/fileReader';
import type { PropType } from 'vue';
import type { ThemeInstance } from 'vuetify';
import ProfileTypeEditor from './ProfileTypeEditor.vue';
import UnitTemplates from './UnitTemplates.vue';
import GameOptions from './GameOptions.vue';
import Shortcuts from './Shortcuts.vue';
import OtherProfileSettings from './OtherProfileSettings.vue';
import type { ProfileData } from '@/code/api';
import StringsCollectionEditor from './StringsCollectionEditor.vue';

export default{
  data: () => ({
    darkTheme: true,
    file: {} as File,
    profile: undefined as ProfileData | undefined,
    enPasswordVisible: false,
  }),
  props: {
    theme: {type: Object as PropType<ThemeInstance>, required: true },
  },
  components: { ProfileTypeEditor, UnitTemplates, GameOptions, Shortcuts, OtherProfileSettings, StringsCollectionEditor },
  methods: {
    async readFile() {
      if (!this.file)
        return;

      this.profile = await readFile(this.file);
    },
    saveProfile() {
      if (!this.profile)
        return;
      const binaryData = serializeProfileData(this.profile);
      const blob = new Blob([binaryData], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "UserInfo.dat";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    },
    updateTheme() {
      this.theme.global.name.value = this.darkTheme ? 'dark' : 'light'
    },
    removeRecentIpAddress(index: number) {
      this.profile?.recentIpAddresses.splice(index, 1);
    },
    removeEnabledVideo(index: number) {
      this.profile?.enabledVideos.splice(index, 1);
    },
  }
}
</script>

<style scoped>
  #dataCol>div {
    height: 100%;
  }

  .earth-file-input .v-field__input {
    font-size: 13px;
    line-height: 24px;
  }
  .v-expansion-panel-title--active {
    min-height: auto !important;
  }
  .v-switch__track {
    height: 11px;
    min-width: 30px;
  }
  .v-switch__thumb {
    height: 18px;
    width: 18px;
  }

  .v-expansion-panel-text, .v-expansion-panel-title {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

</style>
