// ===============================
// LUXURY BIRTHDAY EXPERIENCE
// ATISH ❤️
// ===============================

// ===============================
// OPEN SURPRISE BUTTON
// ===============================

const openBtn = document.getElementById("openBtn");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    document.querySelector("#story").scrollIntoView({ behavior: "smooth" });
    triggerBurst();
    createHeartExplosion();
  });
}

// ===============================
// BURST OVERLAY (on open)
// ===============================

function triggerBurst() {
  const burst = document.getElementById("burstOverlay");
  if (!burst) return;
  burst.classList.remove("fire");
  // restart animation
  void burst.offsetWidth;
  burst.classList.add("fire");
}

// ===============================
// CONFETTI HELPER
// ===============================

function createHeartExplosion() {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 }
    });
  }
}

// ===============================
// LOVE QUIZ
// ===============================

const quizAnswer = document.getElementById("quizAnswer");
const heartExplosion = document.getElementById("heartExplosion");

function answerQuiz(btn) {
  document.querySelectorAll(".quiz-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  if (quizAnswer) quizAnswer.classList.add("show");

  spawnHeartBurst(heartExplosion);
  createHeartExplosion();
  launchHearts();
}

function spawnHeartBurst(container) {
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < 16; i++) {
    const span = document.createElement("span");
    span.textContent = "❤️";

    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 140;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const rot = Math.random() * 60 - 30;

    span.style.setProperty("--tx", `${tx}px`);
    span.style.setProperty("--ty", `${ty}px`);
    span.style.setProperty("--rot", `${rot}deg`);

    container.appendChild(span);

    // force reflow then trigger animation class
    void span.offsetWidth;
    span.classList.add("go");

    setTimeout(() => span.remove(), 1500);
  }
}

// expose for inline onclick
window.answerQuiz = answerQuiz;

// ===============================
// 100 REASONS I LOVE YOU (flip cards)
// ===============================

const reasonsGrid = document.getElementById("reasonsGrid");
const reasonsCounter = document.getElementById("reasonsCounter");

const reasons = [
"Your smile","Your laugh","Your eyes","Your kindness","Your patience",
"Your intelligence","Your ambition","Your hugs","Your voice",
"The way you make me feel safe","Your honesty","Your loyalty","Your warmth",
"Your confidence","Your calm nature","Your support","Your love",
"Your dedication","Your focus","Your positivity","Your generosity",
"Your respect","Your maturity","Your sense of humor","Your strength",
"Your determination","Your care","Your affection","Your understanding",
"Your trust","Your loyalty","Your heart","Your passion","Your dreams",
"Your energy","Your patience with me","The way you listen",
"The way you protect me","The way you encourage me","The way you inspire me",
"The way you hold my hand","The way you look at me","The way you say my name",
"The way you remember things","The way you comfort me",
"The way you celebrate my wins","The way you stand beside me",
"The way you never give up","The way you believe in us",
"The way you love deeply","Your confidence","Your charm","Your positivity",
"Your integrity","Your discipline","Your goals","Your leadership",
"Your curiosity","Your focus","Your resilience","Your sweetness",
"Your sincerity","Your authenticity","Your thoughtfulness","Your caring nature",
"Your protective side","Your gentle soul","Your adventurous spirit",
"Your hardworking mindset","Your dedication to growth","Your respect for others",
"Your emotional strength","Your ability to forgive","Your ability to motivate",
"Your patience in tough times","Your optimism","Your appreciation",
"Your compassion","Your confidence in me","Your belief in our future",
"The way you make me smile","The way you make me laugh",
"The way you calm my worries","The way you make ordinary moments special",
"The way you understand me","The way you value relationships",
"The way you dream big","The way you stay grounded",
"The way you make me feel loved","The way you make me feel beautiful",
"The way you make me feel important","The way you celebrate life",
"The way you choose love","The way you show up","The way you care",
"The way you exist","Everything about you","My favorite human ❤️"
];

let revealedCount = 0;

if (reasonsGrid) {
  reasons.forEach((reason, index) => {
    const card = document.createElement("div");
    card.className = "flip-card";

    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-face flip-front">${index + 1}</div>
        <div class="flip-face flip-back">${reason}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (!card.classList.contains("flipped")) {
        card.classList.add("flipped");
        revealedCount++;
        if (reasonsCounter) {
          reasonsCounter.textContent = `${revealedCount} / ${reasons.length} revealed`;
        }
      }
    });

    reasonsGrid.appendChild(card);
  });

  // stagger-reveal cards as they enter view
  const flipObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          flipObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".flip-card").forEach(card => flipObserver.observe(card));
}

if (reasonsCounter) {
  reasonsCounter.textContent = `0 / ${reasons.length} revealed`;
}

// ===============================
// MESSAGE WALL
// ===============================

const messages = [
"You are my favourite person ❤️","You are my happy place ❤️",
"I would choose you every lifetime ❤️","You are my home ❤️",
"You are my forever ❤️","You are my peace ❤️","You are my comfort ❤️",
"You are my safe place ❤️","You are my sunshine ❤️","You are my best friend ❤️",
"You are my soulmate ❤️","You are my greatest blessing ❤️","You are my heart ❤️",
"You are my favorite hello ❤️","You are my favorite memory ❤️",
"You are my future ❤️","You are my dream ❤️","You are my reason to smile ❤️",
"You are my favorite adventure ❤️","You are my strength ❤️","You are my calm ❤️",
"You are my happiness ❤️","You are my person ❤️","You are my everything ❤️",
"Forever us ❤️"
];

const wall = document.getElementById("messageWall");

if (wall) {
  messages.forEach((msg, i) => {
    const card = document.createElement("div");
    card.className = "msg-card";
    card.innerHTML = `<span class="heart-mark">❤</span>${msg.replace(" ❤️", "")}`;
    wall.appendChild(card);
  });

  const wallObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          wallObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".msg-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    wallObserver.observe(card);
  });
}

// ===============================
// LOVE METER
// ===============================

const meterFill = document.getElementById("meterFill");
const meterPercent = document.getElementById("meterPercent");
const meterResult = document.getElementById("meterResult");
let meterStarted = false;

function startLoveMeter() {
  if (meterStarted || !meterFill) return;
  meterStarted = true;

  meterFill.style.width = "100%";

  let count = 0;
  const interval = setInterval(() => {
    count += 4;
    if (meterPercent) meterPercent.textContent = `${Math.min(count, 9999)}%`;

    if (count >= 9999) {
      clearInterval(interval);
      if (meterPercent) meterPercent.textContent = "∞%";
      if (meterResult) meterResult.classList.add("show");
      createHeartExplosion();
    }
  }, 20);
}

if (meterFill) {
  const meterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startLoveMeter();
          meterObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  meterObserver.observe(document.getElementById("lovemeter"));
}

// ===============================
// CAKE INTERACTION
// ===============================

const cakeWrap = document.getElementById("cakeWrap");
const cakeResult = document.getElementById("cakeResult");
let cakeBlown = false;

function blowCandles() {
  if (cakeBlown || !cakeWrap) return;
  cakeBlown = true;

  cakeWrap.classList.add("blown");

  if (typeof confetti !== "undefined") {
    confetti({ particleCount: 300, spread: 180 });
  }

  launchFireworks();
  launchConfettiPieces();
  launchHearts();

  if (cakeResult) cakeResult.classList.add("show");
}

window.blowCandles = blowCandles;

function launchConfettiPieces() {
  const wrap = document.getElementById("confettiWrap");
  if (!wrap) return;

  const colors = ["#E0BFB8", "#E7C873", "#FCE7F3", "#FFFFFF"];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    wrap.appendChild(piece);

    void piece.offsetWidth;
    piece.classList.add("go");

    setTimeout(() => piece.remove(), 3600);
  }
}

// ===============================
// FUTURE US SECTION (line-by-line reveal)
// ===============================

const futureSequence = document.getElementById("futureSequence");
const finalVow = document.getElementById("finalVow");

if (futureSequence) {
  const futureObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll(".future-line");
          lines.forEach((line, i) => {
            setTimeout(() => line.classList.add("show"), i * 450);
          });

          if (finalVow) {
            setTimeout(() => finalVow.classList.add("show"), lines.length * 450 + 300);
          }

          futureObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  futureObserver.observe(futureSequence);
}

// ===============================
// FLOATING HEARTS (ambient)
// ===============================

function launchHearts() {
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("div");
    heart.className = "fh";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 16 + 12 + "px";
    heart.style.animationDuration = Math.random() * 4 + 5 + "s";
    heart.style.setProperty("--drift", `${Math.random() * 60 - 30}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }
}

setInterval(launchHearts, 6000);

// ===============================
// LETTER LINE-BY-LINE REVEAL
// ===============================

const letterCard = document.getElementById("letterCard");

if (letterCard) {
  const letterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll(".letter-line");
          lines.forEach((line, i) => {
            setTimeout(() => line.classList.add("shown"), i * 350);
          });
          letterObserver.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  letterObserver.observe(letterCard);
}

// ===============================
// SPECIAL LIST (staggered reveal)
// ===============================

const specialList = document.getElementById("specialList");

if (specialList) {
  const specialObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".special-item");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("show"), i * 180);
          });
          specialObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  specialObserver.observe(specialList);
}

// ===============================
// FIREWORKS (canvas-confetti side bursts)
// ===============================

function launchFireworks() {
  if (typeof confetti === "undefined") return;

  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 } });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 } });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

// ===============================
// SCROLL REVEAL (.screen sections)
// ===============================

const revealElements = document.querySelectorAll(".screen");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===============================
// FINALE SECTION (sequential reveal)
// ===============================

const finaleIds = ["fl1", "fl2", "fl3", "fl4", "finaleName", "finaleThankYou", "finaleHappy", "madeWith"];

const finaleSection = document.getElementById("finale");

if (finaleSection) {
  const finaleObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          finaleIds.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.classList.add("show"), i * 400);
          });
          finaleObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  finaleObserver.observe(finaleSection);
}

// ===============================
// SCROLL PROGRESS BAR
// ===============================

const progressFill = document.getElementById("progressFill");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressFill) progressFill.style.width = `${pct}%`;

  const hint = document.getElementById("scrollHint");
  if (hint) hint.style.opacity = scrollTop > 40 ? "0" : "1";
});

// ===============================
// CURSOR GLOW (desktop only)
// ===============================

const cursorGlow = document.getElementById("cursor-glow");

window.addEventListener("mousemove", e => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// ===============================
// AMBIENT PARTICLES
// ===============================

function spawnParticle() {
  const container = document.getElementById("particles");
  if (!container) return;

  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = Math.random() * 8 + 6 + "s";
  container.appendChild(p);

  setTimeout(() => p.remove(), 14000);
}

setInterval(spawnParticle, 800);

// ===============================
// SHOOTING STARS
// ===============================

function createShootingStar() {
  const container = document.getElementById("shootingStars");
  if (!container) return;

  const star = document.createElement("div");
  star.className = "shoot";
  star.style.top = Math.random() * 220 + "px";
  star.style.left = Math.random() * 60 + 20 + "%";
  star.style.animation = "shootMove 1.4s ease-out forwards";

  container.appendChild(star);
  setTimeout(() => star.remove(), 1600);
}

setInterval(createShootingStar, 3500);

// ===============================
// MARATHI PETALS
// ===============================

function spawnPetal() {
  const container = document.getElementById("petalsContainer");
  if (!container) return;

  const petal = document.createElement("div");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = Math.random() * 5 + 6 + "s";
  petal.style.setProperty("--pdrift", `${Math.random() * 60 - 30}px`);

  container.appendChild(petal);
  setTimeout(() => petal.remove(), 11000);
}

const marathiSection = document.getElementById("marathi");
if (marathiSection) {
  let petalInterval = null;

  const petalObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !petalInterval) {
          petalInterval = setInterval(spawnPetal, 600);
        } else if (!entry.isIntersecting && petalInterval) {
          clearInterval(petalInterval);
          petalInterval = null;
        }
      });
    },
    { threshold: 0.1 }
  );

  petalObserver.observe(marathiSection);
}

// ===============================
// FOREVER HEARTS (finale ambient)
// ===============================

function spawnForeverHeart() {
  const container = document.getElementById("foreverHearts");
  if (!container) return;

  const h = document.createElement("div");
  h.className = "fh-forever";
  h.innerHTML = "❤";
  h.style.left = Math.random() * 100 + "%";
  h.style.animationDuration = Math.random() * 5 + 6 + "s";

  container.appendChild(h);
  setTimeout(() => h.remove(), 11000);
}

const finaleSectionForHearts = document.getElementById("finale");
if (finaleSectionForHearts) {
  let foreverInterval = null;

  const foreverObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !foreverInterval) {
          foreverInterval = setInterval(spawnForeverHeart, 700);
        } else if (!entry.isIntersecting && foreverInterval) {
          clearInterval(foreverInterval);
          foreverInterval = null;
        }
      });
    },
    { threshold: 0.1 }
  );

  foreverObserver.observe(finaleSectionForHearts);
}

// ===============================
// SOUND TOGGLE
// (no audio file provided — button toggles state visually;
//  add an <audio id="bgMusic"> tag + src and wire it here if you have a track)
// ===============================

const soundToggle = document.getElementById("soundToggle");
const bgMusic = document.getElementById("bgMusic"); // optional, add <audio> in HTML if desired

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    const isMuted = soundToggle.classList.contains("muted");

    if (bgMusic) {
      if (isMuted) {
        bgMusic.play().catch(() => {});
      } else {
        bgMusic.pause();
      }
    }

    soundToggle.classList.toggle("muted");
  });
}

// ===============================
// INITIAL LOAD
// ===============================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  document.querySelectorAll(".fade-seq").forEach(el => el.classList.add("go"));
  setTimeout(launchHearts, 1200);
});

// ===============================
// END
// ===============================
