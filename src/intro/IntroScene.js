// ============================================
// CRICKET CITY — Cinematic Intro Scene (BEAST MODE)
// Stadium floodlights, fireworks, star field,
// multi-ball trajectories, typing title animation
// ============================================

export class IntroScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.floodlights = [];
    this.stars = [];
    this.fireworks = [];
    this.balls = [];
    this.isPlaying = false;
    this.startTime = 0;
    this.onComplete = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  start() {
    this.isPlaying = true;
    this.startTime = Date.now();
    this.initStarField();
    this.initParticles();
    this.initFloodlights();
    this.animate();
  }

  initStarField() {
    this.stars = [];
    for (let i = 0; i < 200; i++) {
      this.stars.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h * 0.6,
        size: Math.random() * 1.5 + 0.3,
        brightness: Math.random(),
        twinkleSpeed: Math.random() * 2 + 0.5
      });
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 200; i++) {
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        size: Math.random() * 2 + 0.3,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5,
        targetOpacity: 0
      });
    }
  }

  initFloodlights() {
    this.floodlights = [
      { x: this.w * 0.15, y: this.h * 0.2, on: false, brightness: 0, delay: 800 },
      { x: this.w * 0.85, y: this.h * 0.2, on: false, brightness: 0, delay: 1400 },
      { x: this.w * 0.1, y: this.h * 0.15, on: false, brightness: 0, delay: 2000 },
      { x: this.w * 0.9, y: this.h * 0.15, on: false, brightness: 0, delay: 2600 }
    ];
  }

  animate() {
    if (!this.isPlaying) return;
    requestAnimationFrame(() => this.animate());

    const elapsed = Date.now() - this.startTime;
    this.ctx.clearRect(0, 0, this.w, this.h);

    // Dark sky gradient
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.h);
    skyGrad.addColorStop(0, '#020810');
    skyGrad.addColorStop(0.4, '#050a14');
    skyGrad.addColorStop(1, '#0a1628');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.w, this.h);

    // Star field with twinkling
    this.drawStarField(elapsed);

    // Stadium silhouette
    this.drawStadiumSilhouette(elapsed);

    // Floodlight beams
    this.drawFloodlights(elapsed);

    // Dust particles in floodlight beams
    this.drawParticles(elapsed);

    // Multiple cricket ball trajectories
    this.drawBallTrajectories(elapsed);

    // Fireworks after floodlights
    this.drawFireworks(elapsed);

    // Ground glow
    if (elapsed > 1500) {
      const glowIntensity = Math.min((elapsed - 1500) / 2000, 0.3);
      const gradient = this.ctx.createRadialGradient(
        this.w / 2, this.h, 0,
        this.w / 2, this.h, this.h * 0.6
      );
      gradient.addColorStop(0, `rgba(26, 71, 42, ${glowIntensity})`);
      gradient.addColorStop(1, 'rgba(26, 71, 42, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.w, this.h);
    }

    // Show title after floodlights with typing class
    if (elapsed > 3200) {
      const titleEl = document.getElementById('intro-title');
      if (titleEl && !titleEl.classList.contains('visible')) {
        titleEl.classList.add('visible');
      }
    }

    // Subtitle typing animation
    if (elapsed > 4000) {
      const subEl = document.getElementById('intro-subtitle');
      if (subEl && !subEl.classList.contains('visible')) {
        subEl.classList.add('visible');
      }
    }
  }

  drawStarField(elapsed) {
    this.stars.forEach(star => {
      const twinkle = Math.sin(elapsed * 0.001 * star.twinkleSpeed) * 0.3 + 0.7;
      const opacity = star.brightness * twinkle * Math.min(elapsed / 1000, 0.8);

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(200, 210, 230, ${opacity})`;
      this.ctx.fill();

      // Star glow for bright ones
      if (star.brightness > 0.8) {
        const glow = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        glow.addColorStop(0, `rgba(200, 210, 230, ${opacity * 0.3})`);
        glow.addColorStop(1, 'rgba(200, 210, 230, 0)');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  drawStadiumSilhouette(elapsed) {
    const opacity = Math.min(elapsed / 2000, 0.4);
    this.ctx.fillStyle = `rgba(15, 25, 35, ${opacity})`;

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.h * 0.75);
    this.ctx.lineTo(this.w * 0.05, this.h * 0.55);
    this.ctx.lineTo(this.w * 0.08, this.h * 0.5);
    this.ctx.lineTo(this.w * 0.15, this.h * 0.45);
    this.ctx.lineTo(this.w * 0.14, this.h * 0.2);
    this.ctx.lineTo(this.w * 0.16, this.h * 0.2);
    this.ctx.lineTo(this.w * 0.17, this.h * 0.42);
    this.ctx.quadraticCurveTo(this.w * 0.5, this.h * 0.35, this.w * 0.83, this.h * 0.42);
    this.ctx.lineTo(this.w * 0.84, this.h * 0.2);
    this.ctx.lineTo(this.w * 0.86, this.h * 0.2);
    this.ctx.lineTo(this.w * 0.85, this.h * 0.45);
    this.ctx.lineTo(this.w * 0.92, this.h * 0.5);
    this.ctx.lineTo(this.w * 0.95, this.h * 0.55);
    this.ctx.lineTo(this.w, this.h * 0.75);
    this.ctx.lineTo(this.w, this.h);
    this.ctx.lineTo(0, this.h);
    this.ctx.closePath();
    this.ctx.fill();

    // Spectator dots in stands
    if (elapsed > 1200) {
      const spectatorOpacity = Math.min((elapsed - 1200) / 2000, 0.3);
      for (let i = 0; i < 60; i++) {
        const sx = this.w * 0.15 + Math.random() * this.w * 0.7;
        const sy = this.h * 0.42 + Math.random() * this.h * 0.2;
        this.ctx.fillStyle = `rgba(255, 234, 167, ${spectatorOpacity * Math.random()})`;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  drawFloodlights(elapsed) {
    this.floodlights.forEach((light) => {
      if (elapsed > light.delay) {
        light.on = true;
        const lightElapsed = elapsed - light.delay;
        if (lightElapsed < 400) {
          light.brightness = Math.random() > 0.3 ? 0.8 : 0.1;
        } else if (lightElapsed < 800) {
          light.brightness = Math.random() > 0.1 ? 0.9 : 0.3;
        } else {
          light.brightness = 0.85 + Math.sin(elapsed * 0.003) * 0.05;
        }
      }

      if (!light.on) return;

      // Bulb glow
      const bulbGrad = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 18);
      bulbGrad.addColorStop(0, `rgba(255, 234, 167, ${light.brightness})`);
      bulbGrad.addColorStop(0.5, `rgba(255, 234, 167, ${light.brightness * 0.4})`);
      bulbGrad.addColorStop(1, 'rgba(255, 234, 167, 0)');
      this.ctx.fillStyle = bulbGrad;
      this.ctx.fillRect(light.x - 22, light.y - 22, 44, 44);

      // Light cone
      const coneLen = this.h * 0.7;
      const coneWidth = 200;
      const centerX = this.w / 2;
      const targetX = light.x + (centerX - light.x) * 0.3;

      this.ctx.beginPath();
      this.ctx.moveTo(light.x, light.y);
      this.ctx.lineTo(targetX - coneWidth, light.y + coneLen);
      this.ctx.lineTo(targetX + coneWidth, light.y + coneLen);
      this.ctx.closePath();

      const coneGrad = this.ctx.createLinearGradient(light.x, light.y, light.x, light.y + coneLen);
      coneGrad.addColorStop(0, `rgba(255, 234, 167, ${light.brightness * 0.12})`);
      coneGrad.addColorStop(0.4, `rgba(255, 234, 167, ${light.brightness * 0.05})`);
      coneGrad.addColorStop(1, 'rgba(255, 234, 167, 0)');
      this.ctx.fillStyle = coneGrad;
      this.ctx.fill();
    });
  }

  drawParticles(elapsed) {
    const activeFloodlights = this.floodlights.filter(f => f.on);
    if (activeFloodlights.length === 0) return;

    this.particles.forEach(p => {
      p.y -= p.speed;
      p.x += Math.sin(elapsed * 0.001 + p.y * 0.01) * 0.3;
      if (p.y < 0) { p.y = this.h; p.x = Math.random() * this.w; }

      let inCone = false;
      activeFloodlights.forEach(light => {
        const dx = Math.abs(p.x - light.x);
        const dy = p.y - light.y;
        if (dy > 0 && dx < dy * 0.5) inCone = true;
      });

      p.targetOpacity = inCone ? 0.6 : 0.08;
      p.opacity += (p.targetOpacity - p.opacity) * 0.05;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 234, 167, ${p.opacity})`;
      this.ctx.fill();
    });
  }

  drawBallTrajectories(elapsed) {
    // Multiple balls at different times
    const ballConfigs = [
      { start: 2800, duration: 1200, sx: 0.12, sy: 0.72, ex: 0.50, ey: 0.42, cx: 0.30, cy: 0.1, color: [192, 57, 43] },
      { start: 3400, duration: 1000, sx: 0.85, sy: 0.68, ex: 0.55, ey: 0.48, cx: 0.70, cy: 0.15, color: [231, 76, 60] },
      { start: 4000, duration: 800,  sx: 0.20, sy: 0.65, ex: 0.80, ey: 0.45, cx: 0.50, cy: 0.05, color: [255, 255, 255] },
    ];

    ballConfigs.forEach(cfg => {
      const t = elapsed - cfg.start;
      if (t < 0 || t > cfg.duration) return;
      const progress = t / cfg.duration;

      const sx = this.w * cfg.sx, sy = this.h * cfg.sy;
      const ex = this.w * cfg.ex, ey = this.h * cfg.ey;
      const ccx = this.w * cfg.cx, ccy = this.h * cfg.cy;

      const x = (1 - progress) ** 2 * sx + 2 * (1 - progress) * progress * ccx + progress ** 2 * ex;
      const y = (1 - progress) ** 2 * sy + 2 * (1 - progress) * progress * ccy + progress ** 2 * ey;

      // Ball glow
      const ballGrad = this.ctx.createRadialGradient(x, y, 0, x, y, 22);
      ballGrad.addColorStop(0, `rgba(${cfg.color.join(',')}, 0.9)`);
      ballGrad.addColorStop(0.3, `rgba(${cfg.color.join(',')}, 0.3)`);
      ballGrad.addColorStop(1, `rgba(${cfg.color.join(',')}, 0)`);
      this.ctx.fillStyle = ballGrad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 22, 0, Math.PI * 2);
      this.ctx.fill();

      // Ball core
      this.ctx.fillStyle = `rgb(${cfg.color.join(',')})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2);
      this.ctx.fill();

      // Trail
      for (let i = 1; i <= 10; i++) {
        const tp = Math.max(0, progress - i * 0.018);
        const tx = (1 - tp) ** 2 * sx + 2 * (1 - tp) * tp * ccx + tp ** 2 * ex;
        const ty = (1 - tp) ** 2 * sy + 2 * (1 - tp) * tp * ccy + tp ** 2 * ey;
        this.ctx.fillStyle = `rgba(${cfg.color.join(',')}, ${0.3 - i * 0.028})`;
        this.ctx.beginPath();
        this.ctx.arc(tx, ty, 4 - i * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  drawFireworks(elapsed) {
    // Spawn fireworks after all floodlights are on
    if (elapsed < 3500) return;
    const fwElapsed = elapsed - 3500;

    // Trigger fireworks at intervals
    const fwTimes = [0, 400, 900, 1400, 2000];
    fwTimes.forEach((t, idx) => {
      if (fwElapsed < t || fwElapsed > t + 800) return;
      const progress = (fwElapsed - t) / 800;

      const cx = this.w * (0.2 + idx * 0.15);
      const cy = this.h * (0.15 + Math.sin(idx) * 0.1);

      const colors = [
        [212, 168, 67],
        [231, 76, 60],
        [52, 152, 219],
        [46, 204, 113],
        [155, 89, 182]
      ];
      const color = colors[idx % colors.length];

      // Burst particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = progress * 60;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius + progress * 20;
        const opacity = Math.max(0, 1 - progress * 1.3);

        this.ctx.fillStyle = `rgba(${color.join(',')}, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(px, py, 3 * (1 - progress * 0.5), 0, Math.PI * 2);
        this.ctx.fill();

        // Sparkle trail
        const sparkLen = progress * 30;
        const sx = px - Math.cos(angle) * sparkLen;
        const sy = py - Math.sin(angle) * sparkLen;
        this.ctx.strokeStyle = `rgba(${color.join(',')}, ${opacity * 0.4})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(px, py);
        this.ctx.stroke();
      }
    });
  }

  stop() {
    this.isPlaying = false;
  }
}
