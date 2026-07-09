// ============================================
// CRICKET CITY — History Timeline View
// ============================================

import { historyTimeline, teams } from '../data/history.js';

export function showHistoryView() {
  const view = document.getElementById('history-view');

  view.innerHTML = `
    <div class="history-container">
      <h1 class="history-title">THE <span class="title-accent">CRICKET</span> STORY</h1>
      <p style="text-align: center; color: var(--text-secondary); margin-bottom: 48px; font-size: 1rem; line-height: 1.7;">
        From 18th-century English fields to billion-dollar stadiums — the journey of the world's second most popular sport.
      </p>

      <div class="timeline">
        ${historyTimeline.map(item => `
          <div class="timeline-item">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-event">${item.event}</div>
            <div class="timeline-desc">${item.description}</div>
          </div>
        `).join('')}
      </div>

      <h2 class="history-title" style="margin-top: 80px; font-size: 2rem;">
        🏆 <span class="title-accent">WORLD CUP</span> CHAMPIONS
      </h2>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 32px;">
        ${teams.filter(t => t.worldCups.length > 0).map(team => `
          <div class="stat-card" style="padding: 20px;">
            <div style="font-size: 2rem; margin-bottom: 8px;">${team.flag}</div>
            <div style="font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 1px; color: var(--crease-white);">${team.name}</div>
            <div style="margin-top: 8px;">
              ${team.worldCups.map(wc => `<span class="floor-format" style="margin: 2px 4px 2px 0; display: inline-block; padding: 2px 8px; background: rgba(212,168,67,0.15); color: var(--stump-gold); border-radius: 4px; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 1px;">${wc}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  view.classList.remove('view-hidden');
  view.classList.add('view-visible');
}

export function hideHistoryView() {
  const view = document.getElementById('history-view');
  view.classList.remove('view-visible');
  view.classList.add('view-hidden');
}
