// ============================================
// CRICKET CITY — World Map System (BEAST MODE)
// Animated ocean, 24 nations, pulses, connections,
// country info, zoom, ICC rankings
// ============================================

import * as THREE from 'three';

// ALL ICC member nations — Full Members
const FULL_MEMBERS = {
  'India':        { x: 28, z: -8,  label: '🇮🇳 India',          color: 0xFF9933, icc: 'Full', rank: { test: 1, odi: 2, t20: 1 }, founded: 1932, homeGround: 'Wankhede Stadium, Mumbai', worldCups: ['1983', '2011'] },
  'Australia':    { x: 48, z: 18,  label: '🇦🇺 Australia',      color: 0xFFCD00, icc: 'Full', rank: { test: 2, odi: 1, t20: 5 }, founded: 1905, homeGround: 'MCG, Melbourne', worldCups: ['1987', '1999', '2003', '2007', '2023'] },
  'England':      { x: -2, z: -28, label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',      color: 0x003078, icc: 'Full', rank: { test: 3, odi: 4, t20: 2 }, founded: 1909, homeGround: "Lord's, London", worldCups: ['2019'] },
  'West Indies':  { x: -30, z: -6, label: '🏝️ West Indies',    color: 0x7B2D26, icc: 'Full', rank: { test: 8, odi: 9, t20: 8 }, founded: 1926, homeGround: 'Kensington Oval, Barbados', worldCups: ['1975', '1979'] },
  'Sri Lanka':    { x: 30, z: 2,   label: '🇱🇰 Sri Lanka',      color: 0x8B6914, icc: 'Full', rank: { test: 7, odi: 7, t20: 9 }, founded: 1926, homeGround: 'SSC, Colombo', worldCups: ['1996'] },
  'South Africa': { x: 10, z: 20,  label: '🇿🇦 South Africa',   color: 0x007A4D, icc: 'Full', rank: { test: 4, odi: 3, t20: 4 }, founded: 1909, homeGround: 'Newlands, Cape Town', worldCups: [] },
  'Pakistan':     { x: 24, z: -14, label: '🇵🇰 Pakistan',       color: 0x01411C, icc: 'Full', rank: { test: 6, odi: 6, t20: 3 }, founded: 1952, homeGround: 'Gaddafi Stadium, Lahore', worldCups: ['1992'] },
  'New Zealand':  { x: 60, z: 25,  label: '🇳🇿 New Zealand',    color: 0x1A1A1A, icc: 'Full', rank: { test: 5, odi: 5, t20: 6 }, founded: 1894, homeGround: 'Basin Reserve, Wellington', worldCups: [] },
  'Bangladesh':   { x: 32, z: -6,  label: '🇧🇩 Bangladesh',     color: 0x006A4E, icc: 'Full', rank: { test: 9, odi: 8, t20: 10 }, founded: 1972, homeGround: 'Shere Bangla, Dhaka', worldCups: [] },
  'Zimbabwe':     { x: 8, z: 14,   label: '🇿🇼 Zimbabwe',       color: 0x319C38, icc: 'Full', rank: { test: 10, odi: 11, t20: 12 }, founded: 1992, homeGround: 'Harare Sports Club', worldCups: [] },
  'Afghanistan':  { x: 24, z: -18, label: '🇦🇫 Afghanistan',    color: 0x1C3D5A, icc: 'Full', rank: { test: 11, odi: 10, t20: 7 }, founded: 1995, homeGround: 'Kabul Intl Cricket Stadium', worldCups: [] },
  'Ireland':      { x: -5, z: -30, label: '🇮🇪 Ireland',        color: 0x169B62, icc: 'Full', rank: { test: 12, odi: 12, t20: 11 }, founded: 1855, homeGround: 'Malahide, Dublin', worldCups: [] },
};

// Associate Members
const ASSOCIATE_MEMBERS = {
  'Netherlands':  { x: 0, z: -30,  label: '🇳🇱 Netherlands',    color: 0xFF6600, icc: 'Associate' },
  'Scotland':     { x: -3, z: -32, label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland',      color: 0x003399, icc: 'Associate' },
  'Nepal':        { x: 30, z: -10, label: '🇳🇵 Nepal',           color: 0xDC143C, icc: 'Associate' },
  'UAE':          { x: 20, z: -10, label: '🇦🇪 UAE',             color: 0xC8102E, icc: 'Associate' },
  'Oman':         { x: 19, z: -7,  label: '🇴🇲 Oman',            color: 0xDB161B, icc: 'Associate' },
  'Namibia':      { x: 2, z: 16,   label: '🇳🇦 Namibia',         color: 0x003580, icc: 'Associate' },
  'USA':          { x: -42, z: -18,label: '🇺🇸 USA',             color: 0xB31942, icc: 'Associate' },
  'Canada':       { x: -42, z: -28,label: '🇨🇦 Canada',          color: 0xFF0000, icc: 'Associate' },
  'Kenya':        { x: 12, z: 6,   label: '🇰🇪 Kenya',           color: 0x006600, icc: 'Associate' },
  'Papua New Guinea': { x: 52, z: 8, label: '🇵🇬 PNG',          color: 0xCE1126, icc: 'Associate' },
  'Uganda':       { x: 10, z: 4,   label: '🇺🇬 Uganda',          color: 0xFCDC04, icc: 'Associate' },
  'Hong Kong':    { x: 38, z: -8,  label: '🇭🇰 Hong Kong',      color: 0xDE2910, icc: 'Associate' },
};

const ALL_COUNTRIES = { ...FULL_MEMBERS, ...ASSOCIATE_MEMBERS };

export class WorldMap {
  constructor(scene) {
    this.scene = scene;
    this.mapGroup = new THREE.Group();
    this.countryMarkers = new Map();
    this.playerCountTracker = new Map();
    this.connectionLines = [];
    this.pulseRings = [];
    this.oceanMesh = null;
    this.oceanTime = 0;
    this.cloudLayer = null;
    this.visible = false;
  }

  create() {
    // === ANIMATED OCEAN ===
    this.createOcean();

    // === CONTINENT SHAPES ===
    this.drawContinents();

    // === GRID OVERLAY ===
    const gridGeo = new THREE.PlaneGeometry(180, 120, 36, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x1a3a5c,
      wireframe: true,
      transparent: true,
      opacity: 0.06
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = 0.08;
    this.mapGroup.add(grid);

    // === EQUATOR + TROPICS ===
    this.drawLatitudeLines();

    // === COUNTRY MARKERS ===
    this.createCountryMarkers();

    // === CLOUD LAYER ===
    this.createCloudLayer();

    // === MAP BORDER ===
    const borderGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(182, 122));
    const borderMat = new THREE.LineBasicMaterial({ color: 0xd4a843, transparent: true, opacity: 0.3 });
    const border = new THREE.LineSegments(borderGeo, borderMat);
    border.rotation.x = -Math.PI / 2;
    border.position.y = 0.1;
    this.mapGroup.add(border);

    // === TITLE ===
    const title = this.createLabelSprite('🌍 INTERNATIONAL CRICKET NATIONS', 0xd4a843, 48);
    title.position.set(0, 8, -56);
    title.scale.set(26, 4, 1);
    this.mapGroup.add(title);

    // === LEGEND ===
    this.createLegend();

    this.mapGroup.visible = false;
    this.scene.add(this.mapGroup);
  }

  // ======= OCEAN =======
  createOcean() {
    const geo = new THREE.PlaneGeometry(200, 140, 100, 70);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0a1830,
      roughness: 0.7,
      metalness: 0.15,
      transparent: true,
      opacity: 0.95
    });
    this.oceanMesh = new THREE.Mesh(geo, mat);
    this.oceanMesh.rotation.x = -Math.PI / 2;
    this.oceanMesh.receiveShadow = true;
    this.mapGroup.add(this.oceanMesh);

    // Store original positions for wave animation
    const posAttr = this.oceanMesh.geometry.attributes.position;
    this.oceanOriginalY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      this.oceanOriginalY[i] = posAttr.getY(i);
    }
  }

  animateOcean(time) {
    if (!this.oceanMesh) return;
    const posAttr = this.oceanMesh.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const wave = Math.sin(x * 0.08 + time * 0.8) * 0.15 +
                   Math.sin(z * 0.06 + time * 0.6) * 0.1 +
                   Math.sin((x + z) * 0.05 + time * 1.2) * 0.08;
      posAttr.setY(i, this.oceanOriginalY[i] + wave);
    }
    posAttr.needsUpdate = true;
    this.oceanMesh.geometry.computeVertexNormals();
  }

  // ======= CONTINENTS =======
  drawContinents() {
    const continentMat = new THREE.MeshStandardMaterial({
      color: 0x162a1e,
      roughness: 0.75,
      metalness: 0.05,
      transparent: true,
      opacity: 0.7
    });

    // Enhanced continent shapes with more detail
    const continents = [
      // Asia (larger, more detailed)
      { points: [[18,-35],[35,-38],[48,-35],[54,-22],[55,-12],[52,-2],[46,5],[38,8],[32,6],[28,4],[24,6],[20,2],[17,-4],[15,-14],[16,-25],[18,-32]], y: 0.12 },
      // Europe
      { points: [[-10,-38],[3,-40],[12,-38],[16,-32],[14,-26],[10,-22],[4,-20],[-2,-22],[-6,-26],[-10,-32]], y: 0.12 },
      // Africa
      { points: [[-6,-18],[6,-20],[16,-18],[20,-8],[18,0],[16,10],[10,20],[5,26],[0,28],[-5,24],[-10,16],[-14,6],[-12,-4],[-8,-12]], y: 0.12 },
      // Australia
      { points: [[38,10],[50,8],[58,10],[62,16],[60,22],[56,28],[46,30],[38,26],[35,18],[36,12]], y: 0.12 },
      // South America
      { points: [[-36,-2],[-28,-6],[-22,2],[-20,10],[-18,18],[-22,26],[-28,34],[-34,36],[-40,28],[-42,18],[-40,8]], y: 0.12 },
      // North America
      { points: [[-60,-38],[-42,-40],[-28,-38],[-22,-30],[-26,-16],[-32,-8],[-40,-6],[-52,-10],[-60,-18],[-64,-28],[-62,-34]], y: 0.12 },
      // Subcontinent detail (India/Sri Lanka)
      { points: [[24,-4],[30,-6],[32,-2],[30,2],[28,6],[24,4],[22,0]], y: 0.14 },
    ];

    continents.forEach(cont => {
      const shape = new THREE.Shape();
      shape.moveTo(cont.points[0][0], cont.points[0][1]);
      for (let i = 1; i < cont.points.length; i++) {
        shape.lineTo(cont.points[i][0], cont.points[i][1]);
      }
      shape.lineTo(cont.points[0][0], cont.points[0][1]);

      // Extruded slightly for 3D feel
      const extrudeSettings = { depth: 0.15, bevelEnabled: false };
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geo, continentMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = cont.y;
      this.mapGroup.add(mesh);

      // Continent edge glow
      const edgeGeo = new THREE.EdgesGeometry(new THREE.ShapeGeometry(shape));
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x2a5a3a, transparent: true, opacity: 0.3 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.rotation.x = -Math.PI / 2;
      edges.position.y = cont.y + 0.2;
      this.mapGroup.add(edges);
    });
  }

  // ======= LATITUDE LINES =======
  drawLatitudeLines() {
    const lines = [
      { z: 0, label: 'EQUATOR', color: 0x3a6a8a, opacity: 0.2 },
      { z: -14, label: 'Tropic of Cancer', color: 0x2a4a6a, opacity: 0.1 },
      { z: 14, label: 'Tropic of Capricorn', color: 0x2a4a6a, opacity: 0.1 },
    ];

    lines.forEach(line => {
      const points = [new THREE.Vector3(-90, 0.08, line.z), new THREE.Vector3(90, 0.08, line.z)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color: line.color,
        transparent: true,
        opacity: line.opacity,
        dashSize: 2,
        gapSize: 1
      });
      const l = new THREE.Line(geo, mat);
      l.computeLineDistances();
      this.mapGroup.add(l);

      // Label
      const lbl = this.createLabelSprite(line.label, line.color, 16);
      lbl.position.set(-80, 1.5, line.z);
      lbl.scale.set(8, 1, 1);
      this.mapGroup.add(lbl);
    });
  }

  // ======= CLOUD LAYER =======
  createCloudLayer() {
    const cloudGeo = new THREE.PlaneGeometry(200, 140, 8, 6);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.03,
      side: THREE.DoubleSide
    });
    this.cloudLayer = new THREE.Mesh(cloudGeo, cloudMat);
    this.cloudLayer.rotation.x = -Math.PI / 2;
    this.cloudLayer.position.y = 12;
    this.mapGroup.add(this.cloudLayer);
  }

  // ======= LEGEND =======
  createLegend() {
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 6),
      new THREE.MeshBasicMaterial({ color: 0x0a1020, transparent: true, opacity: 0.6 })
    );
    bg.rotation.x = -Math.PI / 2;
    bg.position.set(-62, 0.15, 52);
    this.mapGroup.add(bg);

    const l1 = this.createLabelSprite('◆ Full Members (Test Nations)', 0x44AAFF, 22);
    l1.position.set(-62, 2.5, 50.5);
    l1.scale.set(14, 1.5, 1);
    this.mapGroup.add(l1);

    const l2 = this.createLabelSprite('● Associate Members', 0x777777, 20);
    l2.position.set(-62, 1.5, 52.5);
    l2.scale.set(11, 1.2, 1);
    this.mapGroup.add(l2);

    const l3 = this.createLabelSprite('⬡ Player Skyscrapers', 0xd4a843, 20);
    l3.position.set(-62, 0.8, 54);
    l3.scale.set(11, 1.2, 1);
    this.mapGroup.add(l3);
  }

  // ======= COUNTRY MARKERS =======
  createCountryMarkers() {
    Object.entries(FULL_MEMBERS).forEach(([country, data]) => {
      this.createFullMemberMarker(country, data);
    });
    Object.entries(ASSOCIATE_MEMBERS).forEach(([country, data]) => {
      this.createAssociateMarker(country, data);
    });
  }

  createFullMemberMarker(country, data) {
    const markerGroup = new THREE.Group();

    // Base platform with country color
    const baseGeo = new THREE.CylinderGeometry(2, 2.5, 0.3, 16);
    const baseMat = new THREE.MeshStandardMaterial({
      color: data.color, emissive: data.color, emissiveIntensity: 0.25,
      roughness: 0.3, metalness: 0.7
    });
    markerGroup.add(new THREE.Mesh(baseGeo, baseMat).translateY(0.15));

    // ICC Ranking ring
    if (data.rank) {
      const ringGeo = new THREE.RingGeometry(2.8, 3.1, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: data.color, transparent: true, opacity: 0.2, side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.06;
      markerGroup.add(ring);
    }

    // Vertical beam
    const beamGeo = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
    const beamMat = new THREE.MeshStandardMaterial({
      color: data.color, emissive: data.color, emissiveIntensity: 0.35,
      transparent: true, opacity: 0.45
    });
    markerGroup.add(new THREE.Mesh(beamGeo, beamMat).translateY(2.3));

    // Diamond top
    const diamondGeo = new THREE.OctahedronGeometry(0.5, 0);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: data.color, emissive: data.color, emissiveIntensity: 0.5,
      roughness: 0.2, metalness: 0.8
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.position.y = 4.8;
    markerGroup.add(diamond);

    // Point light
    const pl = new THREE.PointLight(data.color, 0.35, 12);
    pl.position.y = 3;
    markerGroup.add(pl);

    // Pulse ring (animated)
    const pulseGeo = new THREE.RingGeometry(1.8, 2, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: data.color, transparent: true, opacity: 0.4, side: THREE.DoubleSide
    });
    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.rotation.x = -Math.PI / 2;
    pulseRing.position.y = 0.08;
    markerGroup.add(pulseRing);
    this.pulseRings.push({ mesh: pulseRing, baseScale: 1, color: data.color, mat: pulseMat });

    // Country label
    const label = this.createLabelSprite(data.label, data.color, 30);
    label.position.set(0, 6.2, 0);
    label.scale.set(7, 1.8, 1);
    markerGroup.add(label);

    // ICC Test ranking number
    if (data.rank) {
      const rankLabel = this.createLabelSprite(`#${data.rank.test} TEST`, 0xaaaaaa, 18);
      rankLabel.position.set(0, 5.2, 0);
      rankLabel.scale.set(4, 1, 1);
      markerGroup.add(rankLabel);
    }

    // World Cup trophies
    if (data.worldCups && data.worldCups.length > 0) {
      const trophyLabel = this.createLabelSprite(`🏆×${data.worldCups.length}`, 0xFFD700, 22);
      trophyLabel.position.set(3.5, 3, 0);
      trophyLabel.scale.set(3, 1, 1);
      markerGroup.add(trophyLabel);
    }

    markerGroup.position.set(data.x, 0.3, data.z);
    markerGroup.userData = { country, countryData: data, isFullMember: true };
    this.mapGroup.add(markerGroup);
    this.countryMarkers.set(country, markerGroup);
  }

  createAssociateMarker(country, data) {
    const markerGroup = new THREE.Group();

    // Small base
    const baseGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.15, 12);
    const baseMat = new THREE.MeshStandardMaterial({
      color: data.color, emissive: data.color, emissiveIntensity: 0.15,
      roughness: 0.4, metalness: 0.5
    });
    markerGroup.add(new THREE.Mesh(baseGeo, baseMat).translateY(0.08));

    // Dot
    const dotGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const dotMat = new THREE.MeshStandardMaterial({
      color: data.color, emissive: data.color, emissiveIntensity: 0.2,
      roughness: 0.4, metalness: 0.5
    });
    markerGroup.add(new THREE.Mesh(dotGeo, dotMat).translateY(0.6));

    // Label
    const label = this.createLabelSprite(data.label, 0x777777, 20);
    label.position.set(0, 2, 0);
    label.scale.set(5, 1.2, 1);
    markerGroup.add(label);

    markerGroup.position.set(data.x, 0.3, data.z);
    markerGroup.userData = { country, countryData: data, isFullMember: false };
    this.mapGroup.add(markerGroup);
    this.countryMarkers.set(country, markerGroup);
  }

  // ======= CONNECTIONS between countries =======
  addConnectionLine(countryA, countryB, format) {
    const posA = this.getCountryPosition(countryA);
    const posB = this.getCountryPosition(countryB);
    if (posA.length() === 0 || posB.length() === 0) return;

    const mid = posA.clone().add(posB).multiplyScalar(0.5);
    mid.y = 5 + posA.distanceTo(posB) * 0.08;

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(posA.x, 1, posA.z),
      mid,
      new THREE.Vector3(posB.x, 1, posB.z)
    );

    const points = curve.getPoints(30);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const color = format === 'Test' ? 0xCC3333 : format === 'ODI' ? 0x3399FF : 0xAA33DD;
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.12 });
    const line = new THREE.Line(geo, mat);
    this.mapGroup.add(line);
    this.connectionLines.push(line);
  }

  // ======= UTILITY =======
  createLabelSprite(text, color, fontSize = 36) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;

    ctx.clearRect(0, 0, 512, 128);
    ctx.font = `bold ${fontSize}px "Outfit", Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const hex = '#' + new THREE.Color(color).getHexString();
    ctx.fillStyle = hex;
    ctx.fillText(text, 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture, transparent: true, depthTest: false
    }));
  }

  getCountryPosition(country) {
    const data = ALL_COUNTRIES[country];
    if (!data) {
      for (const [name, d] of Object.entries(ALL_COUNTRIES)) {
        if (name.toLowerCase().includes(country.toLowerCase()) ||
            country.toLowerCase().includes(name.toLowerCase())) {
          return new THREE.Vector3(d.x, 0, d.z);
        }
      }
      return new THREE.Vector3(0, 0, 0);
    }
    return new THREE.Vector3(data.x, 0, data.z);
  }

  getPlayerOffset(country) {
    const count = this.playerCountTracker.get(country) || 0;
    this.playerCountTracker.set(country, count + 1);
    const col = count % 3;
    const row = Math.floor(count / 3);
    return new THREE.Vector3((col - 1) * 4.5, 0, row * 4.5 + 3.5);
  }

  resetPlayerOffsets() {
    this.playerCountTracker.clear();
  }

  getCountryCoords() { return ALL_COUNTRIES; }
  getFullMemberData() { return FULL_MEMBERS; }
  isKnownCountry(country) { return !!ALL_COUNTRIES[country]; }

  show() {
    this.visible = true;
    this.mapGroup.visible = true;
    // Add flight-path connections between countries
    this.addConnectionLine('India', 'Australia', 'Test');
    this.addConnectionLine('India', 'England', 'Test');
    this.addConnectionLine('Australia', 'England', 'Test');
    this.addConnectionLine('India', 'Pakistan', 'ODI');
    this.addConnectionLine('Australia', 'South Africa', 'Test');
    this.addConnectionLine('West Indies', 'England', 'Test');
    this.addConnectionLine('Sri Lanka', 'India', 'ODI');
    this.addConnectionLine('South Africa', 'England', 'Test');
    this.addConnectionLine('Pakistan', 'England', 'Test');
    this.addConnectionLine('New Zealand', 'Australia', 'ODI');
  }

  hide() {
    this.visible = false;
    this.mapGroup.visible = false;
    // Remove connection lines
    this.connectionLines.forEach(l => { this.mapGroup.remove(l); l.geometry.dispose(); });
    this.connectionLines = [];
  }

  update(time) {
    // Ocean waves
    this.animateOcean(time);

    // Cloud drift
    if (this.cloudLayer) {
      this.cloudLayer.position.x = Math.sin(time * 0.05) * 3;
      this.cloudLayer.position.z = Math.cos(time * 0.03) * 2;
    }

    // Full-member diamond rotation + bob
    this.countryMarkers.forEach((marker) => {
      if (marker.userData.isFullMember) {
        const children = marker.children;
        // Diamond is at index 3
        for (const child of children) {
          if (child.geometry && child.geometry.type === 'OctahedronGeometry') {
            child.rotation.y = time * 0.5;
            child.position.y = 4.8 + Math.sin(time * 1.5 + marker.position.x * 0.1) * 0.15;
          }
        }
      }
    });

    // Pulse rings
    this.pulseRings.forEach((pr, i) => {
      const t = (time * 0.5 + i * 0.8) % 3;
      const scale = 1 + t * 1.2;
      pr.mesh.scale.set(scale, scale, 1);
      pr.mat.opacity = Math.max(0, 0.4 - t * 0.14);
    });
  }

  dispose() {
    this.scene.remove(this.mapGroup);
  }
}
