const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 650);
});

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("active", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const petalLayer = document.getElementById("petalLayer");
const petalCount = window.innerWidth < 700 ? 11 : 18;

for (let i = 0; i < petalCount; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty("--fall", `${10 + Math.random() * 9}s`);
  petal.style.setProperty("--sway", `${2.7 + Math.random() * 3.8}s`);
  petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
  petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
  petal.style.transform = `scale(${0.65 + Math.random() * 0.8}) rotate(${Math.random() * 180}deg)`;
  petalLayer.appendChild(petal);
}

const scrollProgress = document.getElementById("scrollProgress");
const timelineFill = document.getElementById("timelineFill");
const portraitCard = document.getElementById("portraitCard");
const heroVisual = document.getElementById("heroVisual");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  if (portraitCard) {
    portraitCard.style.translate = `0 ${Math.min(scrollTop * 0.06, 24)}px`;
  }

  if (heroVisual) {
    heroVisual.style.translate = `0 ${Math.min(scrollTop * 0.025, 12)}px`;
  }

  if (timelineFill) {
    const timeline = timelineFill.parentElement.parentElement;
    const rect = timeline.getBoundingClientRect();
    const viewport = window.innerHeight;
    const visible = Math.min(Math.max((viewport - rect.top) / (rect.height + viewport * 0.35), 0), 1);
    timelineFill.style.height = `${visible * 100}%`;
  }

  document.querySelectorAll(".petal").forEach((petal, index) => {
    const speed = 0.02 + (index % 5) * 0.006;
    petal.style.marginTop = `${scrollTop * speed}px`;
  });
}, { passive: true });

document.querySelectorAll(".skill-orbit").forEach(el => {
  el.style.setProperty("--level", el.dataset.level || 70);
});

const cursorDot = document.getElementById("cursorDot");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button, .fold-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.width = "34px";
      cursorDot.style.height = "34px";
      cursorDot.style.background = "rgba(107,7,14,.10)";
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.style.width = "18px";
      cursorDot.style.height = "18px";
      cursorDot.style.background = "rgba(255,255,255,.28)";
    });
  });
}

const portrait = document.getElementById("portraitCard");
if (portrait && window.matchMedia("(pointer:fine)").matches) {
  portrait.addEventListener("mousemove", e => {
    const rect = portrait.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform = "";
  });
}
