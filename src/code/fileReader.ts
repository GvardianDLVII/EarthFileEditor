import { inflate, deflate } from 'pako';
import { DescriptionType, FogOfWarType, MapPosition, ProfileType, ScreenInfo, SelectionShape, ToolbarPosition, type GameOptions, type ProfileData, type ShortcutData, type TemplateData } from './api';

type Encoding = "utf-8" | "utf-16";
export class BinaryWriter {
  private buffer: ArrayBuffer;
  private view: DataView;
  private offset: number;
  private length: number;

  constructor(initialSize = 64) {
    this.buffer = new ArrayBuffer(initialSize);
    this.view = new DataView(this.buffer);
    this.offset = 0;
    this.length = initialSize;
  }

  private ensureCapacity(extraBytes: number) {
    if (this.offset + extraBytes > this.length) {
      let newLength = this.length * 2;
      while (newLength < this.offset + extraBytes) {
        newLength *= 2;
      }

      const newBuffer = new ArrayBuffer(newLength);
      new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
      this.buffer = newBuffer;
      this.view = new DataView(this.buffer);
      this.length = newLength;
    }
  }

  writeInt(value: number) {
    this.ensureCapacity(4);
    this.view.setInt32(this.offset, value, true);
    this.offset += 4;
  }

  writeFloat(value: number) {
    this.ensureCapacity(4);
    this.view.setFloat32(this.offset, value, true);
    this.offset += 4;
  }

  writeString(value: string, encoding: Encoding = "utf-8", constLength: boolean = false) {
    let bytes: Uint8Array;

    if (encoding === "utf-8") {
      bytes = new TextEncoder().encode(value);
    } else if (encoding === "utf-16") {
      const byteLength = value.length * 2;
      this.ensureCapacity(4 + byteLength);
      const view = new DataView(this.buffer, this.offset + 4);
      for (let i = 0; i < value.length; i++) {
        view.setUint16(i * 2, value.charCodeAt(i), true); // little-endian
      }
      bytes = new Uint8Array(this.buffer, this.offset + 4, byteLength);
    } else {
      throw new Error("Unsupported encoding");
    }

    if (!constLength)
      this.writeInt(value.length); // write length first
    if (encoding === "utf-8") {
      this.ensureCapacity(bytes.length);
      new Uint8Array(this.buffer, this.offset, bytes.length).set(bytes);
    }

    this.offset += bytes.length;
  }

  writeGuid(guid: string) {
    // Remove hyphens and parse hex
    const hex = guid.replace(/-/g, "");
    if (hex.length !== 32) throw new Error("Invalid GUID format");

    this.ensureCapacity(16);
    for (let i = 0; i < 16; i++) {
      const byte = parseInt(hex.substr(i * 2, 2), 16);
      this.view.setUint8(this.offset++, byte);
    }
  }

  getBytes(): Uint8Array {
    return new Uint8Array(this.buffer.slice(0, this.offset));
  }
}

export class BinaryReader {
  private view: DataView;
  private offset: number;
  private buffer: ArrayBuffer;

  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.offset = 0;
  }

  readInt(): number {
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readFloat(): number {
    const value = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readString(encoding: Encoding = "utf-8", length = 0): string {
    if (length === 0)
      length = this.readInt();
    if (encoding === 'utf-16')
      length *= 2;
    const bytes = new Uint8Array(this.buffer, this.offset, length);
    this.offset += length;

    const decoder = encoding === "utf-8"
      ? new TextDecoder()
      : new TextDecoder("utf-16le");

    return decoder.decode(bytes);
  }

  readGuid(): string {
    const bytes = [];
    for (let i = 0; i < 16; i++) {
      bytes.push(this.view.getUint8(this.offset++));
    }

    // Rebuild into standard GUID string
    const hex = bytes.map(b => b.toString(16).padStart(2, "0")).join("");
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20)
    ].join("-");
  }
}

interface DynamicCollection<T> {
  field_0x10: number,
  items: T[],
}

function deserializeTemplate(deserializer: BinaryReader): TemplateData {
  const field_0x4 = deserializer.readInt();
  const chassisName = deserializer.readString();
  const field_0xc = deserializer.readInt();
  const field_0x10 = deserializer.readInt();
  const field_0x14 = deserializer.readInt();
  const powerShieldType = deserializer.readInt();
  const scriptId = deserializer.readGuid();
  let slots = [] as string[];
  for (let i = 0; i < 8; i++)
    slots.push(deserializer.readString());
  const templateName = deserializer.readString('utf-16');

  return {
    field_0x4: field_0x4,
    chassisName: chassisName,
    field_0xc: field_0xc,
    field_0x10: field_0x10,
    field_0x14: field_0x14,
    powerShieldType: powerShieldType,
    scriptId: scriptId,
    slots: slots,
    templateName: templateName
  };
}

function deserializeTemplates(deserializer: BinaryReader): DynamicCollection<TemplateData> {
  const length = deserializer.readInt();
  const field_0x10 = deserializer.readInt();
  let templates = [] as TemplateData[];
  for (let i = 0; i < length; i++) {
    let template = deserializeTemplate(deserializer);
    templates.push(template);
  }

  return {
    field_0x10: field_0x10,
    items: templates,
  };
}

function deserializeStrings(deserializer: BinaryReader): DynamicCollection<string> {
  const length = deserializer.readInt();
  const field_0x10 = deserializer.readInt();
  let items = [] as string[];
  for (let i = 0; i < length; i++)
    items.push(deserializer.readString());

  return {
    field_0x10: field_0x10,
    items: items,
  };
}

function deserializeShortcut(deserializer: BinaryReader): ShortcutData {
  const showInTooltip = deserializer.readInt();
  const boundKey = deserializer.readInt();
  const modifierKey = deserializer.readInt();
  return {
    showInTooltip: showInTooltip != 0,
    boundKey: boundKey,
    modifierKey: modifierKey
  };
}

function deserializeGameOptions(deserializer: BinaryReader): GameOptions {
  const graphicsSettings = deserializer.readInt();
  let gamma1 = deserializer.readFloat();
  let gamma2 = deserializer.readFloat();
  let gamma3 = deserializer.readFloat();
  let tunnelsAmbient = deserializer.readFloat();
  let viewDistance = deserializer.readInt();
  let maxZoom = deserializer.readFloat();
  let interfaceSettings = deserializer.readInt();
  //unused 4 bytes
  const _ = deserializer.readInt();
  let panelPosition = deserializer.readInt();
  let consoleSize = deserializer.readInt();
  let consoleDisplayTime = deserializer.readInt();
  let selectionSettings = deserializer.readInt();
  let scrollingMouseSpeed = deserializer.readFloat();
  let scrollingKeyboardSpeed = deserializer.readFloat();
  let numberOfTicksPerSecond = deserializer.readInt();
  let soundSettings = deserializer.readInt();
  let musicVolume = deserializer.readInt();
  let soundFxVolume = deserializer.readInt();
  let unitsSpeechVolume = deserializer.readInt();
  let buildingsSpeechVolume = deserializer.readInt();
  let interfaceVolume = deserializer.readInt();
  let environmentalVolume = deserializer.readInt();
  let commandFrequency = deserializer.readInt();
  let unknownNetworkParameter = deserializer.readInt();
  let mouseSensitivity = deserializer.readFloat();
  let videoSettings = deserializer.readInt();
  let interfaceName = deserializer.readString('utf-8', 60).replace("\0", "");
  let autoSaveTimeMinutes = deserializer.readInt();
  let shortcuts = [] as ShortcutData[];
  for (let i = 0; i < 210; i++) {
    let shortcut = deserializeShortcut(deserializer);
    shortcuts.push(shortcut);
  }

  return {
    fogOfWar: (graphicsSettings & 0x2) != 0 ? FogOfWarType.Environmental : FogOfWarType.Black,
    atmosphericFog: (graphicsSettings & 0x4) ? true : false,
    tunnelWalls: (graphicsSettings & 0x8) ? true : false,
    tunnelWallsTransparent: (graphicsSettings & 0x10) ? true : false,
    objectShadows: (graphicsSettings & 0x20) ? true : false,
    terrainShadows: (graphicsSettings & 0x40) ? true : false,
    rain: (graphicsSettings & 0x80) ? true : false,
    snow: (graphicsSettings & 0x100) ? true : false,
    lightCons: (graphicsSettings & 0x400) ? true : false,
    lowResTextures: (graphicsSettings & 0x1000) ? true : false,
    shining: (graphicsSettings & 0x2000) ? true : false,
    gamma1: gamma1,
    gamma2: gamma2,
    gamma3: gamma3,
    tunnelsAmbient: tunnelsAmbient,
    viewDistance: viewDistance,
    maxZoom: maxZoom,
    compass: (interfaceSettings & 0x1) ? true : false,
    autoZoom: (interfaceSettings & 0x2) ? true : false,
    swapCameras: (interfaceSettings & 0x4) ? true : false,
    toolbarPosition: (interfaceSettings & 0x10) != 0 ? ToolbarPosition.Top : ToolbarPosition.Bottom,
    mapPosition: (interfaceSettings & 0x20) != 0 ? MapPosition.BottomRight : MapPosition.TopLeft,
    commandList: (interfaceSettings & 0x80) ? true : false,
    reverseMouse: (interfaceSettings & 0x100) ? true : false,
    panelPosition: panelPosition,
    consoleSize: consoleSize,
    consoleDisplayTime: consoleDisplayTime,
    showHp: (selectionSettings & 0x1) ? true : false,
    showShield: (selectionSettings & 0x2) ? true : false,
    showElectronics: (selectionSettings & 0x4) ? true : false,
    showAmmo: (selectionSettings & 0x8) ? true : false,
    showExperience: (selectionSettings & 0x10) ? true : false,
    showTemperature: (selectionSettings & 0x20) ? true : false,
    showDynamic: (selectionSettings & 0x40) ? true : false,
    selectionShape: (selectionSettings & 0x100) != 0 ? 1 : 0,
    commandTooltips: (selectionSettings & 0x200) ? true : false,
    tooltipsInResearchDialog: (selectionSettings & 0x400) ? true : false,
    scrollbarsOnlyIfNeeded: (selectionSettings & 0x800) ? true : false,
    descriptionType: (selectionSettings & 0x1000) != 0 ? 1 : 0,
    pauseInConstructor: (selectionSettings & 0x4000) ? true : false,
    pauseInResearchCenter: (selectionSettings & 0x8000) ? true : false,
    pauseInChangeWeapon: (selectionSettings & 0x10000) ? true : false,
    screenInfo: (selectionSettings & 0x40000) != 0
      ? 2
      : (selectionSettings & 0x20000) != 0
        ? 1
        : 0,
    useAutosave: (selectionSettings & 0x80000) ? true : false,
    hpBarOnPanel: (selectionSettings & 0x100000) ? true : false,
    shieldBarOnPanel: (selectionSettings & 0x200000) ? true : false,
    showBuildingTooltips: (selectionSettings & 0x400000) ? true : false,
    showDamageSelection: (selectionSettings & 0x800000) ? true : false,
    scrollingMouseSpeed: scrollingMouseSpeed,
    scrollingKeyboardSpeed: scrollingKeyboardSpeed,
    numberOfTicksPerSecond: numberOfTicksPerSecond,
    soundtrack: (soundSettings & 0x2) ? true : false,
    swapChannels: (soundSettings & 0x4) ? true : false,
    dontPlayProductionMessages: (soundSettings & 0x8) ? true : false,
    musicVolume: musicVolume,
    soundFxVolume: soundFxVolume,
    unitsSpeechVolume: unitsSpeechVolume,
    buildingsSpeechVolume: buildingsSpeechVolume,
    interfaceVolume: interfaceVolume,
    environmentalVolume: environmentalVolume,
    commandFrequency: commandFrequency,
    unknownNetworkParameter: unknownNetworkParameter,
    mouseSensitivity: mouseSensitivity,
    videoDoubleSized: (videoSettings & 0x1) ? true : false,
    videoSubtitles: (videoSettings & 0x2) ? true : false,
    interfaceName: interfaceName,
    autoSaveTimeMinutes: autoSaveTimeMinutes,
    shortcuts: shortcuts,
  };
}

export async function readFile(file: File): Promise<ProfileData | undefined> {
  const output = inflate(await file.arrayBuffer());

  let buffer = new Uint8Array(output).buffer;
  const deserializer = new BinaryReader(buffer);
  const header = deserializer.readInt();
  if (header != 0x000d4955)
    throw new Error('Wrong header value for the profile data');
  const profileType = deserializer.readInt();
  const profileName = deserializer.readString('utf-16');
  const earthNetLogin = deserializer.readString();
  const earthNetPassword = deserializer.readString();
  const ucsTemplates = deserializeTemplates(deserializer);
  const edTemplates = deserializeTemplates(deserializer);
  const lcTemplates = deserializeTemplates(deserializer);
  const enabledVideos = deserializeStrings(deserializer);
  const gameOptions = deserializeGameOptions(deserializer);
  let unknownGuid = '00000000-0000-0000-0000-000000000000';
  let unknownString = '';
  let unknownValue = 0;
  let unknownValue2 = 0;
  let unknownCollectionValue5 = 0;
  let recentIpAddresses = [] as string[];
  let unknownCollectionValue6 = 0;
  let unknownValues = [] as string[];
  if (profileType == ProfileType.SnN) {
    unknownGuid = deserializer.readGuid();
    unknownString = deserializer.readString();
    unknownValue = deserializer.readInt();
    unknownValue2 = deserializer.readInt();
    const recentIpCollection = deserializeStrings(deserializer);
    unknownCollectionValue5 = recentIpCollection.field_0x10;
    recentIpAddresses = recentIpCollection.items;
    const unknownValuesCollection = deserializeStrings(deserializer);
    unknownCollectionValue6 = unknownValuesCollection.field_0x10;
    unknownValues = unknownValuesCollection.items;
  }

  return {
    type: profileType,
    name: profileName,
    earthNetLogin: earthNetLogin,
    earthNetPassword: earthNetPassword,
    unknownCollectionValue: ucsTemplates.field_0x10,
    ucsTemplates: ucsTemplates.items,
    unknownCollectionValue2: edTemplates.field_0x10,
    edTemplates: edTemplates.items,
    unknownCollectionValue3: lcTemplates.field_0x10,
    lcTemplates: lcTemplates.items,
    unknownCollectionValue4: enabledVideos.field_0x10,
    enabledVideos: enabledVideos.items,
    gameOptions: gameOptions,
    unknownGuid: unknownGuid,
    unknownString: unknownString,
    unknownValue: unknownValue,
    unknownValue2: unknownValue2,
    unknownCollectionValue5: unknownCollectionValue5,
    recentIpAddresses: recentIpAddresses,
    unknownCollectionValue6: unknownCollectionValue6,
    unknownValues: unknownValues,
  };
}

function serializeTemplates(serializer: BinaryWriter, templates: DynamicCollection<TemplateData>) {
  serializer.writeInt(templates.items.length);
  serializer.writeInt(templates.field_0x10);
  for (let i = 0; i < templates.items.length; i++) {
    const template = templates.items[i];
    serializer.writeInt(template.field_0x4);
    serializer.writeString(template.chassisName);
    serializer.writeInt(template.field_0xc);
    serializer.writeInt(template.field_0x10);
    serializer.writeInt(template.field_0x14);
    serializer.writeInt(template.powerShieldType);
    serializer.writeGuid(template.scriptId);
    for (let j = 0; j < 8; j++)
      serializer.writeString(template.slots[j]);
    serializer.writeString(template.templateName, 'utf-16');
  }
}

function serializeStrings(serializer: BinaryWriter, strings: DynamicCollection<string>) {
  serializer.writeInt(strings.items.length);
  serializer.writeInt(strings.field_0x10);
  for (let i = 0; i < strings.items.length; i++)
    serializer.writeString(strings.items[i]);
}

function serializeGameOptions(serializer: BinaryWriter, options: GameOptions) {
  let graphicsSettings = 0;
  if (options.fogOfWar == FogOfWarType.Black) graphicsSettings |= 0x1;
  if (options.fogOfWar == FogOfWarType.Environmental) graphicsSettings |= 0x2;
  if (options.atmosphericFog) graphicsSettings |= 0x4;
  if (options.tunnelWalls) graphicsSettings |= 0x8;
  if (options.tunnelWallsTransparent) graphicsSettings |= 0x10;
  if (options.objectShadows) graphicsSettings |= 0x20;
  if (options.terrainShadows) graphicsSettings |= 0x40;
  if (options.rain) graphicsSettings |= 0x80;
  if (options.snow) graphicsSettings |= 0x100;
  if (options.lightCons) graphicsSettings |= 0x400;
  if (options.lowResTextures) graphicsSettings |= 0x1000;
  if (options.shining) graphicsSettings |= 0x2000;
  serializer.writeInt(graphicsSettings);
  serializer.writeFloat(options.gamma1);
  serializer.writeFloat(options.gamma2);
  serializer.writeFloat(options.gamma3);
  serializer.writeFloat(options.tunnelsAmbient);
  serializer.writeInt(options.viewDistance);
  serializer.writeFloat(options.maxZoom);
  let interfaceSettings = 0;
  if (options.compass) interfaceSettings |= 0x1;
  if (options.autoZoom) interfaceSettings |= 0x2;
  if (options.swapCameras) interfaceSettings |= 0x4;
  if (options.toolbarPosition == ToolbarPosition.Top) interfaceSettings |= 0x10;
  if (options.mapPosition == MapPosition.BottomRight) interfaceSettings |= 0x20;
  if (options.commandList) interfaceSettings |= 0x80;
  if (options.reverseMouse) interfaceSettings |= 0x100;
  serializer.writeInt(interfaceSettings);
  serializer.writeInt(0);
  serializer.writeInt(options.panelPosition);
  serializer.writeInt(options.consoleSize);
  serializer.writeInt(options.consoleDisplayTime);
  let selectionSettings = 0;
  if (options.showHp) selectionSettings |= 0x1;
  if (options.showShield) selectionSettings |= 0x2;
  if (options.showElectronics) selectionSettings |= 0x4;
  if (options.showAmmo) selectionSettings |= 0x8;
  if (options.showExperience) selectionSettings |= 0x10;
  if (options.showTemperature) selectionSettings |= 0x20;
  if (options.showDynamic) selectionSettings |= 0x40;
  if (options.selectionShape == SelectionShape.Isometric) selectionSettings |= 0x100;
  if (options.commandTooltips) selectionSettings |= 0x200;
  if (options.tooltipsInResearchDialog) selectionSettings |= 0x400;
  if (options.scrollbarsOnlyIfNeeded) selectionSettings |= 0x800;
  if (options.descriptionType == DescriptionType.Tooltip) selectionSettings |= 0x1000;
  if (options.pauseInConstructor) selectionSettings |= 0x4000;
  if (options.pauseInResearchCenter) selectionSettings |= 0x8000;
  if (options.pauseInChangeWeapon) selectionSettings |= 0x10000;
  if (options.screenInfo == ScreenInfo.Clock) selectionSettings |= 0x20000;
  if (options.screenInfo == ScreenInfo.Temperature) selectionSettings |= 0x40000;
  if (options.useAutosave) selectionSettings |= 0x80000;
  if (options.hpBarOnPanel) selectionSettings |= 0x100000;
  if (options.shieldBarOnPanel) selectionSettings |= 0x200000;
  if (options.showBuildingTooltips) selectionSettings |= 0x400000;
  if (options.showDamageSelection) selectionSettings |= 0x800000;
  serializer.writeInt(selectionSettings);
  serializer.writeFloat(options.scrollingMouseSpeed);
  serializer.writeFloat(options.scrollingKeyboardSpeed);
  serializer.writeInt(options.numberOfTicksPerSecond);
  let soundSettings = 0;
  if (options.soundtrack) soundSettings |= 0x2;
  if (options.swapChannels) soundSettings |= 0x4;
  if (options.dontPlayProductionMessages) soundSettings |= 0x8;
  serializer.writeInt(soundSettings);
  serializer.writeInt(options.musicVolume);
  serializer.writeInt(options.soundFxVolume);
  serializer.writeInt(options.unitsSpeechVolume);
  serializer.writeInt(options.buildingsSpeechVolume);
  serializer.writeInt(options.interfaceVolume);
  serializer.writeInt(options.environmentalVolume);
  serializer.writeInt(options.commandFrequency);
  serializer.writeInt(options.unknownNetworkParameter);
  serializer.writeFloat(options.mouseSensitivity);
  let videoSettings = 0;
  if (options.videoDoubleSized) videoSettings |= 0x1;
  if (options.videoSubtitles) videoSettings |= 0x2;
  serializer.writeInt(videoSettings);
  serializer.writeString(String(options.interfaceName).padEnd(60, '\0'), 'utf-8', true);
  serializer.writeInt(options.autoSaveTimeMinutes);
  for (let i = 0; i < 210; i++) {
    serializer.writeInt(options.shortcuts[i].showInTooltip ? 1 : 0);
    serializer.writeInt(options.shortcuts[i].boundKey);
    serializer.writeInt(options.shortcuts[i].modifierKey);
  }
}

export function serializeProfileData(profile: ProfileData): Uint8Array {
  const serializer = new BinaryWriter();
  serializer.writeInt(0x000d4955); // header
  serializer.writeInt(profile.type);
  serializer.writeString(profile.name, 'utf-16');
  serializer.writeString(profile.earthNetLogin);
  serializer.writeString(profile.earthNetPassword);
  serializeTemplates(serializer, {
    field_0x10: profile.unknownCollectionValue,
    items: profile.ucsTemplates,
  });
  serializeTemplates(serializer, {
    field_0x10: profile.unknownCollectionValue2,
    items: profile.edTemplates,
  });
  serializeTemplates(serializer, {
    field_0x10: profile.unknownCollectionValue3,
    items: profile.lcTemplates,
  });
  serializeStrings(serializer, {
    field_0x10: profile.unknownCollectionValue4,
    items: profile.enabledVideos,
  });
  serializeGameOptions(serializer, profile.gameOptions);
  if (profile.type == ProfileType.SnN) {
    serializer.writeGuid(profile.unknownGuid);
    serializer.writeString(profile.unknownString);
    serializer.writeInt(profile.unknownValue);
    serializer.writeInt(profile.unknownValue2);
    serializeStrings(serializer, {
      field_0x10: profile.unknownCollectionValue5,
      items: profile.recentIpAddresses,
    });
    serializeStrings(serializer, {
      field_0x10: profile.unknownCollectionValue6,
      items: profile.unknownValues,
    });
  }

  const bytes = serializer.getBytes();
  return deflate(bytes);
}