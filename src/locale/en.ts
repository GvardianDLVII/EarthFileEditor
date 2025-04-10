export const en = {
  main: {
    title: "Earth file editor",
    fileInput: {
      title: 'Earth file',
      placeholder: 'Select .dat profile file'
    }
  },
  profile: {
    type: {
      label: 'Type',
    },
    name: {
      label: 'Name',
    },
    earthNetLogin: {
      label: 'EarthNet login',
    },
    earthNetPassword: {
      label: 'EarthNet password',
    },
    enabledVideos: {
      label: 'Unlocked videos',
    },
    noVideos: 'No videos unlocked',
    recentIps: {
      label: 'Recent IP addresses',
    },
    noRecentIps: 'No addresses',
    templates: {
      edHeader: "ED unit templates",
      ucsHeader: "UCS unit templates",
      lcHeader: "LC unit templates",
      fields: {
        name: {
          label: 'Display name',
        },
        chassis: {
          label: 'Chassis',
        },
        script: {
          label: 'Script',
        },
        shield: {
          label: 'Shield',
        },
        slots: {
          label: 'Slots',
        },
      },
    },
    gameOptions: {
      header: 'Game options',
      tabs: {
        graphics: 'Graphics',
        interface: 'Interface',
        selection: 'Selection',
        speed: 'Speed',
        sound: 'Sound',
      },
      graphics: {
        fogOfWar: {
          label: 'Fog of war',
        },
        tunnelWalls: {
          label: 'Tunnel walls',
          front: {
            label: 'Front',
          },
          back: {
            label: 'Back',
          },
        },
        shadows: {
          label: 'Shadows',
          object: {
            label: 'Object',
          },
          terrain: {
            label: 'Terrain',
          },
        },
        weather: {
          label: 'Weather FX',
          rain: {
            label: 'Rain',
          },
          snow: {
            label: 'Snow',
          },
        },
        atmosphericFog: {
          label: 'Atmospheric fog',
        },
        lowResTextures: {
          label: 'Low-res textures',
        },
        lightCons: {
          label: 'Light cones',
        },
        shining: {
          label: 'Shining',
        },
        viewRange: {
          label: 'View range',
        },
        maxZoom: {
          label: 'Mazimum zoom level',
        },
        tunnelsAmbient: {
          label: 'Light in tunnels',
        },
        gamma: {
          label: 'Gamma correction',
        },
      },
      interface: {
        compass: {
          label: "Compass",
        },
        autoZoom: {
          label: "Auto zoom",
        },
        swapCameras: {
          label: "Swap cameras",
        },
        interface: {
          label: "Interface",
        },
        panelPosition: {
          label: "Panel position",
        },
        toolbarPosition: {
          label: "Toolbar position",
        },
        mapPosition: {
          label: "Map position",
        },
        consoleSize: {
          label: "Console size",
        },
        consoleDisplayTime: {
          label: "Console display time",
        },
      },
      selection: {
        showHp: {
          label: 'HP',
        },
        showShield: {
          label: 'Power shield',
        },
        showTemperature: {
          label: 'Temperature',
        },
        showElectronics: {
          label: 'Electronics',
        },
        showAmmo: {
          label: 'Ammo',
        },
        showExperience: {
          label: 'Experience',
        },
        showDynamic: {
          label: 'Dynamic',
        },
        showDamageSelection: {
          label: 'Show damaged units',
        },
        commandTooltips: {
          label: 'Command tooltips',
        },
        tooltipsInResearchDialog: {
          label: 'Tooltips in Research window',
        },
        showBuildingTooltips: {
          label: 'Building tooltips',
        },
        scrollbarsOnlyIfNeeded: {
          label: 'Scrollers: only if needed',
        },
        commandList: {
          label: 'Command list',
        },
        pauseInConstructor: {
          label: 'Pause in Constructor window',
        },
        pauseInResearchCenter: {
          label: 'Pause in Research window',
        },
        pauseInChangeWeapon: {
          label: 'Pause in Change weapon window',
        },
        selectionShape: {
          label: 'Selection shape',
        },
        descriptionType: {
          label: 'Description type',
        },
        screenInfo: {
          label: 'Screen info',
        },
        autoSaveTimeMinutes: {
          label: 'Autosave interval minutes',
        },
        hpBarOnPanel: {
          label: 'HP bar on panel',
        },
        shieldBarOnPanel: {
          label: 'Shield bar on panel',
        },
      },
      speed: {
        scrollingMouseSpeed: {
          label: 'Scrolling speed - mouse',
        },
        scrollingKeyboardSpeed: {
          label: 'Scrolling speed - keyboard',
        },
        mouseSensitivity: {
          label: 'Mouse sensitivity',
        },
        numberOfTicksPerSecond: {
          label: 'Game speed',
        },
        commandFrequency: {
          label: 'Network command frequency',
        },
        unknownNetworkParameter: {
          label: 'Unknown network parameter',
        },
        reverseMouse: {
          label: 'Reverse mouse',
        },
      },
      sound: {
        musicVolume: {
          label: 'Music',
        },
        soundFxVolume: {
          label: 'Sound FX',
        },
        unitsSpeechVolume: {
          label: 'Units speech',
        },
        buildingsSpeechVolume: {
          label: 'Buildings speech',
        },
        interfaceVolume: {
          label: 'Interface',
        },
        environmentalVolume: {
          label: 'Environmental sounds',
        },
        soundtrack: {
          label: 'Soundtrack',
        },
        dontPlayProductionMessages: {
          label: 'Don\'t play production messages',
        },
        swapChannels: {
          label: 'Swap channels',
        },
        videoDoubleSized: {
          label: 'Video double size',
        },
        videoSubtitles: {
          label: 'Video subtitles',
        },
      },
    },
    shortcuts: {
      header: 'Shortcuts',
      fields: {
        name: {
          label: 'Command name',
        },
        key: {
          label: 'Bound key',
        },
        showInTooltip: {
          label: 'Show tooltip',
        },
      },
      edit: {
        currentShortcut: 'Current shortcut',
        newShortcut: 'New shortcut',
        unbound: 'Unbound',
        accept: 'Accept',
        discard: 'Discard',
        none: 'None',
        modifierKey: 'Modifier key',
        boundKey: 'Bound key',
        set: 'SET',
      },
    },
    otherSettings: {
      header: 'Unknown parameters',
      warning: 'Parameters below are unknown. Altering them may break something in your profile. Some of the parameters (for example: unknown collection values) are almost certainly just some serialization artifacts and are ignored in game.',
      unknownCollectionValue: {
        label: 'Unknown collection value',
      },
      unknownCollectionValue2: {
        label: 'Unknown collection value 2',
      },
      unknownCollectionValue3: {
        label: 'Unknown collection value 3',
      },
      unknownCollectionValue4: {
        label: 'Unknown collection value 4',
      },
      unknownCollectionValue5: {
        label: 'Unknown collection value 5',
      },
      unknownCollectionValue6: {
        label: 'Unknown collection value 6',
      },
      unknownGuid: {
        label: 'Unknown GUID',
      },
      unknownString: {
        label: 'Unknown string',
      },
      unknownValue: {
        label: 'Unknown value',
      },
      unknownValue2: {
        label: 'Unknown value 2',
      },
      unknownValues: {
        label: 'Unknown values',
      },
      noValues: 'No values',
    },
  },
  enums: {
    profileType: {
      ED: 'ED campaign',
      UCS: 'UCS campaign',
      LC: 'LC campaign',
      SnN: 'Skirmish & Network',
    },
    shieldType: {
      None: 'None',
      Small: 'Small',
      Medium: 'Medium',
      Large: 'Large',
    },
    fogOfWarType: {
      Black: 'Black',
      Environmental: 'Environmental',
    },
    panelPosition: {
      Top: 'Top',
      Bottom: 'Bottom',
      Left: 'Left',
      Right: 'Right',
    },
    toolbarPosition: {
      Top: 'Top',
      Bottom: 'Bottom',
    },
    mapPosition: {
      TopLeft: 'Top/Left',
      BottomRight: 'Bottom/Right',
    },
    selectionShape: {
      Square: 'Square',
      Isometric: 'Isometric',
    },
    descriptionType: {
      Normal: 'Normal',
      Tooltip: 'Tooltip',
    },
    screenInfo: {
      None: 'None',
      Clock: 'Clock',
      Temperature: 'Temperature',
    },
    dikKeys: {
      Escape: 'Escape',
      D1: '1',
      D2: '2',
      D3: '3',
      D4: '4',
      D5: '5',
      D6: '6',
      D7: '7',
      D8: '8',
      D9: '9',
      D0: '0',
      Minus: '-',
      Equals: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      Q: 'Q',
      W: 'W',
      E: 'E',
      R: 'R',
      T: 'T',
      Y: 'Y',
      U: 'U',
      I: 'I',
      O: 'O',
      P: 'P',
      LeftBracket: '[',
      RightBracket: ']',
      Enter: 'Enter',
      LeftControl: 'Ctrl',
      A: 'A',
      S: 'S',
      D: 'D',
      F: 'F',
      G: 'G',
      H: 'H',
      J: 'J',
      K: 'K',
      L: 'L',
      Semicolon: ';',
      Apostrophe: '\'',
      Grave: '`',
      LeftShift: 'Shift',
      Backslash: '\\',
      Z: 'Z',
      X: 'X',
      C: 'C',
      V: 'V',
      B: 'B',
      N: 'N',
      M: 'M',
      Comma: ',',
      Period: '.',
      Slash: '/',
      RightShift: 'Shift',
      NumpadMultiply: 'Num *',
      LeftAlt: 'Alt',
      Space: 'Space',
      CapsLock: 'Caps Lock',
      F1: 'F1',
      F2: 'F2',
      F3: 'F3',
      F4: 'F4',
      F5: 'F5',
      F6: 'F6',
      F7: 'F7',
      F8: 'F8',
      F9: 'F9',
      F10: 'F10',
      NumLock: 'Num Lock',
      ScrollLock: 'Scroll Lock',
      Numpad7: 'Num 7',
      Numpad8: 'Num 8',
      Numpad9: 'Num 9',
      NumpadMinus: 'Num -',
      Numpad4: 'Num 4',
      Numpad5: 'Num 5',
      Numpad6: 'Num 6',
      NumpadPlus: 'Num +',
      Numpad1: 'Num 1',
      Numpad2: 'Num 2',
      Numpad3: 'Num 3',
      Numpad0: 'Num 0',
      NumpadPeriod: 'Num .',
      F11: 'F11',
      F12: 'F12',
      F13: 'F13',
      F14: 'F14',
      F15: 'F15',
      Kana: 'Kana',
      Convert: 'Convert',
      NoConvert: 'No Convert',
      Yen: '¥',
      NumpadEquals: 'Num =',
      Circumflex: '^',
      At: '@',
      Colon: ':',
      Underline: '_',
      Kanji: 'Kanji',
      Stop: 'Stop',
      AX: 'AX',
      Unlabeled: 'Unlabeled',
      NumpadEnter: 'Num Enter',
      RightControl: 'Right Ctrl',
      NumpadDivide: 'Num /',
      SysRq: 'SysRq',
      RightAlt: 'Right Alt',
      Pause: 'Pause',
      Home: 'Home',
      UpArrow: '↑',
      PageUp: 'Page Up',
      LeftArrow: '←',
      RightArrow: '→',
      End: 'End',
      DownArrow: '↓',
      PageDown: 'Page Down',
      Insert: 'Insert',
      Delete: 'Delete',
      LeftWindows: 'Win',
      RightWindows: 'Right Win',
      Menu: 'Menu',
      Power: 'Power',
      Sleep: 'Sleep',
    },
    commands: {
      C000: 'Camera left',
      C001: 'Camera right',
      C002: 'Camera up',
      C003: 'Camera down',
      C004: 'Camera zoom in',
      C005: 'Camera zoom out',
      C006: 'Camera angle up',
      C007: 'Camera angle down',
      C008: 'Camera rotate left',
      C009: 'Camera rotate right',
      C010: 'Save current game',
      C011: 'Load game',
      C012: 'Quick save current game',
      C013: 'Open construction dialog',
      C014: 'Open research dialog',
      C015: 'Open change weapon dialog',
      C016: 'Open alliance dialog',
      C017: 'Open \'Give money to ally\' dialog',
      C018: 'Show power network',
      C019: 'Show command selection on/off',
      C020: 'Show command markers on/off',
      C021: 'Show tunnel selection on/off',
      C022: 'Show last event place',
      C023: 'Follow object on/off',
      C024: 'Show selected unit',
      C025: 'Select next object of the same kind (EarthExtensions)',
      C026: 'Compass to North',
      C027: 'Pause',
      C028: 'Increase game speed',
      C029: 'Decrease game speed',
      C030: 'Default game speed',
      C031: 'Record command',
      C032: 'Quick record',
      C033: 'Repeat commands',
      C034: 'Execute command list',
      C035: 'Create group 1',
      C036: 'Create group 2',
      C037: 'Create group 3',
      C038: 'Create group 4',
      C039: 'Create group 5',
      C040: 'Create group 6',
      C041: 'Create group 7',
      C042: 'Create group 8',
      C043: 'Create group 9',
      C044: 'Create group 10',
      C045: 'Select group 1',
      C046: 'Select group 2',
      C047: 'Select group 3',
      C048: 'Select group 4',
      C049: 'Select group 5',
      C050: 'Select group 6',
      C051: 'Select group 7',
      C052: 'Select group 8',
      C053: 'Select group 9',
      C054: 'Select group 10',
      C055: 'Toggle power (EarthExtensions)',
      C056: 'Sell building (EarthExtensions)',
      C057: 'Select next idle builder (EarthExtensions)',
      C058: 'Select next idle mining units (EarthExtensions)',
      C059: '[Demo replay] Toggle FOW (EarthExtensions)',
      C060: '[Demo replay] Switch to next player (EarthExtensions)',
      C061: 'Select platoon 7',
      C062: 'Select platoon 8',
      C063: 'Select platoon 9',
      C064: 'Select platoon 10',
      C065: 'Add unit to special tab',
      C066: 'Remove unit from special tab',
      C067: 'Select all visible units',
      C068: 'Select all visible air support units (EarthExtensions)',
      C069: 'Select all visible air military units (EarthExtensions)',
      C070: 'Select all visible ground military units (EarthExtensions)',
      C071: 'Select all visible ground support units (EarthExtensions)',
      C072: 'Toggle map',
      C073: 'Toggle panel',
      C074: 'Toggle tunnels',
      C075: '(Single Player) Next map',
      C076: '(Single Player) Go to mission map',
      C077: '(Single Player) Go to main base map',
      C078: '(Single Player) Go to base 1 map',
      C079: '(Single Player) Go to base 2 map',
      C080: 'View mode',
      C081: 'Select Selection tab',
      C082: 'Select Build tab',
      C083: 'Select Buildings tab',
      C084: 'Select Platoons tab',
      C085: 'Select Units tab',
      C086: 'Rotate building',
      C087: 'Next panel tab',
      C088: 'Next builder/production tab',
      C089: 'Scroll prev. Horizontal list',
      C090: 'Scroll next horizontal list',
      C091: 'Scroll prev. Vertical list',
      C092: 'Scroll next vertical list',
      C093: 'Draw waynode net',
      C094: 'Create terrain marker 1',
      C095: 'Create terrain marker 2',
      C096: 'Create terrain marker 3',
      C097: 'Create terrain marker 4',
      C098: 'Create terrain marker 5',
      C099: 'Create terrain marker 6',
      C100: 'Create terrain marker 7',
      C101: 'Create terrain marker 8',
      C102: 'Create terrain marker 9',
      C103: 'Create terrain marker 10',
      C104: 'Select terrain marker 1',
      C105: 'Select terrain marker 2',
      C106: 'Select terrain marker 3',
      C107: 'Select terrain marker 4',
      C108: 'Select terrain marker 5',
      C109: 'Select terrain marker 6',
      C110: 'Select terrain marker 7',
      C111: 'Select terrain marker 8',
      C112: 'Select terrain marker 9',
      C113: 'Select terrain marker 10',
      C114: 'Attack',
      C115: 'Escort',
      C116: 'Hold position',
      C117: 'Stop',
      C118: 'Supply request',
      C119: 'Fly reload ammo',
      C120: 'Set lights',
      C121: 'Keep formation',
      C122: 'Create platoon',
      C123: 'Mine',
      C124: 'Ditch',
      C125: 'Flatten',
      C126: 'Narrow bridge',
      C127: 'Wide bridge',
      C128: 'Narrow tunnel',
      C129: 'Wide tunnel',
      C130: 'Wall',
      C131: 'Repairer - upgrade units',
      C132: 'Unit Transporter - place unit',
      C133: 'Unit Transporter - place unit at location',
      C134: 'Unit Transporter - drop unit',
      C135: 'Unit Transporter - drop unit at location',
      C136: 'Unit Transporter - set pickup point',
      C137: 'Unit Transporter - show pickup point',
      C138: 'Unit Transporter - set placement point',
      C139: 'Unit Transporter - show placement point',
      C140: 'Change unit script',
      C141: 'Super attack',
      C142: 'Upgrade',
      C143: 'Call units transporter',
      C144: 'Set building assembly point',
      C145: 'Show building assembly point',
      C146: 'Set production mode',
      C147: '(Single Player) Unload mission transporter',
      C148: '(Single Player) Move transporter to mission',
      C149: '(Single Player) Move transporter to main base',
      C150: '(Single Player) Move transporter to base 1',
      C151: '(Single Player) Move transporter to base 2',
      C152: 'Add unit to platoon',
      C153: 'Remove unit from platoon',
      C154: 'Disperse platoon',
      C155: 'Rotate platoon left',
      C156: 'Rotate platoon right',
      C157: 'Build Power Plant',
      C158: 'Build Energy Transmitter',
      C159: 'Build Energy Battery',
      C160: 'Build Vehicle Production Center',
      C161: 'Build Weapons Production Center',
      C162: 'Build Shipyard',
      C163: 'Build Supply Depot',
      C164: 'Build Mine',
      C165: 'Build Refinery',
      C166: '(Single Player) Build Resource Transport Base',
      C167: 'Build Research Center',
      C168: 'Build Command Center',
      C169: 'Build Missile Control Center',
      C170: 'Build Plasma Control Center',
      C171: 'Build Teleport',
      C172: 'Build SDI',
      C173: 'Build Shadow Tower',
      C174: 'Build Radar',
      C175: 'Build WCC',
      C176: 'Build Tunnel Enterance',
      C177: '(Single Player) Build Transport Center',
      C178: 'Build Recycling Center',
      C179: 'Build Small Tower',
      C180: 'Build Medium Tower',
      C181: 'Build Big Tower',
      C182: 'Build Laser Wall',
      C183: '(Map Editor) New map',
      C184: '(Map Editor) Save',
      C185: '(Map Editor) Save as',
      C186: '(Map Editor) Open',
      C187: '(Map Editor) Properties',
      C188: '(Map Editor) Set time to midday',
      C189: '(Map Editor) Set time to evening',
      C190: '(Map Editor) Set time to midnight',
      C191: '(Map Editor) Set time to morning',
      C192: '(Map Editor) Previous brush',
      C193: '(Map Editor) Next brush',
      C194: '(Map Editor) Set trash on/off',
      C195: '(Map Editor) Select flat average brush',
      C196: '(Map Editor) Select random sin brush',
      C197: '(Map Editor) Select cone brush',
      C198: '(Map Editor) Select flat brush',
      C199: '(Map Editor) Select minmax brush',
      C200: '(Map Editor) Select average brush',
      C201: '(Map Editor) Select enlarge differences brush',
      C202: '(Map Editor) Select altitudes mode',
      C203: '(Map Editor) Select terrain mode',
      C204: '(Map Editor) Select resource mode',
      C205: '(Map Editor) Normalize all',
      C206: '(Map Editor) Update all',
      C207: '(Map Editor) Zero level all',
      C208: '(Map Editor) Range up',
      C209: '(Map Editor) Range down',
    }
  },
};