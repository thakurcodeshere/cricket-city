// ============================================
// CRICKET CITY — Time-of-Day Theme System
// Morning / Afternoon / Evening / Night
// ============================================

import * as THREE from 'three';

export const THEMES = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night'
};

const THEME_CONFIGS = {
  [THEMES.MORNING]: {
    label: '☀️ Morning',
    sky: new THREE.Color(0x87CEEB),
    skyGradientTop: new THREE.Color(0x4A90D9),
    skyGradientBottom: new THREE.Color(0xFFE4B5),
    fog: new THREE.Color(0xC5D8E8),
    fogDensity: 0.004,
    ambient: { color: 0xB4D7FF, intensity: 0.7 },
    directional: { color: 0xFFEDD5, intensity: 1.0, position: { x: 40, y: 25, z: 30 } },
    secondary: { color: 0x87CEEB, intensity: 0.4 },
    hemisphere: { skyColor: 0x87CEEB, groundColor: 0x2d6b44, intensity: 0.5 },
    windowGlow: 0.05,
    floodlightIntensity: 0.3,
    groundColor: 0x1a6b30,
    exposure: 1.2,
    cssClass: 'theme-morning'
  },
  [THEMES.AFTERNOON]: {
    label: '🌤️ Afternoon',
    sky: new THREE.Color(0x4A90D9),
    skyGradientTop: new THREE.Color(0x2065B0),
    skyGradientBottom: new THREE.Color(0x87CEEB),
    fog: new THREE.Color(0x6A9FCA),
    fogDensity: 0.003,
    ambient: { color: 0xFFFFFF, intensity: 0.8 },
    directional: { color: 0xFFF5E0, intensity: 1.4, position: { x: 10, y: 50, z: 15 } },
    secondary: { color: 0xD4E6F1, intensity: 0.5 },
    hemisphere: { skyColor: 0x4A90D9, groundColor: 0x2d6b44, intensity: 0.6 },
    windowGlow: 0.02,
    floodlightIntensity: 0.1,
    groundColor: 0x1a8035,
    exposure: 1.4,
    cssClass: 'theme-afternoon'
  },
  [THEMES.EVENING]: {
    label: '🌆 Evening',
    sky: new THREE.Color(0x1A0A2E),
    skyGradientTop: new THREE.Color(0x0D0521),
    skyGradientBottom: new THREE.Color(0xFF6B35),
    fog: new THREE.Color(0x1A1025),
    fogDensity: 0.006,
    ambient: { color: 0xFF8C42, intensity: 0.4 },
    directional: { color: 0xFF6B35, intensity: 0.8, position: { x: -40, y: 8, z: 30 } },
    secondary: { color: 0x4A2080, intensity: 0.3 },
    hemisphere: { skyColor: 0xFF6B35, groundColor: 0x0e2a18, intensity: 0.35 },
    windowGlow: 0.4,
    floodlightIntensity: 1.5,
    groundColor: 0x122518,
    exposure: 0.9,
    cssClass: 'theme-evening'
  },
  [THEMES.NIGHT]: {
    label: '🌙 Night',
    sky: new THREE.Color(0x050a0e),
    skyGradientTop: new THREE.Color(0x020508),
    skyGradientBottom: new THREE.Color(0x0a1520),
    fog: new THREE.Color(0x050a0e),
    fogDensity: 0.008,
    ambient: { color: 0x1a2a3a, intensity: 0.4 },
    directional: { color: 0xffeaa7, intensity: 1.2, position: { x: 30, y: 50, z: 20 } },
    secondary: { color: 0xf8f9fa, intensity: 0.6 },
    hemisphere: { skyColor: 0x0a1a2a, groundColor: 0x0e2a18, intensity: 0.3 },
    windowGlow: 0.6,
    floodlightIntensity: 2.0,
    groundColor: 0x0e2a18,
    exposure: 0.8,
    cssClass: 'theme-night'
  }
};

export class TimeTheme {
  constructor() {
    this.currentTheme = null;
    this.isAuto = true;
    this.onThemeChange = null;
  }

  detectTimeTheme() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return THEMES.MORNING;
    if (hour >= 12 && hour < 17) return THEMES.AFTERNOON;
    if (hour >= 17 && hour < 20) return THEMES.EVENING;
    return THEMES.NIGHT;
  }

  getThemeConfig(themeName) {
    return THEME_CONFIGS[themeName] || THEME_CONFIGS[THEMES.NIGHT];
  }

  getCurrentConfig() {
    return this.getThemeConfig(this.currentTheme);
  }

  init() {
    this.currentTheme = this.detectTimeTheme();
    this.applyCSS(this.currentTheme);
    return this.currentTheme;
  }

  setTheme(themeName) {
    if (themeName === 'auto') {
      this.isAuto = true;
      this.currentTheme = this.detectTimeTheme();
    } else {
      this.isAuto = false;
      this.currentTheme = themeName;
    }
    this.applyCSS(this.currentTheme);
    if (this.onThemeChange) {
      this.onThemeChange(this.currentTheme, this.getThemeConfig(this.currentTheme));
    }
  }

  applyCSS(themeName) {
    // Remove all theme classes
    document.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
    const config = this.getThemeConfig(themeName);
    document.body.classList.add(config.cssClass);
  }

  getAllThemes() {
    return Object.entries(THEME_CONFIGS).map(([key, val]) => ({
      id: key,
      label: val.label
    }));
  }
}
