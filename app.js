// ==========================================
// KARKI AAYOG REPORT - INTERACTIVE APP
// ==========================================

(function () {
  // ---- Theme Toggle ----
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'dark'; // Default to dark mode always
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon();
      updateChartColors();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ---- Language Toggle ----
  const langToggle = document.getElementById('langToggle');
  const shareButton = document.getElementById('shareButton');
  const shareStatus = document.getElementById('shareStatus');
  let currentLang = 'en';
  let shareStatusTimer;

  function updateLocalizedLabels() {
    root.lang = currentLang === 'ne' ? 'ne' : 'en';

    if (shareButton) {
      shareButton.setAttribute(
        'aria-label',
        currentLang === 'ne' ? 'यो पृष्ठ साझा गर्नुहोस्' : 'Share this page'
      );
    }
  }

  function setShareStatus(enText, neText) {
    if (!shareStatus) return;
    shareStatus.dataset.en = enText;
    shareStatus.dataset.ne = neText;
    shareStatus.textContent = currentLang === 'ne' ? neText : enText;

    window.clearTimeout(shareStatusTimer);
    shareStatusTimer = window.setTimeout(() => {
      shareStatus.textContent = '';
      shareStatus.dataset.en = '';
      shareStatus.dataset.ne = '';
    }, 2600);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    const copied = document.execCommand('copy');
    tempInput.remove();

    if (!copied) {
      throw new Error('Clipboard copy failed');
    }
  }

  updateLocalizedLabels();

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ne' : 'en';
      root.setAttribute('data-lang', currentLang);
      
      // Toggle button appearance
      langToggle.classList.toggle('active-ne', currentLang === 'ne');
      langToggle.querySelector('.lang-label').textContent = currentLang === 'ne' ? 'EN' : 'ने';
      langToggle.setAttribute('aria-label', currentLang === 'ne' ? 'Switch to English' : 'नेपालीमा परिवर्तन गर्नुहोस्');
      updateLocalizedLabels();
      
      // Update all translatable elements
      document.querySelectorAll('[data-en][data-ne]').forEach(el => {
        const text = el.getAttribute('data-' + currentLang);
        if (text) {
          el.innerHTML = text;
        }
      });
    });
  }

  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const url = window.location.href;
      const shareText = currentLang === 'ne'
        ? 'कार्की आयोग प्रतिवेदनको यो सारांश हेर्नुहोस्।'
        : 'Check out this summary of the Karki Aayog report.';

      try {
        if (navigator.share) {
          await navigator.share({
            title: document.title,
            text: shareText,
            url,
          });
          setShareStatus('Page shared.', 'पृष्ठ साझा गरियो।');
          return;
        }

        await copyText(url);
        setShareStatus('Link copied to clipboard.', 'लिङ्क क्लिपबोर्डमा कपी गरियो।');
      } catch (error) {
        if (error && error.name === 'AbortError') return;

        try {
          await copyText(url);
          setShareStatus('Link copied to clipboard.', 'लिङ्क क्लिपबोर्डमा कपी गरियो।');
        } catch (copyError) {
          setShareStatus('Could not share this page.', 'यो पृष्ठ साझा गर्न सकिएन।');
        }
      }
    });
  }

  // ---- Mobile Menu ----
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ---- Timeline Day Tabs ----
  const dayTabs = document.querySelectorAll('.day-tab');
  const day1 = document.getElementById('timeline-day-1');
  const day2 = document.getElementById('timeline-day-2');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.day === '1') {
        day1.classList.remove('hidden');
        day2.classList.add('hidden');
      } else {
        day1.classList.add('hidden');
        day2.classList.remove('hidden');
      }
    });
  });

  // ---- Accountability Tabs ----
  const accTabs = document.querySelectorAll('.acc-tab');
  const accContents = document.querySelectorAll('.acc-content');

  accTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      accTabs.forEach(t => t.classList.remove('active'));
      accContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('acc-' + tab.dataset.acc);
      if (target) target.classList.add('active');
    });
  });

  // ---- Animated Counters ----
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(el => {
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      el.dataset.animated = 'true';
      const target = parseInt(el.dataset.count);
      const duration = 1500;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // ---- Scroll Reveal ----
  function setupReveal() {
    const items = document.querySelectorAll(
      '.info-card, .trigger-card, .tl-item, .kpi-card, .chart-card, .force-card, .damage-card, .failure-card, .rec-card, .person-card, .aftermath-item, .forensic-finding, .commission-quote, .chart-card-standalone, .martyr-card, .cabinet-card, .photo-break'
    );
    items.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
  }
  setupReveal();

  // ---- Chart Colors ----
  function getChartColors() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    return {
      accent: isDark ? '#c23b3b' : '#a12828',
      accent2: isDark ? '#d4a843' : '#b8931a',
      info: isDark ? '#5b8ec9' : '#3b6fa3',
      success: isDark ? '#4caf7a' : '#2d8a57',
      warning: isDark ? '#e0993e' : '#c07c1e',
      text: isDark ? '#d4d6dc' : '#1c1d20',
      textMuted: isDark ? '#8a8e9a' : '#6b6d74',
      textFaint: isDark ? '#585c68' : '#a0a2a8',
      surface: isDark ? '#1c1f28' : '#ffffff',
      divider: isDark ? '#2a2e38' : '#dddbd8',
      gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    };
  }

  // ---- Charts ----
  Chart.register(ChartDataLabels);
  Chart.defaults.font.family = "'Inter', sans-serif";

  let charts = {};

  function createCharts() {
    const c = getChartColors();

    // Deaths Breakdown (Doughnut)
    const deathsCtx = document.getElementById('deathsBreakdownChart');
    if (deathsCtx) {
      charts.deaths = new Chart(deathsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Protesters (gunfire)', 'Arson/fire deaths', 'Prisoners (shot escaping)', 'Police officers (mob)', 'Other/unidentified'],
          datasets: [{
            data: [22, 20, 10, 3, 21],
            backgroundColor: [c.accent, c.warning, c.info, c.success, c.textFaint],
            borderColor: c.surface,
            borderWidth: 3,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '55%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: c.textMuted,
                font: { size: 11 },
                padding: 12,
                usePointStyle: true,
                pointStyleWidth: 12
              }
            },
            datalabels: {
              color: '#fff',
              font: { weight: 'bold', size: 12 },
              formatter: (value) => value,
              display: (ctx) => ctx.dataset.data[ctx.dataIndex] > 5
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1,
              callbacks: {
                label: function (ctx) {
                  const pct = ((ctx.parsed / 76) * 100).toFixed(1);
                  return ctx.label + ': ' + ctx.parsed + ' (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }

    // Deaths by Day (Bar)
    const dayCtx = document.getElementById('deathsByDayChart');
    if (dayCtx) {
      charts.deathsByDay = new Chart(dayCtx, {
        type: 'bar',
        data: {
          labels: ['Day 1 (8 Sep)\nState Violence', 'Day 2 (9 Sep)\nMob Violence & Arson'],
          datasets: [{
            label: 'Deaths',
            data: [19, 57],
            backgroundColor: [c.accent, c.warning],
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: c.text,
              font: { weight: 'bold', size: 14 }
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1
            }
          },
          scales: {
            x: {
              grid: { color: c.gridColor },
              ticks: { color: c.textMuted, font: { size: 11 } },
              max: 70
            },
            y: {
              grid: { display: false },
              ticks: { color: c.text, font: { size: 12 } }
            }
          }
        }
      });
    }

    // Ammunition Chart (Bar)
    const ammoCtx = document.getElementById('ammunitionChart');
    if (ammoCtx) {
      charts.ammo = new Chart(ammoCtx, {
        type: 'bar',
        data: {
          labels: ['Tear Gas Shells', 'Live Bullets', 'Warning Shots', 'Rubber Bullets'],
          datasets: [{
            label: 'Rounds Fired',
            data: [6279, 2642, 2377, 1884],
            backgroundColor: [c.textFaint, c.accent, c.warning, c.info],
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: c.text,
              font: { weight: 'bold', size: 12 },
              formatter: (v) => v.toLocaleString()
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1,
              callbacks: {
                label: (ctx) => ctx.parsed.y.toLocaleString() + ' rounds'
              }
            }
          },
          scales: {
            y: {
              grid: { color: c.gridColor },
              ticks: { color: c.textMuted, font: { size: 11 }, callback: (v) => v.toLocaleString() }
            },
            x: {
              grid: { display: false },
              ticks: { color: c.text, font: { size: 11 } }
            }
          }
        }
      });
    }

    // Firing by Province (Horizontal Bar)
    const provinceCtx = document.getElementById('firingByProvinceChart');
    if (provinceCtx) {
      charts.province = new Chart(provinceCtx, {
        type: 'bar',
        data: {
          labels: ['Kathmandu Valley', 'Madhesh', 'Koshi', 'Karnali', 'Sudurpaschim', 'Lumbini', 'Gandaki', 'Other Bagmati'],
          datasets: [{
            label: 'Rounds Fired',
            data: [6891, 1921, 1568, 932, 763, 619, 306, 181],
            backgroundColor: [c.accent, c.warning, c.info, c.success, c.accent2, c.textFaint, '#7c6eb5', '#6c8c8c'],
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: c.text,
              font: { weight: 'bold', size: 11 },
              formatter: (v) => v.toLocaleString()
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1,
              callbacks: {
                label: (ctx) => ctx.parsed.x.toLocaleString() + ' rounds (' + ((ctx.parsed.x / 13182) * 100).toFixed(1) + '%)'
              }
            }
          },
          layout: { padding: { right: 50 } },
          scales: {
            x: {
              grid: { color: c.gridColor },
              ticks: { color: c.textMuted, font: { size: 10 }, callback: (v) => v.toLocaleString() }
            },
            y: {
              grid: { display: false },
              ticks: { color: c.text, font: { size: 11 } }
            }
          }
        }
      });
    }

    // Weapons Chart (Stacked Bar)
    const weaponsCtx = document.getElementById('weaponsChart');
    if (weaponsCtx) {
      charts.weapons = new Chart(weaponsCtx, {
        type: 'bar',
        data: {
          labels: ['Police Firearms (1,200+)', 'Ammunition (~100,000 rounds)'],
          datasets: [
            {
              label: 'Recovered',
              data: [700, 60000],
              backgroundColor: c.success,
              borderRadius: 4,
              borderSkipped: false
            },
            {
              label: 'Still Missing',
              data: [500, 40000],
              backgroundColor: c.accent,
              borderRadius: 4,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: c.textMuted, font: { size: 11 }, usePointStyle: true, pointStyleWidth: 12, padding: 16 }
            },
            datalabels: {
              color: '#fff',
              font: { weight: 'bold', size: 11 },
              formatter: (v) => v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v,
              display: (ctx) => ctx.dataset.data[ctx.dataIndex] > 100
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1,
              callbacks: {
                label: (ctx) => ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString()
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: { color: c.text, font: { size: 11 } }
            },
            y: {
              stacked: true,
              grid: { color: c.gridColor },
              ticks: { color: c.textMuted, font: { size: 10 }, callback: (v) => v >= 1000 ? (v / 1000) + 'K' : v }
            }
          }
        }
      });
    }

    // Accountability Chart (Doughnut)
    const accCtx = document.getElementById('accountabilityChart');
    if (accCtx) {
      charts.accountability = new Chart(accCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Criminal Investigation (3)',
            'Section 182 Action (4)',
            'Police Departmental (6)',
            'APF Departmental (3)',
            'Army - Military Act (4)',
            'NID - Special Service Act (2)',
            'Other/TOB Group (2+)'
          ],
          datasets: [{
            data: [3, 4, 6, 3, 4, 2, 2],
            backgroundColor: [c.accent, c.warning, c.info, '#7c6eb5', c.success, c.accent2, c.textFaint],
            borderColor: c.surface,
            borderWidth: 3,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '50%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: c.textMuted,
                font: { size: 11 },
                padding: 10,
                usePointStyle: true,
                pointStyleWidth: 12
              }
            },
            datalabels: {
              color: '#fff',
              font: { weight: 'bold', size: 13 },
              formatter: (value) => value
            },
            tooltip: {
              backgroundColor: c.surface,
              titleColor: c.text,
              bodyColor: c.textMuted,
              borderColor: c.divider,
              borderWidth: 1
            }
          }
        }
      });
    }
  }

  function updateChartColors() {
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
    createCharts();
  }

  createCharts();

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Active nav highlight on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--color-text)';
        link.style.background = 'var(--color-accent-muted)';
      }
    });
  }, { passive: true });

})();
