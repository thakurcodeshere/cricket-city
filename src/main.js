// ============================================
// CRICKET CITY — Main Application Entry Point
// ============================================

import { IntroScene } from './intro/IntroScene.js';
import { CityScene } from './city/CityScene.js';
import { createPlayerBuilding, calculateCityLayout } from './city/BuildingGenerator.js';
import { players, getPlayersByRole, PLAYER_ROLES } from './data/players.js';
import { createNavbar } from './ui/Navbar.js';
import { openPlayerPanel, closePlayerPanel } from './ui/PlayerPanel.js';
import { showHistoryView, hideHistoryView } from './ui/HistoryTimeline.js';
import { openFloorExplorer, closeFloorExplorer } from './ui/FloorExplorer.js';
import { THEMES } from './city/TimeTheme.js';
import { initCricketAgent } from './ui/CricketAgent.js';

// ---- State ----
let cityScene = null;
let introScene = null;
let currentCategory = 'all';
let currentFormat = 'all';
let tooltipEl = null;
let lastClickedPlayerId = null;

// ---- Initialize ----
function init() {
  console.log('[CRICKET CITY] init() called');
  // Create tooltip element
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'city-tooltip';
  tooltipEl.innerHTML = '<div class="tooltip-name"></div><div class="tooltip-stat"></div>';
  document.body.appendChild(tooltipEl);

  // Start intro
  const introCanvas = document.getElementById('intro-canvas');
  console.log('[CRICKET CITY] Starting intro scene');
  introScene = new IntroScene(introCanvas);
  introScene.start();

  // Setup enter button
  document.getElementById('enter-city-btn').addEventListener('click', () => {
    enterCity();
  });

  // Allow skipping intro with spacebar
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.getElementById('intro-overlay').style.display !== 'none') {
      e.preventDefault();
      enterCity();
    }
  });
}

function enterCity() {
  const overlay = document.getElementById('intro-overlay');
  const app = document.getElementById('app');

  overlay.classList.add('fade-out');

  setTimeout(() => {
    overlay.style.display = 'none';
    introScene.stop();

    app.classList.remove('hidden');

    initCity();

    createNavbar(onCategoryChange, onFormatChange, onThemeChange, onWorldMapToggle);

    // Initialize Cricket Agent
    initCricketAgent((newPlayer) => {
      // Reload current view to include new player
      loadCity(currentCategory === 'worldmap' ? 'worldmap' : currentCategory);
    });
  }, 1000);
}

function initCity() {
  const canvas = document.getElementById('city-canvas');
  cityScene = new CityScene(canvas);

  // Building click → open floor explorer + ball animation in world map mode
  cityScene.onBuildingClick = (playerData) => {
    if (cityScene.isWorldMapMode) {
      // Ball animation to building, then open floor explorer
      if (lastClickedPlayerId && lastClickedPlayerId !== playerData.id) {
        cityScene.navigateToBuilding(lastClickedPlayerId, playerData.id, () => {
          openFloorExplorer(playerData);
        });
      } else {
        cityScene.navigateToBuildingDirect(playerData.id, () => {
          openFloorExplorer(playerData);
        });
      }
      lastClickedPlayerId = playerData.id;
    } else {
      // Normal mode — open floor explorer directly
      openFloorExplorer(playerData);
    }
  };

  cityScene.onBuildingHover = (playerData, screenPos) => {
    if (playerData && screenPos) {
      showTooltip(playerData, screenPos);
    } else {
      hideTooltip();
    }
  };

  // Load world map as default — buildings only on map
  loadCity('worldmap');
}

function loadCity(category) {
  if (!cityScene) return;

  cityScene.clearBuildings();
  hideHistoryView();
  closePlayerPanel();
  closeFloorExplorer();

  switch (category) {
    case 'worldmap':
      loadWorldMap();
      return;
    case 'history':
      showHistoryView();
      return;
  }

  // Disable world map mode — show the stadium view (no buildings on stadium)
  if (cityScene.isWorldMapMode) {
    cityScene.toggleWorldMap(false);
  }

  // Filter players for category overlay sidebar
  let filteredPlayers;
  switch (category) {
    case 'batter':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BATTER || p.role === PLAYER_ROLES.WK_BATTER);
      break;
    case 'bowler':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BOWLER);
      break;
    case 'allrounder':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.ALLROUNDER);
      break;
    case 'teams':
    default:
      filteredPlayers = players;
  }

  // Update HUD — no buildings in stadium, just the pitch
  document.getElementById('hud-count').textContent = filteredPlayers.length;
  document.getElementById('hud-category').textContent = category === 'all' ? 'STADIUM VIEW' : category.toUpperCase();
}

function loadWorldMap(filterCategory) {
  if (!cityScene) return;

  cityScene.clearBuildings();
  hideHistoryView();
  closePlayerPanel();
  closeFloorExplorer();

  // Enable world map mode
  cityScene.toggleWorldMap(true, players);

  // Reset player offsets for fresh layout
  cityScene.worldMap.resetPlayerOffsets();

  // Filter players if category specified
  let filteredPlayers;
  switch (filterCategory) {
    case 'batter':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BATTER || p.role === PLAYER_ROLES.WK_BATTER);
      break;
    case 'bowler':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BOWLER);
      break;
    case 'allrounder':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.ALLROUNDER);
      break;
    default:
      filteredPlayers = players;
  }

  // Place buildings at country positions with proper offsets
  filteredPlayers.forEach(player => {
    const building = createPlayerBuilding(player);
    cityScene.addBuildingAtCountry(player, building);
  });

  // Update HUD
  document.getElementById('hud-count').textContent = filteredPlayers.length;
  document.getElementById('hud-category').textContent = '🌍 WORLD MAP';
}

function onCategoryChange(category) {
  currentCategory = category;

  // Hide/show category overlay
  const overlay = document.getElementById('category-overlay');

  if (category === 'history') {
    overlay.classList.remove('overlay-visible');
    overlay.classList.add('overlay-hidden');
    showHistoryView();
    return;
  }

  hideHistoryView();
  loadCity(category);

  // Show category player list (not for worldmap/all)
  let filteredPlayers;
  switch (category) {
    case 'batter':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BATTER || p.role === PLAYER_ROLES.WK_BATTER);
      break;
    case 'bowler':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.BOWLER);
      break;
    case 'allrounder':
      filteredPlayers = players.filter(p => p.role === PLAYER_ROLES.ALLROUNDER);
      break;
    default:
      filteredPlayers = players;
  }

  updateCategoryOverlay(filteredPlayers, category !== 'all' && category !== 'worldmap');
}

function onFormatChange(format) {
  currentFormat = format;
  document.getElementById('hud-format').textContent = format === 'all' ? 'ALL FORMATS' : format.toUpperCase();
}

function onThemeChange(theme) {
  if (cityScene) {
    cityScene.setTheme(theme);
  }
}

function onWorldMapToggle() {
  if (cityScene.isWorldMapMode) {
    loadCity('all');
  } else {
    loadCity('worldmap');
  }
}

function updateCategoryOverlay(playerList, show) {
  const overlay = document.getElementById('category-overlay');

  if (!show) {
    overlay.classList.remove('overlay-visible');
    overlay.classList.add('overlay-hidden');
    return;
  }

  overlay.innerHTML = playerList.map(player => {
    const statText = player.role === PLAYER_ROLES.BOWLER
      ? `${getTotalWicketsStr(player)} WICKETS`
      : `${getTotalRunsStr(player)} RUNS`;

    return `
      <div class="category-player-card" data-player-id="${player.id}" id="cat-card-${player.id}">
        <div class="category-player-avatar">${player.image}</div>
        <div class="category-player-info">
          <div class="category-player-name">${player.name}</div>
          <div class="category-player-stat">${player.flag} ${statText}</div>
        </div>
      </div>
    `;
  }).join('');

  // Click handlers
  overlay.querySelectorAll('.category-player-card').forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.dataset.playerId;
      const player = players.find(p => p.id === pid);
      if (player) {
        openFloorExplorer(player);
        cityScene.focusOnBuilding(pid);
      }
    });
  });

  overlay.classList.remove('overlay-hidden');
  overlay.classList.add('overlay-visible');
}

function getTotalRunsStr(player) {
  let total = 0;
  if (player.career.test) total += player.career.test.runs;
  if (player.career.odi) total += player.career.odi.runs;
  if (player.career.t20i) total += player.career.t20i.runs;
  return total.toLocaleString();
}

function getTotalWicketsStr(player) {
  let total = 0;
  if (player.career.test) total += player.career.test.wickets;
  if (player.career.odi) total += player.career.odi.wickets;
  if (player.career.t20i) total += player.career.t20i.wickets || 0;
  return total.toLocaleString();
}

function showTooltip(player, pos) {
  if (!tooltipEl) return;
  tooltipEl.querySelector('.tooltip-name').textContent = player.name;

  const statText = player.role === PLAYER_ROLES.BOWLER
    ? `${getTotalWicketsStr(player)} WICKETS`
    : `${getTotalRunsStr(player)} RUNS`;
  tooltipEl.querySelector('.tooltip-stat').textContent = `${player.flag} ${player.country} • ${statText}`;

  tooltipEl.style.left = pos.x + 15 + 'px';
  tooltipEl.style.top = pos.y - 20 + 'px';
  tooltipEl.classList.add('visible');
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.classList.remove('visible');
}

// ---- Start ----
init();
