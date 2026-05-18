// ============================================================
// THEME TOGGLE
// ============================================================

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const savedTheme =
  localStorage.getItem('portfolio-theme') || 'light';

applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {

  const current =
    html.getAttribute('data-theme');

  applyTheme(
    current === 'light'
      ? 'dark'
      : 'light'
  );
});

function applyTheme(theme) {

  html.setAttribute('data-theme', theme);

  localStorage.setItem(
    'portfolio-theme',
    theme
  );

  if (theme === 'dark') {

    themeIcon.textContent = '☀️';
    themeLabel.textContent = 'Light';

  } else {

    themeIcon.textContent = '🌙';
    themeLabel.textContent = 'Dark';
  }
}

// ============================================================
// NAVBAR + ACTIVE LINKS
// ============================================================

const navbar = document.getElementById('navbar');

const navLinks =
  document.querySelectorAll('.nav-link');

const sections =
  document.querySelectorAll('section[id]');

const backTop =
  document.getElementById('backTop');

window.addEventListener('scroll', () => {

  navbar.classList.toggle(
    'scrolled',
    window.scrollY > 20
  );

  if (backTop) {

    backTop.classList.toggle(
      'visible',
      window.scrollY > 300
    );
  }

  let current = '';

  sections.forEach(sec => {

    if (
      window.scrollY >= sec.offsetTop - 100
    ) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') ===
      '#' + current
    );
  });

  animateSkillBars();
});

// ============================================================
// MOBILE MENU
// ============================================================

const hamburger =
  document.getElementById('hamburger');

const navLinksEl =
  document.getElementById('navLinks');

hamburger.addEventListener('click', () => {

  hamburger.classList.toggle('open');

  navLinksEl.classList.toggle('open');
});

document
  .querySelectorAll('.nav-link')
  .forEach(link => {

    link.addEventListener('click', () => {

      hamburger.classList.remove('open');

      navLinksEl.classList.remove('open');
    });
  });

// ============================================================
// SKILL TABS
// ============================================================

document
  .querySelectorAll('.tab-btn')
  .forEach(btn => {

    btn.addEventListener('click', () => {

      const tab = btn.dataset.tab;

      document
        .querySelectorAll('.tab-btn')
        .forEach(b =>
          b.classList.remove('active')
        );

      btn.classList.add('active');

      document
        .querySelectorAll('.tab-content')
        .forEach(content =>
          content.classList.remove('active')
        );

      document
        .getElementById('tab-' + tab)
        .classList.add('active');

      if (tab === 'technical') {

        document
          .querySelectorAll('.skill-fill')
          .forEach(fill =>
            fill.classList.remove('animated')
          );

        setTimeout(() => {

          document
            .querySelectorAll('.skill-fill')
            .forEach(fill =>
              fill.classList.add('animated')
            );

        }, 100);
      }
    });
  });

// ============================================================
// SKILL BAR ANIMATION
// ============================================================

let barsAnimated = false;

function animateSkillBars() {

  if (barsAnimated) return;

  const skills =
    document.getElementById('skills');

  if (!skills) return;

  const rect =
    skills.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {

    document
      .querySelectorAll('.skill-fill')
      .forEach(fill =>
        fill.classList.add('animated')
      );

    barsAnimated = true;
  }
}

// ============================================================
// CONTACT FORM
// ============================================================

function submitForm(e) {

  e.preventDefault();

  const btn =
    e.target.querySelector(
      '[type="submit"]'
    );

  const originalText =
    btn.textContent;

  btn.textContent = 'Sending...';

  btn.disabled = true;

  setTimeout(() => {

    const success =
      document.getElementById(
        'formSuccess'
      );

    success.style.display = 'block';

    e.target.reset();

    btn.textContent =
      originalText;

    btn.disabled = false;

    setTimeout(() => {

      success.style.display = 'none';

    }, 4500);

  }, 1200);
}

// ============================================================
// DOWNLOAD CV BUTTON
// ============================================================

const cvBtn =
  document.getElementById('downloadCV');

if (cvBtn) {

  cvBtn.addEventListener('click', e => {

    e.preventDefault();

    cvBtn.textContent =
      '✅ CV Downloaded!';

    cvBtn.style.pointerEvents = 'none';

    setTimeout(() => {

      cvBtn.textContent =
        '⬇ Download CV';

      cvBtn.style.pointerEvents = '';

    }, 2500);
  });
}


// ============================================================
// INITIALIZE
// ============================================================

window.addEventListener('load', () => {
  animateSkillBars();
});