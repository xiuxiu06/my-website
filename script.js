gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin, MotionPathPlugin, Physics2DPlugin);

document.addEventListener('DOMContentLoaded', () => {
  let smoother = null;
  try {
    smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 2, effects: true, normalizeScroll: true });
  } catch (e) {}

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  if (document.querySelector('.box')) {
    gsap.from('.box', { duration: 1, y: 100, opacity: 0, stagger: 0.3 });
  }

  const horizontalSections = $$('.horizontal-section');
  const horizontalContainer = $('.horizontal-container');
  const horizontalSectionsWrap = $('.horizontal-sections');

  let horizontalScrollTween = null;
  if (horizontalSections.length && horizontalContainer && horizontalSectionsWrap) {
    horizontalScrollTween = gsap.to(horizontalSections, {
      xPercent: -100 * (horizontalSections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalContainer,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (horizontalSections.length - 1),
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: 'power1.inOut'
        },
        end: () => '+=' + (horizontalSectionsWrap.offsetWidth - window.innerWidth)
      }
    });

    const projectsHeader = $('#projects-header');
    if (projectsHeader) {
      ScrollTrigger.create({ trigger: horizontalContainer, start: 'top top', end: () => '+=' + (horizontalSectionsWrap.offsetWidth - window.innerWidth), pin: '#projects-header', pinSpacing: false });
    }
  }

  // SVG Motion Path Animation for About Section
  const svgStage = $('#svg-stage');
  const theLine = $('.theLine');
  const ball01 = $('.ball01');
  
  if (svgStage && theLine && ball01) {
    gsap.timeline({
      defaults: { duration: 1, ease: 'none' },
      scrollTrigger: {
        trigger: '#svg-stage',
        scrub: true,
        start: 'top 20%',
        end: 'bottom center'
      }
    })
    .to('.ball01', { duration: 0.01, autoAlpha: 1 })
    .from('.theLine', { drawSVG: 0 }, 0)
    .to('.ball01', {
      motionPath: {
        path: '.theLine',
        align: '.theLine',
        alignOrigin: [0.5, 0.5]
      }
    }, 0);
  }

  horizontalSections.forEach(section => {
    const box = section.querySelector('.box');
    if (box) gsap.from(box, { scale: 0, rotation: 180, scrollTrigger: { trigger: section, containerAnimation: horizontalScrollTween, start: 'left 80%', end: 'left 20%', scrub: true } });

    const projectCard = section.querySelector('.project-card');
    if (projectCard) {
      const ensureVideoLoaded = (video) => {
        if (!video) return;
        const src = video.querySelector('source[data-src]');
        if (src && !src.src) { src.src = src.getAttribute('data-src'); video.load(); }
      };
      const playVideo = (sec) => { const v = sec.querySelector('video'); const overlay = sec.querySelector('.play-overlay'); if (!v) return; ensureVideoLoaded(v); if (overlay) overlay.style.display = 'none'; v.play().catch(() => {}); };
      const pauseVideo = (sec) => { const v = sec.querySelector('video'); if (v) try { v.pause(); } catch (e) {} };

      gsap.fromTo(projectCard, { y: 40, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: section, containerAnimation: horizontalScrollTween, start: 'left center', end: 'right center', scrub: 0.6, toggleActions: 'play reverse play reverse', onEnter: () => playVideo(section), onEnterBack: () => playVideo(section), onLeave: () => pauseVideo(section), onLeaveBack: () => pauseVideo(section) } });
    }
  });

  $$('.project-video').forEach(pv => {
    const video = pv.querySelector('video');
    const src = video ? video.querySelector('source[data-src]') : null;
    const btn = pv.querySelector('.play-overlay');
    const load = () => { if (src && !src.src) { src.src = src.getAttribute('data-src'); video.load(); } };
    if (btn && video) btn.addEventListener('click', () => { load(); btn.style.display = 'none'; video.play().catch(() => {}); });
  });

  $$('.tech-card').forEach(card => {
    const inner = card.querySelector('.tech-card-inner');
    if (!inner) return;
    
    card.addEventListener('mouseenter', () => {
      gsap.to(inner, {
        rotationY: 180,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(inner, {
        rotationY: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => {
      const isFlipped = gsap.getProperty(inner, 'rotationY') !== 0;
      gsap.to(inner, {
        rotationY: isFlipped ? 0 : 180,
        duration: 1,
        ease: 'back.out(1.2)'
      });
    });
    
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isFlipped = gsap.getProperty(inner, 'rotationY') !== 0;
        gsap.to(inner, {
          rotationY: isFlipped ? 0 : 180,
          duration: 1,
          ease: 'back.out(1.2)'
        });
      }
    });
  });

  const runningBanner = $('#running-banner');
  if (runningBanner) {
    const l1 = runningBanner.querySelector('.line1');
    const l2 = runningBanner.querySelector('.line2');
    const extend = (line) => { const children = Array.from(line.children); if (!children.length) return; while (line.scrollWidth < window.innerWidth * 2.2) children.forEach(ch => line.appendChild(ch.cloneNode(true))); };
    extend(l1); extend(l2); gsap.set(l1, { xPercent: 0 }); gsap.set(l2, { xPercent: -50 }); gsap.timeline({ scrollTrigger: { trigger: runningBanner, start: 'top center', end: '+=800', scrub: true } }).to(l1, { xPercent: -50, ease: 'none' }, 0).to(l2, { xPercent: 0, ease: 'none' }, 0);
  }

  (function navBehavior() {
    const menuBtn = $('#menu');
    const navEl = $('nav');
    const links = $$('nav .links a');
    if (menuBtn && navEl) {
      menuBtn.setAttribute('role', 'button');
      if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');
      const updateMenuIcon = (open) => {
        const icon = menuBtn.querySelector('i');
        if (icon) { icon.classList.toggle('bx-menu-right', !open); icon.classList.toggle('bx-x', open); }
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      menuBtn.addEventListener('click', () => { const open = navEl.classList.toggle('menu-open'); updateMenuIcon(open); document.body.classList.toggle('menu-open', open); if (open) { const first = navEl.querySelector('.links a'); if (first) first.focus(); } else menuBtn.focus(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navEl.classList.contains('menu-open')) { navEl.classList.remove('menu-open'); updateMenuIcon(false); document.body.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); } });
      document.addEventListener('click', (e) => { if (!navEl.classList.contains('menu-open')) return; if (e.target.closest('nav')) return; navEl.classList.remove('menu-open'); updateMenuIcon(false); document.body.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); });
    }

    const findIdInsensitive = (id) => { if (!id) return null; const e = document.getElementById(id); if (e) return e; const lower = id.toLowerCase(); return $$('[id]').find(el => el.id && el.id.toLowerCase() === lower) || null; };
    const scrollTo = (el, alignTop = false) => { if (!el) return; const hasSmoother = !!smoother; const current = hasSmoother ? smoother.scrollTop() : (window.pageYOffset || document.documentElement.scrollTop || 0); const r = el.getBoundingClientRect(); const elTopDoc = r.top + current; const navH = $('nav') ? $('nav').offsetHeight : 0; const target = alignTop ? Math.max(0, elTopDoc - navH) : Math.max(0, elTopDoc + r.height / 2 - ((window.innerHeight || document.documentElement.clientHeight) / 2) - navH / 2); if (hasSmoother) smoother.scrollTo(target, true, 'auto'); else window.scrollTo({ top: target, behavior: 'smooth' }); };

    links.forEach(a => a.addEventListener('click', e => { const href = a.getAttribute('href'); if (!href || !href.startsWith('#')) return; e.preventDefault(); const id = href.slice(1).trim(); const target = findIdInsensitive(id); if (!target) return; if (navEl.classList.contains('menu-open')) { navEl.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); } try { history.pushState(null, '', '#' + id); } catch (err) {} scrollTo(target, id.toLowerCase() === 'about'); }));

    const navContactBtn = $('nav .nav-btn');
    if (navContactBtn) navContactBtn.addEventListener('click', (e) => { e.preventDefault(); const id = 'contact'; const target = findIdInsensitive(id); if (!target) return; if (navEl.classList.contains('menu-open')) { navEl.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); } try { history.pushState(null, '', '#' + id); } catch (err) {} scrollTo(target); });

    const allAnchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    const pageAnchors = allAnchors.filter(a => !a.closest('nav .links'));
    pageAnchors.forEach(a => a.addEventListener('click', (e) => { const href = a.getAttribute('href'); if (!href || !href.startsWith('#')) return; e.preventDefault(); const id = href.slice(1).trim(); const target = findIdInsensitive(id); if (!target) return; if (navEl.classList.contains('menu-open')) { navEl.classList.remove('menu-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); } try { history.pushState(null, '', '#' + id); } catch (err) {} scrollTo(target, id.toLowerCase() === 'about'); }));
  })();

  (function hideNavOnScroll() { const nav = $('nav'); if (!nav) return; let last = (smoother && smoother.scrollTop) ? smoother.scrollTop() : (window.pageYOffset || document.documentElement.scrollTop || 0); let hidden = false; const TH = 3; gsap.ticker.add(() => { const current = (smoother && smoother.scrollTop) ? smoother.scrollTop() : (window.pageYOffset || document.documentElement.scrollTop || 0); const d = current - last; if (Math.abs(d) < 0.5) return; if (d > TH && !hidden) { nav.classList.add('nav-hidden'); hidden = true; } else if (d < -TH && hidden) { nav.classList.remove('nav-hidden'); hidden = false; } last = current; }); })();

  const spinEl = $('#spinImage');
  if (spinEl) {
    const stConfig = { trigger: spinEl, start: "top-=400", end: '+=800', scrub: true };
    gsap.to(spinEl, { rotate: -360, ease: 'none', scrollTrigger: stConfig });
    if (smoother) ScrollTrigger.refresh();
  }

  const spinEl2 = $('#spinImage2');
  if (spinEl2) {
    const stConfig = { trigger: spinEl2, start: "top-=1000", end: '+=1500', scrub: true };
    gsap.to(spinEl2, { rotate: -360, ease: 'none', scrollTrigger: stConfig });
    if (smoother) ScrollTrigger.refresh();
  }

  (function initCursor() {
    const media = window.matchMedia && window.matchMedia('(pointer: fine)');
    if (!media || !media.matches) return;

    const cursorWrap = document.querySelector('.custom-cursor');
    if (!cursorWrap) return;
    cursorWrap.setAttribute('aria-hidden', 'true');
    const dot = cursorWrap.querySelector('.cursor-dot');
    const ring = cursorWrap.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let lastX = mouseX, lastY = mouseY;
    const lerp = (a, b, n) => (a + (b - a) * n);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const tick = () => {
      lastX = lerp(lastX, mouseX, 0.18);
      lastY = lerp(lastY, mouseY, 0.18);
      gsap.set([dot, ring], { x: lastX, y: lastY });
    };
    gsap.ticker.add(tick);

    const onMouseMove = (e) => { cursorWrap.style.display = ''; mouseX = e.clientX; mouseY = e.clientY; };
    const hoverSelector = ['a', 'button', 'input', 'textarea', '.nav-btn', '.tech-card', '.repo-btn', '.demo-btn', '.menu-toggle'].join(',');
    const onOver = (e) => { if (e.target.closest && e.target.closest(hoverSelector)) cursorWrap.classList.add('hover'); };
    const onOut = (e) => { if (e.target.closest && e.target.closest(hoverSelector)) cursorWrap.classList.remove('hover'); };
    const onMouseDown = (e) => {
      cursorWrap.classList.add('active');
      const r = document.createElement('div');
      r.className = 'cursor-ripple';
      cursorWrap.appendChild(r);
      gsap.set(r, { xPercent: -50, yPercent: -50, x: e.clientX, y: e.clientY, opacity: 0.9, scale: 0.2 });
      gsap.to(r, { duration: 0.55, opacity: 0, scale: 3.0, ease: 'power2.out', onComplete: () => r.remove() });
    };
    const onMouseUp = () => cursorWrap.classList.remove('active');

    const onKeyDown = (e) => { if (e.key === 'Tab') cursorWrap.style.display = 'none'; };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);

    const teardown = () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keydown', onKeyDown);
    };
    window.addEventListener('pagehide', teardown);
    window.addEventListener('beforeunload', teardown);
  })();

  // SVG motion path demo (if present)
  if (document.querySelector('#rect') && document.querySelector('#path')) {
    gsap.to('#rect', {
      duration: 5,
      repeat: 12,
      repeatDelay: 3,
      yoyo: true,
      ease: 'power1.inOut',
      motionPath: { path: '#path', align: '#path', autoRotate: true, alignOrigin: [0.5, 0.5] }
    });
  }

  // Physics grid initialization - wait for ScrollTrigger to complete setup
  const initPhysicsGrid = () => {
    const gridContainer = document.querySelector('.grid');
    if (!gridContainer) {
      console.warn('[physics-grid] No .grid container found.');
      return;
    }

    // Function to generate grid cells based on viewport size
    const generateGrid = () => {
      const contact = document.querySelector('.contact');
      if (!contact) return;

      // Clear existing cells
      gridContainer.innerHTML = '';

      // Get computed grid properties
      const gridStyles = window.getComputedStyle(gridContainer);
      const columnSize = parseInt(gridStyles.gridAutoRows) || 80;
      const gap = parseInt(gridStyles.gap) || 12;
      const padding = parseInt(gridStyles.padding) || 20;

      // Calculate how many cells we need
      const containerWidth = contact.offsetWidth - (padding * 2);
      const containerHeight = contact.offsetHeight - (padding * 2);
      
      const cols = Math.floor((containerWidth + gap) / (columnSize + gap));
      const rows = Math.floor((containerHeight + gap) / (columnSize + gap));
      
      const totalCells = cols * rows;

      // Generate cells
      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const x = i % cols;
        const y = Math.floor(i / cols);
        cell.setAttribute('data-x', x);
        cell.setAttribute('data-y', y);
        gridContainer.appendChild(cell);
      }

      return gridContainer.querySelectorAll('.cell');
    };

    // Generate initial grid
    const cells = generateGrid();
    if (!cells || cells.length === 0) {
      console.warn('[physics-grid] No cells generated.');
      return;
    }

    const rows = []; // Not used in new implementation but kept for compatibility
    let cellsArray = Array.from(cells);

    let clicked = false;
    let reset_all = false;

    const pull_distance = 120;
    let interactionEnabled = false;

    const updateCellPositions = () => {
      if (!cellsArray || cellsArray.length === 0) return;
      let allValid = true;
      cellsArray.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        // Check if element is actually rendered
        if (rect.width === 0 || rect.height === 0) {
          allValid = false;
          return;
        }
        cell.center_position = {
          x: (rect.left + rect.right) / 2,
          y: (rect.top + rect.bottom) / 2,
        };
      });
      if (allValid) {
        interactionEnabled = true; // Enable interaction only when all positions are valid
      }
    };

    const handleCellClick = (e, i) => {
      if (clicked) return;
      clicked = true;

      gsap.to('.cell', {
        duration: 1.6,
        physics2D: {
          velocity: 'random(400, 1000)',
          angle: 'random(250, 290)',
          gravity: 2000
        },
        stagger: {
          amount: 0.3,
          from: i
        },
        onComplete: function () { this.timeScale(-1.3); },
        onReverseComplete: () => { clicked = false; reset_all = true; handlePointerMove(); },
      });
    };

    const handlePointerMove = (e = { clientX: -pull_distance * 2, clientY: -pull_distance * 2 }) => {
      if (clicked) return;
      if (!cellsArray || !cellsArray.length) return;
      if (!interactionEnabled) return; // Don't process until positions are calculated
      if (!cellsArray[0] || !cellsArray[0].center_position) {
        updateCellPositions();
        return;
      }

      const { clientX: pointer_x, clientY: pointer_y } = e || { clientX: -pull_distance * 2, clientY: -pull_distance * 2 };
      cellsArray.forEach((cell) => {
        if (!cell.center_position) return;
        const diff_x = pointer_x - cell.center_position.x;
        const diff_y = pointer_y - cell.center_position.y;
        const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (distance < pull_distance) {
          const percent = 1 - Math.min(distance / pull_distance, 1);
          const strength = 0.95;
          cell.pulled = true;
          gsap.to(cell, { duration: 0.18, x: diff_x * percent * strength, y: diff_y * percent * strength, ease: 'power2.out' });
        } else {
          if (!cell.pulled) return;
          cell.pulled = false;
          gsap.to(cell, { duration: 1, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
        }
      });

      if (reset_all) {
        reset_all = false;
        gsap.to(cellsArray, { duration: 1, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
      }
    };

    const init = () => {
      if (!cellsArray || cellsArray.length === 0) {
        console.warn('[physics-grid] No .cell elements found. Grid interaction disabled.');
        return;
      }

      const contact = document.querySelector('.contact');
      if (!contact) {
        console.warn('[physics-grid] No .contact element found.');
        return;
      }

      // Attach event listeners immediately
      window.addEventListener('pointermove', handlePointerMove);
      document.body.addEventListener('pointerleave', () => handlePointerMove({ clientX: -pull_distance * 2, clientY: -pull_distance * 2 }));
      
      // Regenerate grid on resize with debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          interactionEnabled = false;
          const newCells = generateGrid();
          if (newCells && newCells.length > 0) {
            cellsArray = Array.from(newCells);
            updateCellPositions();
            // Reattach click handlers to new cells
            cellsArray.forEach((cell, i) => cell.addEventListener('pointerup', (e) => handleCellClick(e, i)));
          }
        }, 150);
      });

      cellsArray.forEach((cell, i) => cell.addEventListener('pointerup', (e) => handleCellClick(e, i)));

      // Use IntersectionObserver to calculate positions when contact section is visible
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Contact section is visible - calculate positions now
            updateCellPositions();
            setTimeout(updateCellPositions, 50);
            setTimeout(updateCellPositions, 150);
          }
        });
      }, { threshold: 0.01 }); // Trigger as soon as any part is visible
      contactObserver.observe(contact);
      
      // Also calculate positions on scroll to ensure they're always accurate
      let scrollTimeout;
      const onScroll = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const rect = contact.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            updateCellPositions();
          }
        }, 50);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      if (smoother) {
        // If using ScrollSmoother, also hook into its scroll events
        smoother.scrollTrigger?.addEventListener?.('refresh', updateCellPositions);
      }
      if (contact) {
        contact.addEventListener('pointerup', (e) => {
          const interactive = e.target.closest && e.target.closest('a, button, input, textarea, select, label, .nav-btn, .tech-card, .repo-btn, .demo-btn');
          if (interactive) return;

          const px = e.clientX;
          const py = e.clientY;
          let bestIndex = -1;
          let bestDist = Infinity;
          cellsArray.forEach((cell, i) => {
            if (!cell.center_position) return;
            const dx = px - cell.center_position.x;
            const dy = py - cell.center_position.y;
            const d = Math.hypot(dx, dy);
            if (d < bestDist) { bestDist = d; bestIndex = i; }
          });

          if (bestIndex >= 0) handleCellClick(e, bestIndex);
        });
      }

      // Add a subtle 'Click anywhere' prompt and a cursor tooltip to invite interaction
      const clickPrompt = document.createElement('div');
      clickPrompt.className = 'click-prompt';
      clickPrompt.textContent = "Click anywhere";
      document.querySelector('.contact').appendChild(clickPrompt);

      const cursorPrompt = document.createElement('div');
      cursorPrompt.className = 'cursor-prompt';
      cursorPrompt.textContent = 'Click';
      document.body.appendChild(cursorPrompt);

      let promptShown = false;
      const showPromptOnce = () => {
        if (promptShown) return; promptShown = true;
        clickPrompt.classList.add('visible');
        setTimeout(() => clickPrompt.classList.remove('visible'), 4000);
      };

      let cursorTimer = null;
      const showCursorPrompt = (x, y) => {
        gsap.set(cursorPrompt, { x, y });
        cursorPrompt.classList.add('visible');
        if (cursorTimer) clearTimeout(cursorTimer);
        cursorTimer = setTimeout(() => cursorPrompt.classList.remove('visible'), 900);
      };

      const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

      if (isCoarse) {
        // On touch devices, show the click prompt when the contact section scrolls into view
        const io = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              showPromptOnce();
              obs.disconnect();
            }
          });
        }, { threshold: 0.12 });
        io.observe(contact);
      } else {
        // Fine pointer devices: show prompt on hover and show a small cursor tooltip
        contact.addEventListener('pointerenter', (e) => { showPromptOnce(); showCursorPrompt(e.clientX, e.clientY); });
        contact.addEventListener('pointermove', (e) => { if (cursorPrompt.classList.contains('visible')) gsap.set(cursorPrompt, { x: e.clientX, y: e.clientY }); });
      }

      // Hide prompts on first click so they don't get in the way
      const hideAllPrompts = () => { clickPrompt.classList.remove('visible'); cursorPrompt.classList.remove('visible'); };
      contact.addEventListener('pointerup', () => { hideAllPrompts(); });
      
      // Multiple position update attempts with proper timing
      // Wait for DOM to fully render before calculating positions
      requestAnimationFrame(() => {
        updateCellPositions();
        setTimeout(updateCellPositions, 50);
        setTimeout(updateCellPositions, 150);
        setTimeout(updateCellPositions, 300);
      });
      
      window.addEventListener('load', () => {
        updateCellPositions();
        setTimeout(updateCellPositions, 100);
        setTimeout(updateCellPositions, 250);
      });
      
      // refresh positions when ScrollTrigger refreshes (covers smoothers and other layout changes)
      if (window.ScrollTrigger && typeof ScrollTrigger.addEventListener === 'function') {
        ScrollTrigger.addEventListener('refresh', updateCellPositions);
      } else if (window.ScrollTrigger && ScrollTrigger.refresh) {
        // fallback: call once after a short delay in case ScrollTrigger isn't ready yet
        setTimeout(() => { try { ScrollTrigger.refresh(); } catch (e) {} }, 250);
      }
    };

    init();
  };

  // Wait for all ScrollTrigger instances to be created and settled before initializing physics grid
  // Also wait for potential layout shifts from ScrollSmoother
  setTimeout(() => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
    // Additional delay to ensure layout is stable
    setTimeout(() => {
      initPhysicsGrid();
    }, 100);
  }, 400);
});

