// ============================================
// CRICKET CITY — Three.js City Scene
// Stadium floodlight + World Map + Time Themes
// ============================================

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TimeTheme } from './TimeTheme.js';
import { WorldMap } from './WorldMap.js';
import { BallNavigator } from './BallNavigator.js';

export class CityScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.buildings = new Map();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredBuilding = null;
    this.onBuildingClick = null;
    this.onBuildingHover = null;
    this.floodlights = [];
    this.clock = new THREE.Clock();

    // Sub-systems
    this.timeTheme = new TimeTheme();
    this.worldMap = null;
    this.ballNav = null;
    this.isWorldMapMode = false;

    // Lighting references for theme changes
    this.ambientLight = null;
    this.mainLight = null;
    this.secondaryLight = null;
    this.hemiLight = null;
    this.groundMesh = null;
    this.cityGridGroup = new THREE.Group();

    this.init();
  }

  init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050a0e);
    this.scene.fog = new THREE.FogExp2(0x050a0e, 0.008);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(40, 35, 40);
    this.camera.lookAt(0, 0, 0);

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2.2;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 150;
    this.controls.target.set(0, 3, 0);

    // Lighting
    this.setupLighting();

    // Ground (cricket pitch)
    this.createGround();

    // City grid group
    this.scene.add(this.cityGridGroup);

    // Floodlight towers
    this.createFloodlightTowers();

    // World Map
    this.worldMap = new WorldMap(this.scene);
    this.worldMap.create();

    // Ball Navigator
    this.ballNav = new BallNavigator(this.scene, this.camera, this.controls);

    // Apply time theme
    const initialTheme = this.timeTheme.init();
    this.applyTheme(this.timeTheme.getThemeConfig(initialTheme));

    this.timeTheme.onThemeChange = (themeName, config) => {
      this.applyTheme(config);
    };

    // Events
    this.boundResize = () => this.onResize();
    this.boundMouseMove = (e) => this.onMouseMove(e);
    this.boundClick = (e) => this.onClick(e);
    window.addEventListener('resize', this.boundResize);
    this.canvas.addEventListener('mousemove', this.boundMouseMove);
    this.canvas.addEventListener('click', this.boundClick);

    // Animation loop
    this.animate();
  }

  setupLighting() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x1a2a3a, 0.4);
    this.scene.add(this.ambientLight);

    // Main directional light
    this.mainLight = new THREE.DirectionalLight(0xffeaa7, 1.2);
    this.mainLight.position.set(30, 50, 20);
    this.mainLight.castShadow = true;
    this.mainLight.shadow.mapSize.width = 2048;
    this.mainLight.shadow.mapSize.height = 2048;
    this.mainLight.shadow.camera.near = 0.5;
    this.mainLight.shadow.camera.far = 150;
    this.mainLight.shadow.camera.left = -60;
    this.mainLight.shadow.camera.right = 60;
    this.mainLight.shadow.camera.top = 60;
    this.mainLight.shadow.camera.bottom = -60;
    this.scene.add(this.mainLight);

    // Secondary directional
    this.secondaryLight = new THREE.DirectionalLight(0xf8f9fa, 0.6);
    this.secondaryLight.position.set(-30, 40, -20);
    this.scene.add(this.secondaryLight);

    // Spot lights for floodlight cone effect (4 corners)
    const spotPositions = [
      { x: 45, z: 45 },
      { x: -45, z: 45 },
      { x: 45, z: -45 },
      { x: -45, z: -45 }
    ];

    spotPositions.forEach(pos => {
      const spot = new THREE.SpotLight(0xffeaa7, 2.0, 120, Math.PI / 5, 0.5, 1);
      spot.position.set(pos.x, 40, pos.z);
      spot.target.position.set(0, 0, 0);
      spot.castShadow = false;
      this.scene.add(spot);
      this.scene.add(spot.target);
      this.floodlights.push(spot);
    });

    // Hemisphere light
    this.hemiLight = new THREE.HemisphereLight(0x0a1a2a, 0x0e2a18, 0.3);
    this.scene.add(this.hemiLight);
  }

  applyTheme(config) {
    // Scene background & fog
    this.scene.background.copy(config.sky);
    this.scene.fog.color.copy(config.fog);
    this.scene.fog.density = config.fogDensity;

    // Ambient
    this.ambientLight.color.set(config.ambient.color);
    this.ambientLight.intensity = config.ambient.intensity;

    // Main directional
    this.mainLight.color.set(config.directional.color);
    this.mainLight.intensity = config.directional.intensity;
    this.mainLight.position.set(config.directional.position.x, config.directional.position.y, config.directional.position.z);

    // Secondary
    this.secondaryLight.color.set(config.secondary.color);
    this.secondaryLight.intensity = config.secondary.intensity;

    // Hemisphere
    this.hemiLight.color.set(config.hemisphere.skyColor);
    this.hemiLight.groundColor.set(config.hemisphere.groundColor);
    this.hemiLight.intensity = config.hemisphere.intensity;

    // Floodlight intensity
    this.floodlights.forEach(spot => {
      spot.intensity = config.floodlightIntensity;
    });

    // Ground color
    if (this.groundMesh) {
      this.groundMesh.material.color.set(config.groundColor);
    }

    // Exposure
    this.renderer.toneMappingExposure = config.exposure;

    // Update window glow on all buildings
    this.buildings.forEach(({ mesh }) => {
      mesh.traverse(child => {
        if (child.isMesh && child.material && child.material.emissiveIntensity !== undefined) {
          if (child.userData.isWindow) {
            child.material.emissiveIntensity = config.windowGlow;
          }
        }
      });
    });
  }

  createGround() {
    // Main ground — lush grass
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0e2a18,
      roughness: 0.9,
      metalness: 0.1
    });
    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // Cricket pitch strip
    const pitchGeo = new THREE.PlaneGeometry(3, 20);
    const pitchMat = new THREE.MeshStandardMaterial({
      color: 0xc4a35a, roughness: 0.8, metalness: 0.05
    });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.rotation.x = -Math.PI / 2;
    pitch.position.y = 0.01;
    this.cityGridGroup.add(pitch);

    // Crease lines
    const creaseMat = new THREE.MeshStandardMaterial({ color: 0xf0ece3, roughness: 0.5 });
    [-8, 8].forEach(z => {
      const crease = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.05), creaseMat);
      crease.rotation.x = -Math.PI / 2;
      crease.position.set(0, 0.02, z);
      this.cityGridGroup.add(crease);
    });

    // === STUMPS at both ends ===
    const stumpMat = new THREE.MeshStandardMaterial({ color: 0xEEDDBB, roughness: 0.5, metalness: 0.2 });
    const bailMat = new THREE.MeshStandardMaterial({ color: 0xDDCC99, roughness: 0.5 });

    [-8.5, 8.5].forEach(z => {
      // 3 stumps
      for (let s = -0.15; s <= 0.15; s += 0.15) {
        const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 6), stumpMat);
        stump.position.set(s, 0.375, z);
        this.cityGridGroup.add(stump);
      }
      // 2 bails
      for (let b = -0.075; b <= 0.075; b += 0.15) {
        const bail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 4), bailMat);
        bail.position.set(b, 0.77, z);
        bail.rotation.z = Math.PI / 2;
        this.cityGridGroup.add(bail);
      }
    });

    // === BOUNDARY ROPE (3D torus) ===
    const ropeGeo = new THREE.TorusGeometry(48, 0.15, 8, 64);
    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece3, roughness: 0.7, metalness: 0.1
    });
    const rope = new THREE.Mesh(ropeGeo, ropeMat);
    rope.rotation.x = -Math.PI / 2;
    rope.position.y = 0.15;
    this.cityGridGroup.add(rope);

    // === SPECTATOR STANDS (4 sections) ===
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e, roughness: 0.7, metalness: 0.3
    });
    const standPositions = [
      { x: 0, z: -62, ry: 0, w: 50, h: 12 },
      { x: 0, z: 62, ry: Math.PI, w: 50, h: 12 },
      { x: -62, z: 0, ry: Math.PI / 2, w: 50, h: 10 },
      { x: 62, z: 0, ry: -Math.PI / 2, w: 50, h: 10 },
    ];

    standPositions.forEach(sp => {
      // Tiered stand (3 levels)
      for (let tier = 0; tier < 3; tier++) {
        const tw = sp.w - tier * 4;
        const td = 6 - tier;
        const stand = new THREE.Mesh(
          new THREE.BoxGeometry(tw, 2.5, td),
          standMat
        );
        stand.position.set(sp.x, 1.25 + tier * 2.5, sp.z);
        stand.rotation.y = sp.ry;
        stand.castShadow = true;
        this.cityGridGroup.add(stand);

        // Spectator dots on each tier
        const seatMat = new THREE.MeshBasicMaterial({ color: 0x2a3a4a });
        for (let si = 0; si < 8; si++) {
          const seat = new THREE.Mesh(new THREE.SphereGeometry(0.3, 4, 4), seatMat);
          const sx = (si - 3.5) * (tw / 10);
          seat.position.set(
            sp.x + sx * Math.cos(sp.ry),
            2.5 + tier * 2.5,
            sp.z + sx * Math.sin(sp.ry)
          );
          this.cityGridGroup.add(seat);
        }
      }
    });

    // === PAVILION (behind one end) ===
    const pavilionMat = new THREE.MeshStandardMaterial({ color: 0x2a1a1a, roughness: 0.6, metalness: 0.4 });
    const pavilion = new THREE.Mesh(new THREE.BoxGeometry(20, 8, 6), pavilionMat);
    pavilion.position.set(0, 4, -68);
    pavilion.castShadow = true;
    this.cityGridGroup.add(pavilion);

    // Pavilion roof
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x4a2a1a, roughness: 0.5 });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(22, 0.5, 8), roofMat);
    roof.position.set(0, 8.25, -68);
    this.cityGridGroup.add(roof);

    // === SIGHT SCREENS (white boards behind bowler) ===
    const screenMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.9, metalness: 0 });
    [52, -52].forEach(z => {
      const screen = new THREE.Mesh(new THREE.BoxGeometry(8, 6, 0.3), screenMat);
      screen.position.set(0, 3, z);
      this.cityGridGroup.add(screen);
    });

    // === SCOREBOARD ===
    const sbGroup = new THREE.Group();
    const sbBoard = new THREE.Mesh(
      new THREE.BoxGeometry(14, 8, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x0a0e14, roughness: 0.3, metalness: 0.5 })
    );
    sbBoard.position.set(55, 6, -55);
    sbBoard.rotation.y = -Math.PI / 4;
    this.cityGridGroup.add(sbBoard);

    // Scoreboard frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xd4a843, emissive: 0xd4a843, emissiveIntensity: 0.1, roughness: 0.3, metalness: 0.8 });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(14.4, 8.4, 0.3), frameMat);
    frame.position.copy(sbBoard.position);
    frame.position.z -= 0.15;
    frame.rotation.y = sbBoard.rotation.y;
    this.cityGridGroup.add(frame);

    // Grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x1a472a, 0x0e2a18);
    gridHelper.position.y = 0.005;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    this.cityGridGroup.add(gridHelper);
  }

  createFloodlightTowers() {
    const positions = [
      { x: 48, z: 48 },
      { x: -48, z: 48 },
      { x: 48, z: -48 },
      { x: -48, z: -48 }
    ];

    positions.forEach(pos => {
      const towerGroup = new THREE.Group();

      // Tower pole
      const poleGeo = new THREE.CylinderGeometry(0.3, 0.5, 35, 8);
      const poleMat = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.6,
        metalness: 0.8
      });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(0, 17.5, 0);
      pole.castShadow = true;
      towerGroup.add(pole);

      // Light cluster
      const clusterGeo = new THREE.BoxGeometry(4, 2, 4);
      const clusterMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.4,
        metalness: 0.9
      });
      const cluster = new THREE.Mesh(clusterGeo, clusterMat);
      cluster.position.set(0, 36, 0);
      towerGroup.add(cluster);

      // Glowing panel
      const glowGeo = new THREE.PlaneGeometry(3.5, 1.5);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffeaa7,
        transparent: true,
        opacity: 0.9
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(0, 35, 0);
      glow.lookAt(new THREE.Vector3(-pos.x, 0, -pos.z).normalize());
      towerGroup.add(glow);

      // Point light
      const light = new THREE.PointLight(0xffeaa7, 0.5, 80);
      light.position.set(0, 36, 0);
      towerGroup.add(light);

      towerGroup.position.set(pos.x, 0, pos.z);
      this.cityGridGroup.add(towerGroup);
    });
  }

  // ---- World Map Mode ----
  toggleWorldMap(show, players) {
    this.isWorldMapMode = show;

    if (show) {
      this.cityGridGroup.visible = false;
      this.worldMap.show();
      // Position camera for map view
      this.camera.position.set(0, 80, 60);
      this.controls.target.set(0, 0, 0);
      this.controls.maxDistance = 200;
      this.controls.minDistance = 20;
    } else {
      this.worldMap.hide();
      this.cityGridGroup.visible = true;
      // Reset camera
      this.camera.position.set(40, 35, 40);
      this.controls.target.set(0, 3, 0);
      this.controls.maxDistance = 100;
      this.controls.minDistance = 15;
    }
  }

  addBuildingAtCountry(playerData, building) {
    const countryPos = this.worldMap.getCountryPosition(playerData.country);
    const offset = this.worldMap.getPlayerOffset(playerData.country);

    const finalPos = countryPos.clone().add(offset);
    building.position.copy(finalPos);
    building.castShadow = true;
    building.receiveShadow = true;
    building.userData = { playerId: playerData.id, playerData };
    this.scene.add(building);
    this.buildings.set(playerData.id, { mesh: building, data: playerData, position: finalPos });
  }

  navigateToBuilding(fromPlayerId, toPlayerId, onComplete) {
    const fromBuilding = this.buildings.get(fromPlayerId);
    const toBuilding = this.buildings.get(toPlayerId);

    if (!toBuilding) return;

    const from = fromBuilding
      ? fromBuilding.position || fromBuilding.mesh.position
      : this.camera.position.clone();
    const to = toBuilding.position || toBuilding.mesh.position;

    this.ballNav.navigateTo(from, to, onComplete);
  }

  navigateToBuildingDirect(playerId, onComplete) {
    const building = this.buildings.get(playerId);
    if (!building) return;

    const to = building.position || building.mesh.position;
    const from = this.camera.position.clone();
    from.y = 2;

    this.ballNav.navigateTo(from, to, onComplete);
  }

  addBuilding(playerData, position, buildingMesh) {
    buildingMesh.position.copy(position);
    buildingMesh.castShadow = true;
    buildingMesh.receiveShadow = true;
    buildingMesh.userData = { playerId: playerData.id, playerData };
    this.scene.add(buildingMesh);
    this.buildings.set(playerData.id, { mesh: buildingMesh, data: playerData });
  }

  clearBuildings() {
    this.buildings.forEach(({ mesh }) => {
      this.scene.remove(mesh);
      mesh.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    });
    this.buildings.clear();
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onClick(event) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = Array.from(this.buildings.values()).map(b => b.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj && !obj.userData.playerId) obj = obj.parent;
      if (obj && obj.userData.playerId && this.onBuildingClick) {
        this.onBuildingClick(obj.userData.playerData);
      }
    }
  }

  checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = Array.from(this.buildings.values()).map(b => b.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj && !obj.userData.playerId) obj = obj.parent;
      if (obj && obj.userData.playerId) {
        if (this.hoveredBuilding !== obj.userData.playerId) {
          this.hoveredBuilding = obj.userData.playerId;
          this.canvas.style.cursor = 'pointer';
          if (this.onBuildingHover) {
            const screenPos = this.getScreenPosition(obj);
            this.onBuildingHover(obj.userData.playerData, screenPos);
          }
        }
        return;
      }
    }

    if (this.hoveredBuilding) {
      this.hoveredBuilding = null;
      this.canvas.style.cursor = 'default';
      if (this.onBuildingHover) this.onBuildingHover(null, null);
    }
  }

  getScreenPosition(obj) {
    const vector = new THREE.Vector3();
    obj.getWorldPosition(vector);
    vector.y += 5;
    vector.project(this.camera);
    return {
      x: (vector.x * 0.5 + 0.5) * window.innerWidth,
      y: (-vector.y * 0.5 + 0.5) * window.innerHeight
    };
  }

  focusOnBuilding(playerId) {
    const building = this.buildings.get(playerId);
    if (!building) return;
    const pos = new THREE.Vector3();
    building.mesh.getWorldPosition(pos);
    this.controls.target.lerp(pos, 0.1);
  }

  setTheme(themeName) {
    this.timeTheme.setTheme(themeName);
  }

  getTimeTheme() {
    return this.timeTheme;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    this.controls.update();
    this.checkHover();

    // Floodlight flicker
    const config = this.timeTheme.getCurrentConfig();
    this.floodlights.forEach((light, i) => {
      light.intensity = config.floodlightIntensity + Math.sin(elapsed * 1 + i) * 0.1;
    });

    // World map animations
    if (this.isWorldMapMode && this.worldMap) {
      this.worldMap.update(elapsed);
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('resize', this.boundResize);
    this.renderer.dispose();
    if (this.worldMap) this.worldMap.dispose();
    if (this.ballNav) this.ballNav.dispose();
  }
}
