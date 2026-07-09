// ============================================
// CRICKET CITY — AI Agent Chat Interface
// Search, research, and add players dynamically
// ============================================

import { CRICKET_KNOWLEDGE, searchPlayer, getResearchSummary } from '../data/knowledge.js';
import { players, PLAYER_ROLES } from '../data/players.js';

let isOpen = false;
let chatHistory = [];
let onPlayerAdded = null;

export function initCricketAgent(onAddPlayer) {
  onPlayerAdded = onAddPlayer;
  createAgentUI();
}

function createAgentUI() {
  // Floating button
  const fab = document.createElement('button');
  fab.id = 'agent-fab';
  fab.innerHTML = `<span class="agent-fab-icon">🤖</span><span class="agent-fab-text">AGENT</span>`;
  fab.addEventListener('click', toggleAgent);
  document.body.appendChild(fab);

  // Chat panel
  const panel = document.createElement('div');
  panel.id = 'agent-panel';
  panel.innerHTML = `
    <div class="agent-header">
      <div class="agent-header-info">
        <div class="agent-avatar">🤖</div>
        <div>
          <div class="agent-title">Cricket Scout AI</div>
          <div class="agent-subtitle">Research & add players to the city</div>
        </div>
      </div>
      <button class="agent-close" id="agent-close-btn">✕</button>
    </div>
    <div class="agent-messages" id="agent-messages"></div>
    <div class="agent-input-area">
      <input type="text" class="agent-input" id="agent-input" placeholder="Type a cricketer's name..." autocomplete="off" />
      <button class="agent-send" id="agent-send-btn">
        <span>→</span>
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  // Events
  document.getElementById('agent-close-btn').addEventListener('click', toggleAgent);
  document.getElementById('agent-send-btn').addEventListener('click', handleSend);
  document.getElementById('agent-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Welcome message
  addBotMessage(`Hey! 👋 I'm the **Cricket Scout AI**.\n\nI can research any cricketer and add them to Cricket City! Try typing a player's name like:\n\n• \`Gavaskar\`\n• \`Ricky Ponting\`\n• \`Viv Richards\`\n• \`Chris Gayle\`\n\nI have data on **${Object.keys(CRICKET_KNOWLEDGE).length}** legendary players ready to add! 🏏`);
}

function toggleAgent() {
  isOpen = !isOpen;
  const panel = document.getElementById('agent-panel');
  const fab = document.getElementById('agent-fab');

  if (isOpen) {
    panel.classList.add('agent-open');
    fab.classList.add('fab-hidden');
    document.getElementById('agent-input').focus();
  } else {
    panel.classList.remove('agent-open');
    fab.classList.remove('fab-hidden');
  }
}

function handleSend() {
  const input = document.getElementById('agent-input');
  const query = input.value.trim();
  if (!query) return;

  // Add user message
  addUserMessage(query);
  input.value = '';

  // Process with typing delay
  addTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    processQuery(query);
  }, 800 + Math.random() * 600);
}

function processQuery(query) {
  const q = query.toLowerCase();

  // Check if already in city
  const existingPlayer = players.find(p => p.name.toLowerCase().includes(q) || q.includes(p.name.toLowerCase().split(' ').pop().toLowerCase()));
  if (existingPlayer) {
    addBotMessage(`**${existingPlayer.name}** is already in Cricket City! 🏙️\n\n${existingPlayer.flag} ${existingPlayer.country} • ${existingPlayer.role}\n\nYou can find their building in the 3D city view. Try clicking on it to explore their match records floor by floor!`);
    return;
  }

  // Search knowledge base
  const results = searchPlayer(query);

  if (results.length === 0) {
    addBotMessage(`I couldn't find **"${query}"** in my database yet. 🔍\n\nHere are some players I can add:\n${getAvailableList()}\n\nTry one of these names!`);
    return;
  }

  if (results.length === 1) {
    showResearchAndAdd(results[0].data);
  } else {
    // Multiple matches
    const matchList = results.map(r => `• **${r.name}** (${r.data.country})`).join('\n');
    addBotMessage(`I found multiple matches:\n\n${matchList}\n\nWhich player did you mean? Type their full name.`);
  }
}

function showResearchAndAdd(playerData) {
  const summary = getResearchSummary(playerData);
  const p = playerData;

  const researchMsg = `🔍 **Researching ${p.name}...**\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `${p.flag} **${p.name}**\n` +
    `${p.country} • ${p.role} • ${p.debut}–${p.retired || 'PRESENT'}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📊 **Career Stats:**\n` +
    `• ${summary.totalMatches.toLocaleString()} matches across ${summary.formats.join(', ')}\n` +
    `• ${summary.totalRuns.toLocaleString()} total runs\n` +
    `• ${summary.totalWickets.toLocaleString()} total wickets\n\n` +
    `🏆 **${summary.recordCount} Records Found**\n` +
    (p.records ? p.records.slice(0, 3).map(r => `  ${r}`).join('\n') : '') +
    `\n\n📁 **${summary.matchCount} Match Records** available`;

  addBotMessage(researchMsg);

  // After showing research, add the "Add to City" button
  setTimeout(() => {
    addBotMessageWithAction(
      `✅ Research complete! Would you like me to add **${p.name}** to Cricket City?`,
      `🏗️ Add ${p.name} to City`,
      () => addPlayerToCity(p)
    );
  }, 1000);
}

function addPlayerToCity(playerData) {
  // Check if already added
  const alreadyExists = players.find(p => p.id === playerData.id);
  if (alreadyExists) {
    addBotMessage(`**${playerData.name}** is already in the city! 🏙️`);
    return;
  }

  // Map role string to PLAYER_ROLES enum
  let role;
  switch (playerData.role) {
    case 'Bowler': role = PLAYER_ROLES.BOWLER; break;
    case 'All-Rounder': role = PLAYER_ROLES.ALLROUNDER; break;
    case 'WK-Batter': role = PLAYER_ROLES.WK_BATTER; break;
    default: role = PLAYER_ROLES.BATTER;
  }

  const newPlayer = {
    ...playerData,
    role
  };

  // Add to global players array
  players.push(newPlayer);

  addBotMessage(
    `🏗️ **Building constructed!**\n\n` +
    `**${playerData.name}** has been added to Cricket City! 🎉\n\n` +
    `${playerData.flag} Their skyscraper is now standing tall with **${playerData.matches?.length || 0} floors** of match records.\n\n` +
    `Switch to **ALL** view or **🌍 WORLD MAP** to see their building. Click it to explore their floors!`
  );

  // Trigger callback to reload city
  if (onPlayerAdded) {
    onPlayerAdded(newPlayer);
  }
}

function getAvailableList() {
  const existingIds = new Set(players.map(p => p.id));
  const available = Object.entries(CRICKET_KNOWLEDGE)
    .filter(([_, data]) => !existingIds.has(data.id))
    .slice(0, 5)
    .map(([name, data]) => `• **${name}** (${data.flag} ${data.country})`)
    .join('\n');
  return available || 'All available players have been added!';
}

// ---- Message rendering ----

function addUserMessage(text) {
  chatHistory.push({ type: 'user', text });
  renderMessages();
}

function addBotMessage(text) {
  chatHistory.push({ type: 'bot', text });
  renderMessages();
}

function addBotMessageWithAction(text, buttonText, onClick) {
  chatHistory.push({ type: 'bot', text, action: { buttonText, onClick } });
  renderMessages();
}

function addTypingIndicator() {
  const container = document.getElementById('agent-messages');
  const typing = document.createElement('div');
  typing.className = 'agent-msg bot-msg typing-msg';
  typing.id = 'typing-indicator';
  typing.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

function renderMessages() {
  const container = document.getElementById('agent-messages');
  container.innerHTML = chatHistory.map((msg, i) => {
    if (msg.type === 'user') {
      return `
        <div class="agent-msg user-msg" style="animation-delay: ${i * 0.05}s">
          <div class="msg-content user-content">${escapeHtml(msg.text)}</div>
        </div>
      `;
    } else {
      const formatted = formatMarkdown(msg.text);
      const actionHTML = msg.action
        ? `<button class="agent-action-btn" data-action-idx="${i}">${msg.action.buttonText}</button>`
        : '';
      return `
        <div class="agent-msg bot-msg" style="animation-delay: ${i * 0.05}s">
          <div class="msg-avatar">🤖</div>
          <div class="msg-content">${formatted}${actionHTML}</div>
        </div>
      `;
    }
  }).join('');

  // Wire up action buttons
  container.querySelectorAll('.agent-action-btn').forEach(btn => {
    const idx = parseInt(btn.dataset.actionIdx);
    const msg = chatHistory[idx];
    if (msg && msg.action) {
      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.textContent = '✅ Added!';
        btn.classList.add('action-done');
        msg.action.onClick();
      });
    }
  });

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
    .replace(/━+/g, '<hr class="msg-divider">');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
