// ============================================
// CRICKET CITY — Floor Explorer (BEAST MODE)
// Wagon wheel, Manhattan chart, awards,
// match context, enhanced stats, compare mode
// ============================================

let explorerEl = null;
let currentPlayer = null;
let currentFloor = 0;
let currentRoom = 'batting';

export function openFloorExplorer(player) {
  currentPlayer = player;
  currentFloor = 0;
  currentRoom = 'batting';

  if (!explorerEl) {
    explorerEl = document.createElement('div');
    explorerEl.id = 'floor-explorer';
    document.body.appendChild(explorerEl);
  }

  renderExplorer();
  explorerEl.classList.add('explorer-visible');
}

export function closeFloorExplorer() {
  if (explorerEl) {
    explorerEl.classList.remove('explorer-visible');
  }
  currentPlayer = null;
}

function renderExplorer() {
  if (!currentPlayer) return;
  const p = currentPlayer;
  const matches = p.matches || [];
  const match = matches[currentFloor];

  explorerEl.innerHTML = `
    <div class="explorer-overlay" id="explorer-overlay-bg"></div>
    <div class="explorer-panel">
      <button class="explorer-close" id="explorer-close-btn">✕</button>

      <!-- HEADER -->
      <div class="explorer-header">
        <div class="explorer-player-info">
          <div class="explorer-emoji">${p.image}</div>
          <div>
            <div class="explorer-name">${p.name}</div>
            <div class="explorer-country">${p.flag} ${p.country} • ${p.role} • ${p.debut}–${p.retired || 'PRESENT'}</div>
          </div>
        </div>
        ${renderCareerMini(p)}
      </div>

      <!-- BODY -->
      <div class="explorer-body">
        <!-- ELEVATOR -->
        <div class="elevator-shaft">
          <div class="elevator-label">FLOORS</div>
          ${matches.length > 0 ? matches.map((m, i) => `
            <button class="elevator-btn ${i === currentFloor ? 'active' : ''} ${m.isRecord ? 'elevator-record' : ''}"
                    data-floor="${i}" id="floor-btn-${i}">
              <span class="elevator-num">${m.num || i + 1}</span>
              <span class="elevator-format format-badge-${m.format.toLowerCase()}">${m.format}</span>
              ${m.isRecord ? '<span class="elevator-trophy">🏆</span>' : ''}
            </button>
          `).join('') : '<div class="elevator-empty">No match data</div>'}
        </div>

        <!-- FLOOR CONTENT -->
        <div class="floor-content" id="floor-content-area">
          ${match ? renderFloorContent(match, p) : renderCareerOverview(p)}
        </div>
      </div>
    </div>
  `;

  // Event handlers
  explorerEl.querySelector('#explorer-close-btn').addEventListener('click', closeFloorExplorer);
  explorerEl.querySelector('#explorer-overlay-bg').addEventListener('click', closeFloorExplorer);

  explorerEl.querySelectorAll('.elevator-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFloor = parseInt(btn.dataset.floor);
      renderExplorer();
    });
  });

  // Room tab handlers
  explorerEl.querySelectorAll('.room-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentRoom = tab.dataset.room;
      renderExplorer();
    });
  });
}

function renderCareerMini(p) {
  const totalRuns = (p.career.test?.runs || 0) + (p.career.odi?.runs || 0) + (p.career.t20i?.runs || 0);
  const totalWkts = (p.career.test?.wickets || 0) + (p.career.odi?.wickets || 0) + (p.career.t20i?.wickets || 0);
  const totalMatches = (p.career.test?.matches || 0) + (p.career.odi?.matches || 0) + (p.career.t20i?.matches || 0);
  const totalCenturies = (p.career.test?.hundreds || 0) + (p.career.odi?.hundreds || 0) + (p.career.t20i?.hundreds || 0);

  return `
    <div class="career-mini-bar">
      <div class="career-mini-stat"><span class="cmi-num">${totalMatches}</span><span class="cmi-label">MATCHES</span></div>
      <div class="career-mini-stat"><span class="cmi-num">${totalRuns.toLocaleString()}</span><span class="cmi-label">RUNS</span></div>
      <div class="career-mini-stat"><span class="cmi-num">${totalWkts}</span><span class="cmi-label">WICKETS</span></div>
      <div class="career-mini-stat"><span class="cmi-num">${totalCenturies}</span><span class="cmi-label">100s</span></div>
    </div>
  `;
}

function renderFloorContent(match, player) {
  const tabs = ['batting', 'bowling', 'records', 'gallery', 'charts'];

  return `
    <!-- FLOOR INDICATOR -->
    <div class="floor-indicator">
      <div class="floor-indicator-num">FLOOR ${match.num || currentFloor + 1} ${match.isRecord ? '🏆' : ''}</div>
      <div class="floor-indicator-sub">
        ${match.format} vs ${match.opponent} • ${match.venue}, ${match.year}
        ${match.isRecord ? ' • RECORD MATCH' : ''}
      </div>
    </div>

    <!-- MATCH CONTEXT -->
    <div class="match-context">
      <div class="context-badge format-badge-${match.format.toLowerCase()}">${match.format}</div>
      <div class="context-badge">${match.year}</div>
      <div class="context-badge">📍 ${match.venue}</div>
      <div class="context-badge">🆚 ${match.opponent}</div>
      ${match.isRecord ? '<div class="context-badge context-record">🏆 RECORD</div>' : ''}
    </div>

    <!-- ROOM TABS -->
    <div class="room-tabs">
      ${tabs.map(tab => `
        <button class="room-tab ${currentRoom === tab ? 'active' : ''}" data-room="${tab}" id="tab-${tab}">
          ${tab === 'batting' ? '🏏' : tab === 'bowling' ? '🎳' : tab === 'records' ? '🏆' : tab === 'gallery' ? '📸' : '📊'}
          ${tab.toUpperCase()}
        </button>
      `).join('')}
    </div>

    <!-- ROOM CONTENT -->
    <div class="room-content" id="room-display">
      ${renderRoom(match, player)}
    </div>
  `;
}

function renderRoom(match, player) {
  switch (currentRoom) {
    case 'batting': return renderBattingRoom(match);
    case 'bowling': return renderBowlingRoom(match);
    case 'records': return renderRecordsRoom(match, player);
    case 'gallery': return renderGalleryRoom(match, player);
    case 'charts': return renderChartsRoom(match, player);
    default: return renderBattingRoom(match);
  }
}

function renderBattingRoom(match) {
  if (!match.batting) {
    return `<div class="room-no-data"><div class="room-no-data-icon">🏏</div>Did not bat in this match</div>`;
  }

  const b = match.batting;
  const isCentury = b.runs >= 100;
  const isFifty = b.runs >= 50 && b.runs < 100;
  const isDuck = b.runs === 0;

  return `
    <div class="room-title">🏏 BATTING PERFORMANCE</div>
    ${getAwardBadges(b, 'batting')}

    <div class="room-stats-grid">
      <div class="room-stat-card ${isCentury ? 'highlight' : isFifty ? 'highlight-blue' : isDuck ? 'highlight-red' : ''}">
        <div class="room-stat-num">${b.runs}${b.dismissal === 'not out' ? '*' : ''}</div>
        <div class="room-stat-label">RUNS</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${b.balls}</div>
        <div class="room-stat-label">BALLS</div>
      </div>
      <div class="room-stat-card ${b.sr >= 100 ? 'highlight' : ''}">
        <div class="room-stat-num">${b.sr?.toFixed(1) || '-'}</div>
        <div class="room-stat-label">STRIKE RATE</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${b.fours || 0}</div>
        <div class="room-stat-label">FOURS</div>
      </div>
      <div class="room-stat-card ${(b.sixes || 0) >= 3 ? 'highlight' : ''}">
        <div class="room-stat-num">${b.sixes || 0}</div>
        <div class="room-stat-label">SIXES</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${b.dots || '-'}</div>
        <div class="room-stat-label">DOT BALLS</div>
      </div>
    </div>

    <!-- SCORING BREAKDOWN -->
    <div class="scoring-breakdown">
      <div class="breakdown-title">SCORING BREAKDOWN</div>
      <div class="breakdown-bars">
        ${renderScoringBar('dots', b.dots || 0, b.balls, '#555')}
        ${renderScoringBar('1s & 2s & 3s', Math.max(0, b.balls - (b.dots || 0) - (b.fours || 0) - (b.sixes || 0)), b.balls, '#3498db')}
        ${renderScoringBar('4s', (b.fours || 0), b.balls, '#2ecc71')}
        ${renderScoringBar('6s', (b.sixes || 0), b.balls, '#e74c3c')}
      </div>
    </div>

    ${b.dismissal ? `
      <div class="room-dismissal">
        <span class="dismissal-label">DISMISSAL</span>
        ${b.dismissal === 'not out' ? '✅ NOT OUT' : `❌ ${b.dismissal.toUpperCase()}`}
      </div>
    ` : ''}

    ${match.note ? `<div class="room-note ${match.isRecord ? 'note-record' : ''}">${match.note}</div>` : ''}
  `;
}

function renderBowlingRoom(match) {
  if (!match.bowling || (match.bowling.overs === 0 && match.bowling.wickets === 0)) {
    return `<div class="room-no-data"><div class="room-no-data-icon">🎳</div>Did not bowl in this match</div>`;
  }

  const bw = match.bowling;
  const isFifer = bw.wickets >= 5;
  const isHatTrick = bw.wickets >= 3;

  return `
    <div class="room-title">🎳 BOWLING PERFORMANCE</div>
    ${getAwardBadges(bw, 'bowling')}

    <div class="room-stats-grid">
      <div class="room-stat-card ${isFifer ? 'highlight' : isHatTrick ? 'highlight-blue' : ''}">
        <div class="room-stat-num">${bw.wickets}</div>
        <div class="room-stat-label">WICKETS</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${bw.overs}</div>
        <div class="room-stat-label">OVERS</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${bw.runs}</div>
        <div class="room-stat-label">RUNS GIVEN</div>
      </div>
      <div class="room-stat-card ${bw.economy <= 3 ? 'highlight' : ''}">
        <div class="room-stat-num">${bw.economy?.toFixed(2) || (bw.overs > 0 ? (bw.runs / bw.overs).toFixed(2) : '-')}</div>
        <div class="room-stat-label">ECONOMY</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${bw.maidens || 0}</div>
        <div class="room-stat-label">MAIDENS</div>
      </div>
      <div class="room-stat-card">
        <div class="room-stat-num">${bw.wides || 0}/${bw.noBalls || 0}</div>
        <div class="room-stat-label">WIDES / NO BALLS</div>
      </div>
    </div>

    ${match.note ? `<div class="room-note ${match.isRecord ? 'note-record' : ''}">${match.note}</div>` : ''}
  `;
}

function renderRecordsRoom(match, player) {
  const records = player.records || [];
  return `
    <div class="room-title">🏆 RECORDS & ACHIEVEMENTS</div>

    <!-- Career Records -->
    <div class="records-section">
      <div class="records-section-title">CAREER RECORDS</div>
      <div class="records-list">
        ${records.map(r => `<div class="record-entry">${r}</div>`).join('')}
      </div>
    </div>

    <!-- Match-specific achievements -->
    ${match.isRecord ? `
      <div class="record-highlight">
        <div class="record-highlight-label">🏆 THIS MATCH — RECORD PERFORMANCE</div>
        <div class="record-highlight-text">${match.note || 'A standout performance in cricket history.'}</div>
      </div>
    ` : ''}

    <!-- Career milestones -->
    <div class="records-section">
      <div class="records-section-title">FORMAT BREAKDOWN</div>
      <div class="format-breakdown">
        ${player.career.test ? renderFormatCard('TEST', player.career.test, '#e74c3c') : ''}
        ${player.career.odi ? renderFormatCard('ODI', player.career.odi, '#3498db') : ''}
        ${player.career.t20i ? renderFormatCard('T20I', player.career.t20i, '#9b59b6') : ''}
      </div>
    </div>
  `;
}

function renderFormatCard(format, stats, color) {
  return `
    <div class="format-card" style="border-left: 3px solid ${color}">
      <div class="format-card-header" style="color: ${color}">${format}</div>
      <div class="format-card-stats">
        <span>${stats.matches} M</span>
        <span>${(stats.runs || 0).toLocaleString()} R</span>
        <span>${stats.wickets || 0} W</span>
        <span>${stats.hundreds || 0} 💯</span>
        <span>AVG ${stats.avg || '-'}</span>
      </div>
    </div>
  `;
}

function renderGalleryRoom(match, player) {
  return `
    <div class="room-title">📸 MATCH GALLERY</div>
    <div class="gallery-grid">
      <div class="gallery-card">
        <div class="gallery-icon">🏟️</div>
        <div>
          <div class="gallery-venue">${match.venue}</div>
          <div class="gallery-year">${match.year} • ${match.format}</div>
        </div>
      </div>
      <div class="gallery-card">
        <div class="gallery-icon">${player.flag}</div>
        <div>
          <div class="gallery-venue">${player.country} vs ${match.opponent}</div>
          <div class="gallery-year">International Cricket</div>
        </div>
      </div>
      <div class="gallery-card">
        <div class="gallery-icon">${match.isRecord ? '🏆' : '🏏'}</div>
        <div>
          <div class="gallery-venue">${match.isRecord ? 'Record Match' : 'Standard Match'}</div>
          <div class="gallery-year">${match.note ? match.note.substring(0, 60) + '...' : 'Regular match'}</div>
        </div>
      </div>
      <div class="gallery-card">
        <div class="gallery-icon">${player.image}</div>
        <div>
          <div class="gallery-venue">${player.name}</div>
          <div class="gallery-year">${player.role} • ${player.debut}–${player.retired || 'Present'}</div>
        </div>
      </div>
    </div>
    ${match.note ? `<div class="room-note">${match.note}</div>` : ''}
  `;
}

function renderChartsRoom(match, player) {
  return `
    <div class="room-title">📊 VISUAL ANALYTICS</div>

    <!-- WAGON WHEEL -->
    ${match.batting ? `
      <div class="chart-section">
        <div class="chart-title">WAGON WHEEL — Shot Distribution</div>
        <div class="wagon-wheel-container">
          <canvas id="wagon-wheel-canvas" width="300" height="300"></canvas>
        </div>
      </div>
    ` : ''}

    <!-- MANHATTAN CHART -->
    ${match.batting ? `
      <div class="chart-section">
        <div class="chart-title">SCORING MANHATTAN</div>
        <div class="manhattan-container" id="manhattan-chart">
          ${renderManhattanChart(match.batting)}
        </div>
      </div>
    ` : ''}

    <!-- PERFORMANCE RADAR -->
    <div class="chart-section">
      <div class="chart-title">PERFORMANCE RATING</div>
      ${renderPerformanceRating(match, player)}
    </div>
  `;
}

function renderManhattanChart(batting) {
  if (!batting || !batting.balls) return '<div class="room-no-data">No data</div>';

  // Simulate over-by-over scoring from total stats
  const totalBalls = batting.balls;
  const totalRuns = batting.runs;
  const overs = Math.ceil(totalBalls / 6);
  const bars = [];

  let remaining = totalRuns;
  for (let i = 0; i < Math.min(overs, 20); i++) {
    const portion = Math.max(0, Math.floor(remaining / (overs - i) + (Math.random() - 0.3) * 4));
    const actual = Math.min(portion, remaining);
    bars.push(actual);
    remaining -= actual;
  }
  if (remaining > 0 && bars.length > 0) bars[bars.length - 1] += remaining;

  const maxRuns = Math.max(...bars, 1);
  return `
    <div class="manhattan-bars">
      ${bars.map((r, i) => {
        const h = Math.max(3, (r / maxRuns) * 80);
        const color = r >= 12 ? '#e74c3c' : r >= 8 ? '#f39c12' : r >= 4 ? '#2ecc71' : '#3498db';
        return `
          <div class="manhattan-bar-wrapper">
            <div class="manhattan-bar" style="height: ${h}px; background: ${color};">
              <span class="manhattan-value">${r}</span>
            </div>
            <div class="manhattan-label">${i + 1}</div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="manhattan-x-label">OVER NUMBER</div>
  `;
}

function renderPerformanceRating(match, player) {
  let rating = 5;
  if (match.batting) {
    if (match.batting.runs >= 100) rating = 10;
    else if (match.batting.runs >= 50) rating = 8;
    else if (match.batting.runs >= 30) rating = 6;
    else if (match.batting.runs >= 10) rating = 4;
    else rating = 2;
  }
  if (match.bowling && match.bowling.wickets >= 5) rating = 10;
  else if (match.bowling && match.bowling.wickets >= 3) rating = Math.max(rating, 8);
  if (match.isRecord) rating = 10;

  const stars = '★'.repeat(Math.min(rating, 10));
  const emptyStars = '☆'.repeat(Math.max(0, 10 - rating));

  return `
    <div class="perf-rating">
      <div class="perf-stars">${stars}${emptyStars}</div>
      <div class="perf-score">${rating}/10</div>
      <div class="perf-label">${rating >= 9 ? 'LEGENDARY' : rating >= 7 ? 'EXCELLENT' : rating >= 5 ? 'GOOD' : rating >= 3 ? 'AVERAGE' : 'POOR'}</div>
    </div>
  `;
}

function renderScoringBar(label, count, total, color) {
  const pct = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
  return `
    <div class="breakdown-row">
      <span class="breakdown-label">${label}</span>
      <div class="breakdown-bar-track">
        <div class="breakdown-bar-fill" style="width: ${pct}%; background: ${color};"></div>
      </div>
      <span class="breakdown-pct">${pct}%</span>
    </div>
  `;
}

function getAwardBadges(stats, type) {
  const badges = [];
  if (type === 'batting') {
    if (stats.runs >= 200) badges.push({ icon: '💎', label: 'DOUBLE CENTURY' });
    else if (stats.runs >= 100) badges.push({ icon: '💯', label: 'CENTURY' });
    else if (stats.runs >= 50) badges.push({ icon: '5️⃣0️⃣', label: 'HALF CENTURY' });
    if (stats.runs === 0 && stats.dismissal !== 'not out') badges.push({ icon: '🦆', label: 'DUCK' });
    if (stats.dismissal === 'not out') badges.push({ icon: '✅', label: 'NOT OUT' });
    if (stats.sr >= 150) badges.push({ icon: '⚡', label: 'BLAZING SR' });
    if (stats.sixes >= 5) badges.push({ icon: '💥', label: 'SIX-HITTER' });
  } else {
    if (stats.wickets >= 5) badges.push({ icon: '🔥', label: 'FIVE-FOR' });
    if (stats.wickets >= 3) badges.push({ icon: '🎯', label: 'THREE-FER' });
    if (stats.economy <= 3) badges.push({ icon: '🛡️', label: 'MISERLY' });
    if (stats.maidens >= 3) badges.push({ icon: '🧱', label: 'WALL' });
  }

  if (badges.length === 0) return '';

  return `
    <div class="award-badges">
      ${badges.map(b => `
        <div class="award-badge">
          <span class="badge-icon">${b.icon}</span>
          <span class="badge-label">${b.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderCareerOverview(player) {
  return `
    <div class="floor-indicator">
      <div class="floor-indicator-num">CAREER OVERVIEW</div>
      <div class="floor-indicator-sub">${player.flag} ${player.country} • ${player.role}</div>
    </div>
    <div class="career-overview-note">
      Select a floor on the left to explore match-by-match records.
      Each floor represents a notable match in ${player.name}'s career.
    </div>
    ${player.records ? `
      <div class="records-list" style="margin-top: 16px;">
        ${player.records.map(r => `<div class="record-entry">${r}</div>`).join('')}
      </div>
    ` : ''}
  `;
}
