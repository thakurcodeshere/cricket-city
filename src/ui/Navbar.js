// ============================================
// CRICKET CITY — Navbar Component
// With theme switcher + world map toggle
// ============================================

import { THEMES } from '../city/TimeTheme.js';

export function createNavbar(onCategoryChange, onFormatChange, onThemeChange, onWorldMapToggle) {
  const navbar = document.getElementById('navbar');

  navbar.innerHTML = `
    <div class="nav-brand">CRICKET<span class="brand-accent">CITY</span></div>
    <ul class="nav-links">
      <li class="nav-link active" data-category="all" id="nav-all">ALL</li>
      <li class="nav-link" data-category="batter" id="nav-batters">BATTERS</li>
      <li class="nav-link" data-category="bowler" id="nav-bowlers">BOWLERS</li>
      <li class="nav-link" data-category="allrounder" id="nav-allrounders">ALL-ROUNDERS</li>
      <li class="nav-link" data-category="teams" id="nav-teams">TEAMS</li>
      <li class="nav-link nav-link-map" data-category="worldmap" id="nav-worldmap">🌍 WORLD MAP</li>
      <li class="nav-link" data-category="history" id="nav-history">HISTORY</li>
    </ul>
    <div class="nav-right-controls">
      <div class="theme-switcher" id="theme-switcher">
        <button class="theme-btn theme-btn-active" data-theme="auto" id="theme-auto" title="Auto (based on time)">🔄</button>
        <button class="theme-btn" data-theme="${THEMES.MORNING}" id="theme-morning" title="Morning">☀️</button>
        <button class="theme-btn" data-theme="${THEMES.AFTERNOON}" id="theme-afternoon" title="Afternoon">🌤️</button>
        <button class="theme-btn" data-theme="${THEMES.EVENING}" id="theme-evening" title="Evening">🌆</button>
        <button class="theme-btn" data-theme="${THEMES.NIGHT}" id="theme-night" title="Night">🌙</button>
      </div>
      <div class="nav-filters">
        <button class="filter-btn active" data-format="all" id="filter-all">ALL</button>
        <button class="filter-btn" data-format="test" id="filter-test">TEST</button>
        <button class="filter-btn" data-format="odi" id="filter-odi">ODI</button>
        <button class="filter-btn" data-format="t20" id="filter-t20">T20I</button>
      </div>
    </div>
  `;

  // Category click handlers
  navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      onCategoryChange(link.dataset.category);
    });
  });

  // Format filter handlers
  navbar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navbar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onFormatChange(btn.dataset.format);
    });
  });

  // Theme switcher handlers
  navbar.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navbar.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('theme-btn-active'));
      btn.classList.add('theme-btn-active');
      onThemeChange(btn.dataset.theme);
    });
  });
}
