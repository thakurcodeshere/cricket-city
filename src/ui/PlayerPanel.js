// ============================================
// CRICKET CITY — Player Panel Component
// Slide-in detail panel with match-by-match stats
// ============================================

import { getTotalMatches, getTotalRuns, getTotalWickets, PLAYER_ROLES } from '../data/players.js';

export function openPlayerPanel(player) {
  const panel = document.getElementById('player-panel');
  const totalMatches = getTotalMatches(player);
  const totalRuns = getTotalRuns(player);
  const totalWickets = getTotalWickets(player);

  const roleClass = getRoleClass(player.role);
  const roleLabel = player.role;

  let careerStatsHTML = '';
  if (player.career.test) {
    careerStatsHTML += formatStatsSection('TEST', player.career.test);
  }
  if (player.career.odi) {
    careerStatsHTML += formatStatsSection('ODI', player.career.odi);
  }
  if (player.career.t20i) {
    careerStatsHTML += formatStatsSection('T20I', player.career.t20i);
  }

  panel.innerHTML = `
    <div class="panel-header">
      <button class="panel-close" id="panel-close-btn">✕</button>
      <span class="player-role-badge ${roleClass}">${roleLabel}</span>
      <h2 class="player-name">${player.name}</h2>
      <div class="player-country">${player.flag} ${player.country} • ${player.debut}–${player.retired || 'PRESENT'}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">TOTAL MATCHES</div>
        <div class="stat-value">${totalMatches.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TOTAL RUNS</div>
        <div class="stat-value gold">${totalRuns.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TOTAL WICKETS</div>
        <div class="stat-value red">${totalWickets.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">BUILDING FLOORS</div>
        <div class="stat-value blue">${player.matches ? player.matches.length : 0}</div>
      </div>
    </div>

    ${careerStatsHTML}

    <div class="panel-section">
      <h3 class="section-title">🏆 RECORDS & MILESTONES</h3>
      ${player.records.map(r => `<div class="record-item">${r}</div>`).join('')}
    </div>

    <div class="panel-section">
      <h3 class="section-title">🏗️ BUILDING FLOORS (MATCH BY MATCH)</h3>
      <div class="floor-list">
        ${player.matches ? player.matches.map((m, i) => createFloorCard(m, i)).join('') : '<p style="color: var(--text-muted); font-size: 0.85rem;">Detailed match data coming soon...</p>'}
      </div>
    </div>
  `;

  // Show panel
  panel.classList.remove('panel-hidden');
  panel.classList.add('panel-visible');

  // Close button
  document.getElementById('panel-close-btn').addEventListener('click', () => {
    closePlayerPanel();
  });

  // Animate stats counters
  animateCounters(panel);
}

export function closePlayerPanel() {
  const panel = document.getElementById('player-panel');
  panel.classList.remove('panel-visible');
  panel.classList.add('panel-hidden');
}

function getRoleClass(role) {
  switch (role) {
    case PLAYER_ROLES.BOWLER: return 'role-bowler';
    case PLAYER_ROLES.ALLROUNDER: return 'role-allrounder';
    case PLAYER_ROLES.WK_BATTER: return 'role-batter';
    default: return 'role-batter';
  }
}

function formatStatsSection(format, stats) {
  const formatClass = format === 'TEST' ? 'format-test' : format === 'ODI' ? 'format-odi' : 'format-t20';

  return `
    <div class="panel-section">
      <h3 class="section-title"><span class="floor-format ${formatClass}">${format}</span> CAREER STATS</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">MATCHES</div>
          <div class="stat-value">${stats.matches}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">RUNS</div>
          <div class="stat-value gold">${stats.runs.toLocaleString()}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">AVERAGE</div>
          <div class="stat-value">${stats.avg}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">STRIKE RATE</div>
          <div class="stat-value">${stats.sr}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">HIGHEST</div>
          <div class="stat-value gold">${stats.hs}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">100s / 50s</div>
          <div class="stat-value">${stats.hundreds} / ${stats.fifties}</div>
        </div>
        ${stats.wickets ? `
        <div class="stat-card">
          <div class="stat-label">WICKETS</div>
          <div class="stat-value red">${stats.wickets}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">BEST BOWLING</div>
          <div class="stat-value">${stats.bestBowling}</div>
        </div>` : ''}
      </div>
    </div>
  `;
}

function createFloorCard(match, index) {
  const formatClass = match.format === 'Test' ? 'format-test' : match.format === 'ODI' ? 'format-odi' : 'format-t20';
  const isRecord = match.isRecord;

  let battingStats = '';
  if (match.batting) {
    battingStats = `
      <div class="floor-stats">
        <div class="floor-stat-item"><span class="floor-stat-label">RUNS</span> <strong>${match.batting.runs}</strong></div>
        <div class="floor-stat-item"><span class="floor-stat-label">BALLS</span> ${match.batting.balls}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">DOTS</span> ${match.batting.dots}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">4s</span> ${match.batting.fours}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">6s</span> ${match.batting.sixes}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">SR</span> ${match.batting.sr}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">OUT</span> ${match.batting.dismissal}</div>
      </div>
    `;
  }

  let bowlingStats = '';
  if (match.bowling) {
    bowlingStats = `
      <div class="floor-stats" style="margin-top: 4px;">
        <div class="floor-stat-item"><span class="floor-stat-label">OVERS</span> ${match.bowling.overs}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">MAIDENS</span> ${match.bowling.maidens}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">RUNS</span> ${match.bowling.runs}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">WKTS</span> <strong style="color: var(--ball-red-glow);">${match.bowling.wickets}</strong></div>
        <div class="floor-stat-item"><span class="floor-stat-label">ECON</span> ${match.bowling.economy || (match.bowling.runs / match.bowling.overs).toFixed(1)}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">NB</span> ${match.bowling.noBalls}</div>
        <div class="floor-stat-item"><span class="floor-stat-label">WIDES</span> ${match.bowling.wides}</div>
      </div>
    `;
  }

  return `
    <div class="floor-card ${isRecord ? 'record' : ''}" id="floor-${index}">
      <div class="floor-header">
        <span class="floor-number">FLOOR ${index + 1} — MATCH #${match.num}</span>
        <span class="floor-format ${formatClass}">${match.format}</span>
      </div>
      <div class="floor-opponent">vs ${match.opponent} · ${match.venue} · ${match.year}</div>
      ${battingStats}
      ${bowlingStats}
      ${match.note ? `<div style="margin-top: 8px; font-size: 0.75rem; color: ${isRecord ? 'var(--stump-gold)' : 'var(--text-muted)'}; font-style: italic;">${match.note}</div>` : ''}
    </div>
  `;
}

function animateCounters(panel) {
  panel.querySelectorAll('.stat-value').forEach(el => {
    const targetText = el.textContent;
    const targetNum = parseInt(targetText.replace(/,/g, ''));
    if (isNaN(targetNum) || targetNum === 0) return;

    const duration = 800;
    const startTime = Date.now();

    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNum * eased);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = targetText;
      }
    }

    el.textContent = '0';
    requestAnimationFrame(tick);
  });
}
