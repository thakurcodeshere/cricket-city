// ============================================
// CRICKET CITY — Building Generator (BEAST MODE)
// Country-specific architecture, animated windows,
// billboards, hover effects, construction cranes
// ============================================

import * as THREE from 'three';
import { getTotalMatches, getTotalRuns, getTotalWickets, PLAYER_ROLES } from '../data/players.js';

// Country-specific architecture colors
const COUNTRY_STYLES = {
  'India':        { wall: 0x1A2A4A, accent: 0xFF9933, glass: 0x2A4A7A, roofStyle: 'dome' },
  'Australia':    { wall: 0x2A3A2A, accent: 0xFFCD00, glass: 0x3A5A3A, roofStyle: 'modern' },
  'England':      { wall: 0x2A2A3A, accent: 0x003078, glass: 0x3A3A5A, roofStyle: 'clock' },
  'West Indies':  { wall: 0x3A1A1A, accent: 0x7B2D26, glass: 0x5A2A2A, roofStyle: 'tropical' },
  'Sri Lanka':    { wall: 0x2A2A1A, accent: 0x8B6914, glass: 0x4A4A2A, roofStyle: 'temple' },
  'South Africa': { wall: 0x1A2A1A, accent: 0x007A4D, glass: 0x2A4A2A, roofStyle: 'modern' },
  'Pakistan':     { wall: 0x1A2A1A, accent: 0x01411C, glass: 0x2A4A2A, roofStyle: 'minaret' },
};

const ROLE_COLORS = {
  [PLAYER_ROLES.BATTER]:     { base: 0x2A3A5C, accent: 0xd4a843, window: 0xffeaa7 },
  [PLAYER_ROLES.BOWLER]:     { base: 0x3A1A1A, accent: 0xe74c3c, window: 0xff7675 },
  [PLAYER_ROLES.ALLROUNDER]: { base: 0x1A2A4A, accent: 0x3498db, window: 0x74b9ff },
  [PLAYER_ROLES.WK_BATTER]:  { base: 0x2A1A3A, accent: 0x9b59b6, window: 0xbb6bd9 },
};

function getColors(player) {
  const role = ROLE_COLORS[player.role] || ROLE_COLORS[PLAYER_ROLES.BATTER];
  const country = COUNTRY_STYLES[player.country] || COUNTRY_STYLES['India'];
  return { ...role, ...country };
}

export function createPlayerBuilding(player) {
  const group = new THREE.Group();
  const colors = getColors(player);
  const totalMatches = getTotalMatches(player);
  const totalRuns = getTotalRuns(player);
  const totalWickets = getTotalWickets(player);

  const floorCount = Math.min(Math.ceil(totalMatches / 25), 22);
  const floorHeight = 1.4;
  const totalHeight = floorCount * floorHeight;

  const baseWidth = 2.2 + Math.min(totalRuns / 8000, 1.8);
  const baseDepth = 2.0 + Math.min(totalWickets / 200, 1.2);

  buildSkyscraper(group, colors, floorCount, floorHeight, baseWidth, baseDepth, player);

  // Name label
  const nameLabel = createTextSprite(player.name, colors.accent, 'bold 44px');
  nameLabel.position.set(0, totalHeight + 4.5, 0);
  nameLabel.scale.set(6, 1.5, 1);
  group.add(nameLabel);

  // Country + stats sublabel
  const statText = player.role === PLAYER_ROLES.BOWLER
    ? `${player.flag} ${totalWickets} WKT`
    : `${player.flag} ${totalRuns.toLocaleString()} RUNS`;
  const subLabel = createTextSprite(statText, 0xaaaaaa, 'bold 32px');
  subLabel.position.set(0, totalHeight + 3, 0);
  subLabel.scale.set(5, 1.2, 1);
  group.add(subLabel);

  group.userData = { playerId: player.id, playerData: player };

  // Store metadata for animations
  group.userData.animData = {
    windowMeshes: [],
    totalHeight,
    floorCount
  };

  return group;
}

function buildSkyscraper(group, colors, floors, fh, width, depth, player) {
  const w = Math.min(width, 5);
  const d = Math.min(depth, 4.5);

  for (let i = 0; i < floors; i++) {
    const y = i * fh;
    const isRecord = player.matches && player.matches[i] && player.matches[i].isRecord;
    const taper = 1 - i * 0.006;
    const tw = w * taper;
    const td = d * taper;

    // Main floor slab
    const floorGeo = new THREE.BoxGeometry(tw, fh * 0.78, td);
    const floorMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? colors.wall : darken(colors.wall, 0.06),
      roughness: 0.35,
      metalness: 0.55
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, y + fh * 0.39, 0);
    floorMesh.castShadow = true;
    floorMesh.receiveShadow = true;
    group.add(floorMesh);

    // Glass windows with random glow
    addWindows(group, tw, td, y + fh * 0.35, fh * 0.42, colors, isRecord, i);

    // Floor separator — accent line
    const sepGeo = new THREE.BoxGeometry(tw + 0.12, 0.05, td + 0.12);
    const sepMat = new THREE.MeshStandardMaterial({
      color: colors.accent, roughness: 0.2, metalness: 0.8,
      emissive: colors.accent, emissiveIntensity: 0.12
    });
    const sep = new THREE.Mesh(sepGeo, sepMat);
    sep.position.set(0, y + fh * 0.8, 0);
    group.add(sep);

    // Balcony every 2 floors
    if (i > 0 && i % 2 === 0) {
      addBalcony(group, tw, td, y, colors);
    }

    // Record floor — golden glow ring
    if (isRecord) {
      addRecordGlow(group, tw, td, y + fh * 0.8);
    }
  }

  // LED Billboard on one face (shows career highlight)
  addBillboard(group, w, d, floors, fh, player, colors);

  // Rooftop (country-specific style)
  addRooftop(group, w, d, floors, fh, colors, player);

  // Base platform
  addBasePlatform(group, w + 1.5, d + 1.5, colors);
}

function addWindows(group, w, d, y, size, colors, isRecord, floorIdx) {
  const windowH = size * 0.6;
  const windowW = 0.45;
  const emissive = isRecord ? 0.5 : (0.08 + Math.random() * 0.2);
  const windowColor = isRecord ? 0xffeaa7 : colors.window;

  const windowMat = new THREE.MeshStandardMaterial({
    color: colors.glass,
    emissive: windowColor,
    emissiveIntensity: emissive,
    roughness: 0.08,
    metalness: 0.65,
    transparent: true,
    opacity: 0.88
  });

  const countW = Math.max(2, Math.floor(w / 0.85));
  for (let i = 0; i < countW; i++) {
    const wx = (i - (countW - 1) / 2) * 0.75;

    // Front
    const wf = new THREE.Mesh(new THREE.PlaneGeometry(windowW, windowH), windowMat.clone());
    wf.position.set(wx, y, d / 2 + 0.01);
    wf.userData = { isWindow: true, floorIdx };
    // Random window brightness
    wf.material.emissiveIntensity = isRecord ? 0.5 : (0.05 + Math.random() * 0.35);
    group.add(wf);

    // Back
    const wb = new THREE.Mesh(new THREE.PlaneGeometry(windowW, windowH), windowMat.clone());
    wb.position.set(wx, y, -d / 2 - 0.01);
    wb.rotation.y = Math.PI;
    wb.userData = { isWindow: true, floorIdx };
    wb.material.emissiveIntensity = isRecord ? 0.5 : (0.05 + Math.random() * 0.35);
    group.add(wb);
  }

  // Side windows
  const countD = Math.max(1, Math.floor(d / 1.0));
  for (let i = 0; i < countD; i++) {
    const wz = (i - (countD - 1) / 2) * 0.8;

    const wl = new THREE.Mesh(new THREE.PlaneGeometry(windowW, windowH), windowMat.clone());
    wl.position.set(-w / 2 - 0.01, y, wz);
    wl.rotation.y = -Math.PI / 2;
    wl.userData = { isWindow: true };
    wl.material.emissiveIntensity = isRecord ? 0.5 : (0.05 + Math.random() * 0.35);
    group.add(wl);

    const wr = new THREE.Mesh(new THREE.PlaneGeometry(windowW, windowH), windowMat.clone());
    wr.position.set(w / 2 + 0.01, y, wz);
    wr.rotation.y = Math.PI / 2;
    wr.userData = { isWindow: true };
    wr.material.emissiveIntensity = isRecord ? 0.5 : (0.05 + Math.random() * 0.35);
    group.add(wr);
  }
}

function addBalcony(group, w, d, y, colors) {
  const balcGeo = new THREE.BoxGeometry(w + 0.8, 0.1, d + 0.8);
  const balcMat = new THREE.MeshStandardMaterial({
    color: colors.accent, roughness: 0.3, metalness: 0.7
  });
  const balc = new THREE.Mesh(balcGeo, balcMat);
  balc.position.set(0, y, 0);
  balc.castShadow = true;
  group.add(balc);

  // Glass railings (all sides)
  const railMat = new THREE.MeshStandardMaterial({
    color: 0x88AACC, transparent: true, opacity: 0.25,
    roughness: 0.08, metalness: 0.85, side: THREE.DoubleSide
  });

  // Front & back
  const railFB = new THREE.PlaneGeometry(w + 0.6, 0.35);
  [{ z: (d + 0.8) / 2 }, { z: -(d + 0.8) / 2 }].forEach(pos => {
    const rail = new THREE.Mesh(railFB, railMat);
    rail.position.set(0, y + 0.22, pos.z);
    group.add(rail);
  });

  // Left & right
  const railLR = new THREE.PlaneGeometry(d + 0.6, 0.35);
  [{ x: -(w + 0.8) / 2 }, { x: (w + 0.8) / 2 }].forEach(pos => {
    const rail = new THREE.Mesh(railLR, railMat);
    rail.position.set(pos.x, y + 0.22, 0);
    rail.rotation.y = Math.PI / 2;
    group.add(rail);
  });
}

function addRecordGlow(group, w, d, y) {
  const glowGeo = new THREE.BoxGeometry(w + 0.35, 0.06, d + 0.35);
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffeaa7, emissive: 0xffeaa7, emissiveIntensity: 0.6,
    roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.8
  });
  group.add(new THREE.Mesh(glowGeo, glowMat).translateY(y));

  // Small point light for the glow
  const pl = new THREE.PointLight(0xffeaa7, 0.15, 5);
  pl.position.set(0, y, 0);
  group.add(pl);
}

function addBillboard(group, w, d, floors, fh, player, colors) {
  if (floors < 3) return;

  const billboardY = Math.floor(floors * 0.6) * fh;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 128;

  // Billboard background
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 0, 256, 128);

  // Border
  const accentHex = '#' + new THREE.Color(colors.accent).getHexString();
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, 252, 124);

  // Player name
  ctx.fillStyle = '#f0ece3';
  ctx.font = 'bold 22px "Outfit", Arial';
  ctx.textAlign = 'center';
  ctx.fillText(player.name.split(' ').pop().toUpperCase(), 128, 35);

  // Career highlight stat
  ctx.fillStyle = accentHex;
  ctx.font = 'bold 36px "Bebas Neue", Arial';
  const mainStat = player.role === PLAYER_ROLES.BOWLER
    ? `${getTotalWickets(player)} WKT`
    : `${getTotalRuns(player).toLocaleString()} RUNS`;
  ctx.fillText(mainStat, 128, 75);

  // "CAREER" label
  ctx.fillStyle = '#5a6270';
  ctx.font = '12px "Outfit", Arial';
  ctx.fillText('CAREER TOTAL', 128, 105);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const bbGeo = new THREE.PlaneGeometry(w * 0.8, w * 0.4);
  const bbMat = new THREE.MeshStandardMaterial({
    map: texture, emissive: 0xffffff, emissiveIntensity: 0.1,
    emissiveMap: texture, roughness: 0.3, metalness: 0.5
  });

  const bb = new THREE.Mesh(bbGeo, bbMat);
  bb.position.set(0, billboardY + fh * 0.4, d / 2 + 0.05);
  group.add(bb);
}

function addRooftop(group, w, d, floors, fh, colors, player) {
  const topY = floors * fh;

  // Roof platform
  const roofGeo = new THREE.BoxGeometry(w + 0.4, 0.18, d + 0.4);
  const roofMat = new THREE.MeshStandardMaterial({
    color: darken(colors.wall, 0.15), roughness: 0.5, metalness: 0.6
  });
  group.add(new THREE.Mesh(roofGeo, roofMat).translateY(topY + 0.09));

  // Spire / antenna
  const spireH = 2.5 + floors * 0.15;
  const spireGeo = new THREE.CylinderGeometry(0.04, 0.12, spireH, 6);
  const spireMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.9, roughness: 0.2 });
  group.add(new THREE.Mesh(spireGeo, spireMat).translateY(topY + spireH / 2 + 0.18));

  // Beacon light
  const beaconGeo = new THREE.SphereGeometry(0.18, 8, 8);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: colors.accent, emissive: colors.accent, emissiveIntensity: 0.8, roughness: 0.1
  });
  group.add(new THREE.Mesh(beaconGeo, beaconMat).translateY(topY + spireH + 0.3));

  // Role-specific decoration
  if (player.role === PLAYER_ROLES.BATTER || player.role === PLAYER_ROLES.WK_BATTER) {
    // Cricket bat
    const batGeo = new THREE.CylinderGeometry(0.1, 0.16, 1.8, 6);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.7, metalness: 0.2 });
    const bat = new THREE.Mesh(batGeo, batMat);
    bat.position.set(0.5, topY + 1.1, 0);
    bat.rotation.z = Math.PI / 6;
    group.add(bat);

    // WK Glove
    if (player.role === PLAYER_ROLES.WK_BATTER) {
      const gloveGeo = new THREE.SphereGeometry(0.25, 8, 8);
      const gloveMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.6 });
      const glove = new THREE.Mesh(gloveGeo, gloveMat);
      glove.position.set(-0.5, topY + 0.6, 0.5);
      group.add(glove);
    }
  } else if (player.role === PLAYER_ROLES.BOWLER) {
    // Cricket ball
    const ballGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xCC2222, roughness: 0.4, metalness: 0.3,
      emissive: 0xCC2222, emissiveIntensity: 0.1
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(0.4, topY + 0.6, 0.4);
    group.add(ball);

    // Seam ring on ball
    const seamGeo = new THREE.TorusGeometry(0.35, 0.03, 8, 16);
    const seamMat = new THREE.MeshStandardMaterial({ color: 0xffeaa7, roughness: 0.5 });
    const seam = new THREE.Mesh(seamGeo, seamMat);
    seam.position.copy(ball.position);
    seam.rotation.x = Math.PI / 4;
    group.add(seam);
  } else if (player.role === PLAYER_ROLES.ALLROUNDER) {
    // Both bat + ball on rooftop
    const batGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 6);
    const batMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.7 });
    const bat = new THREE.Mesh(batGeo, batMat);
    bat.position.set(-0.4, topY + 0.8, 0);
    bat.rotation.z = Math.PI / 8;
    group.add(bat);

    const ballGeo = new THREE.SphereGeometry(0.22, 12, 12);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xCC2222, emissive: 0xCC2222, emissiveIntensity: 0.05 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(0.4, topY + 0.45, 0.3);
    group.add(ball);
  }

  // Country flag colors on rooftop edge
  const flagGeo = new THREE.BoxGeometry(w + 0.5, 0.08, 0.15);
  const flagMat = new THREE.MeshStandardMaterial({
    color: colors.accent, emissive: colors.accent, emissiveIntensity: 0.2
  });
  const flag = new THREE.Mesh(flagGeo, flagMat);
  flag.position.set(0, topY + 0.22, d / 2 + 0.15);
  group.add(flag);
}

function addBasePlatform(group, w, d, colors) {
  // Main base
  const baseGeo = new THREE.BoxGeometry(w, 0.35, d);
  const baseMat = new THREE.MeshStandardMaterial({
    color: darken(colors.wall, 0.3), roughness: 0.6, metalness: 0.4
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, 0.175, 0);
  base.receiveShadow = true;
  group.add(base);

  // Glowing accent edge
  const edgeGeo = new THREE.BoxGeometry(w + 0.12, 0.05, d + 0.12);
  const edgeMat = new THREE.MeshStandardMaterial({
    color: colors.accent, emissive: colors.accent, emissiveIntensity: 0.35,
    roughness: 0.2, metalness: 0.9
  });
  group.add(new THREE.Mesh(edgeGeo, edgeMat).translateY(0.38));

  // Broader secondary base
  const base2Geo = new THREE.BoxGeometry(w + 0.6, 0.12, d + 0.6);
  const base2Mat = new THREE.MeshStandardMaterial({
    color: darken(colors.wall, 0.4), roughness: 0.8, metalness: 0.3
  });
  const base2 = new THREE.Mesh(base2Geo, base2Mat);
  base2.position.set(0, 0.06, 0);
  base2.receiveShadow = true;
  group.add(base2);
}

function createTextSprite(text, color, fontSpec = 'bold 42px') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 128;
  ctx.clearRect(0, 0, 512, 128);
  ctx.font = `${fontSpec} "Bebas Neue", Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  const hex = '#' + new THREE.Color(color).getHexString();
  ctx.fillStyle = hex;
  ctx.fillText(text, 256, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
}

function darken(hex, amount) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, -amount);
  return c.getHex();
}

// City layout algorithm
export function calculateCityLayout(players) {
  const positions = [];
  const spacing = 9;
  const playersPerRow = Math.ceil(Math.sqrt(players.length));
  players.forEach((player, i) => {
    const row = Math.floor(i / playersPerRow);
    const col = i % playersPerRow;
    const x = (col - playersPerRow / 2) * spacing;
    const z = (row - Math.ceil(players.length / playersPerRow) / 2) * spacing;
    const jx = (Math.random() - 0.5) * 2;
    const jz = (Math.random() - 0.5) * 2;
    positions.push(new THREE.Vector3(x + jx, 0, z + jz));
  });
  return positions;
}
