const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let W, H;
const particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.5 + 0.3;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = (Math.random() - 0.5) * 0.3;
    this.life = Math.random();

    const roll = Math.random();
    if (roll < 0.5)       this.color = '#a855f7'; // purple
    else if (roll < 0.75) this.color = '#ec4899'; // pink
    else                  this.color = '#6366f1'; // blue
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle    = this.color;
    ctx.globalAlpha  = this.life * 0.6;
    ctx.fill();
  }

  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= 0.002;

    const outOfBounds = this.x < 0 || this.x > W || this.y < 0 || this.y > H;
    if (this.life <= 0 || outOfBounds) this.reset();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle  = '#a855f7';
        ctx.globalAlpha  = (1 - dist / 100) * 0.15;
        ctx.lineWidth    = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  ctx.globalAlpha = 1;
  drawLines();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();


const rataRataEl = document.getElementById('rata-rata');
const avgScoreEl = document.getElementById('avg-score');

if (rataRataEl || avgScoreEl) {
  const scores = [100, 85, 100, 90]; // row 5 belum dinilai, tidak dihitung
  const avg    = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  if (rataRataEl) rataRataEl.textContent = avg;
  if (avgScoreEl) avgScoreEl.textContent = avg;
}


const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));


console.log('%c✦ Profil Siswa Kelas XI TIK', 'color:#a855f7; font-size:18px; font-weight:bold; font-family:monospace;');
console.log('%cDibuat dengan HTML, CSS & JavaScript 🚀',  'color:#ec4899; font-size:13px;');
console.log('%cKolese Kanisius Jakarta · 2024/2025',      'color:#6366f1; font-size:12px;');

setTimeout(() => {
  console.log('%c👋 Selamat datang di website portfolio Calvin Dharmawan!', 'color:#22d3ee; font-size:12px;');
}, 1500);


document.querySelectorAll('.btn-primary, .btn-ghost, .btn-project, .btn-back').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: 6px; height: 6px;
      left: ${x - 3}px; top: ${y - 3}px;
      background: rgba(255,255,255,0.5);
      transform: scale(0);
      animation: rippleAnim 0.55s ease-out forwards;
      pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(30); opacity: 0; }
  }
`;
document.head.appendChild(style);

