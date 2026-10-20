/* Simone Pagani — creative playground
   Menagrama, Big Mama Band, Panda Fight Club, Regina Maud,
   the email and Instagram are real.
   Photos, videos, the biography and the smaller projects are still empty. */

(function () {
  "use strict";

  var PROFILE = {
    kicker: "Note",
    body: "This paragraph is a placeholder. Replace it with Simone's biography.",
    contactKicker: "Signal",
    contactLead: "Send a note. It opens in your mail app, already addressed.",
    contact: "kilopertino@gmail.com",
    email: "kilopertino@gmail.com",
    instagram: "https://www.instagram.com/kilopertino/",
    instagramName: "kilopertino"
  };

  var SECTIONS = {
    circus: {
      title: "Circus",
      kicker: "Fire mode",
      lead: "A space for juggling, acrobatics and circus studies.",
      projects: [
        {
          name: "Juggling Studies",
          discipline: "Juggling",
          text: "Trajectories, catches and the rhythm of objects in the air.",
          motif: "orbit"
        },
        {
          name: "Acrobatic Practice",
          discipline: "Acrobatics",
          text: "Weight, support and lines held in balance.",
          motif: "stack"
        },
        {
          name: "Circus Projects",
          discipline: "Circus",
          text: "Sketches that place bodies, objects and space in the same frame.",
          motif: "ring"
        }
      ]
    },
    music: {
      title: "Music",
      kicker: "Portfolio",
      lead: "",
      kind: "music",
      featured: ["menagrama", "soulshake", "big-mama", "panda-fight-club", "regina-maud"],
      also: [
        { slot: "Big band", text: "Add the band, the role and the years." },
        { slot: "Big band", text: "Add the band, the role and the years." },
        { slot: "Big band", text: "Add the band, the role and the years." },
        { slot: "Other project", text: "Add the project and the role." },
        { slot: "Other project", text: "Add the project and the role." },
        { slot: "Other project", text: "Add the project and the role." }
      ]
    },
    menagrama: {
      kind: "band",
      title: "Menagrama",
      kicker: "Folk · Piano · Fisarmonica",
      lead: "Folk rock band comasca, attiva. Simone entra nel 2024.",
      story: "Dal 2024 Simone è in formazione come pianista e fisarmonicista — e, quando serve, sputafuoco. Folk, Irish, country e canti della tradizione: un set tra festa e nostalgia. ",
      links: [
        { label: "menagrama.it", href: "https://www.menagrama.it/" },
        { label: "Instagram", href: "https://www.instagram.com/menagrama_band/" }
      ],
      media: []
    },
    soulshake: {
      kind: "band",
      title: "SoulShake",
      kicker: "Weddings · Piano",
      lead: "Musica live per matrimoni ed eventi speciali.",
      story: "Pianista SoulShake dal periodo successivo al Covid. Mi occupo delle musiche per le cerimonie, sia in chiesa che civili: ascoltiamo i vostri gusti, scelgiamo i brani giusti e li porto al piano con un approccio elegante e leggero.",
      links: [
        { label: "soulshake.it", href: "https://soulshake.it/" },
        { label: "Instagram", href: "https://www.instagram.com/soulshaketrio/" }
      ],
      media: [
        { kind: "photo", src: "media/soulshake/soulshake-01.jpeg", alt: "Simone at the keys during a SoulShake set" },
        { kind: "photo", src: "media/soulshake/soulshake-02.jpeg", alt: "SoulShake trio performing at a wedding" },
        { kind: "photo", src: "media/soulshake/soulshake-03.jpeg", alt: "Simone playing piano in a patterned shirt" },
        { kind: "photo", src: "media/soulshake/soulshake-04.jpeg", alt: "SoulShake performing live at an event" },
        { kind: "photo", src: "media/soulshake/soulshake-05.jpeg", alt: "Simone on piano at a wedding venue" },
        { kind: "photo", src: "media/soulshake/soulshake-06.jpeg", alt: "Close moment of Simone playing with SoulShake" },
        { kind: "photo", src: "media/soulshake/soulshake-07.jpeg", alt: "Simone with piano-key tie at a church ceremony" },
        { kind: "photo", src: "media/soulshake/soulshake-08.jpeg", alt: "Simone playing keyboard beside a stone column" }
      ]
    },
    "big-mama": {
      kind: "band",
      title: "Big Mama Band",
      kicker: "Blues · Frontman",
      lead: "Blues band. Simone sang as frontman for many years. The band is no longer active.",
      media: [
        { kind: "photo", label: "Photo 1" },
        { kind: "photo", label: "Photo 2" },
        { kind: "photo", label: "Photo 3" },
        { kind: "video", label: "Video 1" },
        { kind: "video", label: "Video 2" }
      ]
    },
    "panda-fight-club": {
      kind: "band",
      title: "Panda Fight Club",
      kicker: "Prog · Frontman",
      lead: "Prog band. Simone sang as frontman.",
      links: [{ label: "Spotify", href: "" }],
      media: [
        { kind: "photo", label: "Photo 1" },
        { kind: "photo", label: "Photo 2" },
        { kind: "video", label: "Video 1" },
        { kind: "video", label: "Video 2" }
      ]
    },
    "regina-maud": {
      kind: "band",
      title: "Regina Maud",
      kicker: "Covers · Voice",
      lead: "Cover band from his younger years. Simone sang.",
      media: [
        { kind: "photo", label: "Photo 1" },
        { kind: "photo", label: "Photo 2" }
      ]
    },
    bio: {
      title: "Bio",
      kicker: "Note",
      lead: "Portraits and a short text. Both are waiting to be filled in.",
      kind: "bio",
      text: PROFILE.body,
      photos: ["Portrait 1", "Portrait 2", "Portrait 3", "Portrait 4"]
    },
    contact: {
      title: "Contact",
      kicker: "Signal",
      lead: PROFILE.contactLead,
      kind: "contact"
    }
  };

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mobileQuery = window.matchMedia("(max-width: 760px)");

  var els = {};
  var state = {
    mode: "playground",
    soundOn: false,
    audio: null,
    pointer: { x: -9999, y: -9999, inside: false },
    drag: null,
    balls: [],
    tokens: [],
    layout: null,
    haloR: 0,
    loop: 0,
    last: 0,
    ballSeq: [],
    dragTrail: [],
    beat: 1.5,
    flashTimer: 0,
    toastTimer: 0,
    ignoreCloseUntil: 0,
    lightbox: { shots: [], index: 0 }
  };

  function init() {
    cacheElements();
    buildModel();
    renderInfo();
    initThemes();
    initSound();
    initPiano();
    initLightbox();
    initPlayground();
    initDraggableObjects();
    initInteractions();
    initNavigation();
    renderFrame(performance.now(), 1);
    if (!reducedMotion.matches) startLoop();
    els.stage.classList.add("ready");
  }

  function cacheElements() {
    els.stage = document.getElementById("stage");
    els.field = document.getElementById("field");
    els.orbit = document.getElementById("orbit");
    els.flourish = document.getElementById("flourish");
    els.flourishPath = document.getElementById("flourish-path");
    els.halo = document.getElementById("halo");
    els.haloCircle = document.getElementById("halo-circle");
    els.haloInner = document.getElementById("halo-inner");
    els.waves = document.getElementById("waves");
    els.wavePaths = els.waves.querySelectorAll("path");
    els.dragTrail = document.getElementById("drag-trail");
    els.dragCircus = document.getElementById("drag-circus");
    els.dragMusic = document.getElementById("drag-music");
    els.dragBio = document.getElementById("drag-bio");
    els.dragContact = document.getElementById("drag-contact");
    els.piano = document.getElementById("piano");
    els.sheet = document.getElementById("sheet");
    els.info = document.getElementById("info");
    els.infoKicker = document.getElementById("info-kicker");
    els.infoBody = document.getElementById("info-body");
    els.infoContact = document.getElementById("info-contact");
    els.nameBtn = document.getElementById("open-info");
    els.infoClose = document.getElementById("info-close");
    els.sound = document.getElementById("sound-toggle");
    els.soundLabel = els.sound.querySelector(".sound-label");
    els.toast = document.getElementById("toast");
    els.lightbox = document.getElementById("lightbox");
    els.lightboxImage = document.getElementById("lightbox-image");
    els.lightboxClose = document.getElementById("lightbox-close");
    els.lightboxPrev = document.getElementById("lightbox-prev");
    els.lightboxNext = document.getElementById("lightbox-next");
  }

  function initThemes() {
    syncSectionTheme();
  }

  function sectionTheme(section) {
    var data = SECTIONS[section];
    if ((data && data.kind === "band") || section === "music") return "violet";
    if (section === "circus") return "red";
    if (section === "contact") return "lime";
    if (section === "bio") return "fire";
    return null;
  }

  function paintTheme(name) {
    var theme = name || "fire";
    if (theme === "fire") document.body.removeAttribute("data-theme");
    else document.body.setAttribute("data-theme", theme);
  }

  function syncSectionTheme() {
    var forced = state.mode && state.mode !== "playground" ? sectionTheme(state.mode) : null;
    paintTheme(forced || "fire");
  }

  function buildModel() {
    var ballDefs = [
      { id: "ball-0", phase: 0, note: 523 },
      { id: "ball-1", phase: 1, note: 659 },
      { id: "ball-2", phase: 2, note: 784 }
    ];

    state.balls = ballDefs.map(function (def, index) {
      return {
        el: document.getElementById(def.id),
        index: index,
        phase: def.phase,
        note: def.note,
        burst: 0,
        devX: 0,
        devY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        scale: 1,
        rejoin: false,
        loose: false,
        bounces: 0
      };
    });

    var tokenDefs = [
      { id: "token-circus", section: "circus", key: "circus", restRot: -6, drift: 0.4, driftSpeed: 0.82 },
      { id: "token-music", section: "music", key: "music", restRot: 0, drift: 2.2, driftSpeed: 1 },
      { id: "token-bio", section: "bio", key: "bio", restRot: -3, drift: 4.1, driftSpeed: 0.74 },
      { id: "token-contact", section: "contact", key: "contact", restRot: 4, drift: 5.6, driftSpeed: 0.9 }
    ];

    state.tokens = tokenDefs.map(function (def) {
      return {
        el: document.getElementById(def.id),
        section: def.section,
        key: def.key,
        restRot: def.restRot,
        drift: def.drift,
        driftSpeed: def.driftSpeed,
        x: 0,
        y: 0,
        rot: def.restRot,
        scale: 1,
        vx: 0,
        vy: 0,
        custom: false,
        dragging: false,
        rejoin: false,
        parkX: 0,
        parkY: 0,
        suppressClick: false
      };
    });
  }

  function renderInfo() {
    els.infoKicker.textContent = PROFILE.kicker;
    els.infoBody.textContent = PROFILE.body;
    els.infoContact.textContent = PROFILE.contact;
  }

  function initSound() {
    els.sound.addEventListener("click", function () {
      if (state.soundOn) {
        state.soundOn = false;
        updateSoundButton();
        showToast("Sound off");
        return;
      }
      try {
        if (!ensureAudio()) throw new Error("no-audio");
        state.soundOn = true;
        updateSoundButton();
        playNote(660, 0.1, "sine", 0.04);
        showToast("Sound on");
      } catch (err) {
        state.soundOn = false;
        updateSoundButton();
        showToast("No audio");
      }
    });
    updateSoundButton();
  }

  function updateSoundButton() {
    els.sound.setAttribute("aria-pressed", state.soundOn ? "true" : "false");
    els.sound.setAttribute("aria-label", state.soundOn ? "Turn sound off" : "Turn sound on");
    els.soundLabel.textContent = state.soundOn ? "Sound on" : "Sound off";
  }

  function ensureAudio() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!state.audio) state.audio = new AC();
    if (state.audio.state === "suspended") state.audio.resume();
    return state.audio;
  }

  function playNote(freq, dur, type, gainValue, when) {
    if (!state.soundOn) return;
    playTone(freq, dur, type, gainValue, when);
  }

  function playTone(freq, dur, type, gainValue, when) {
    var ctx = ensureAudio();
    if (!ctx) return;
    var t = when || ctx.currentTime;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(gainValue || 0.05, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function playArpeggio(freqs) {
    if (!state.soundOn) return;
    var ctx = ensureAudio();
    if (!ctx) return;
    freqs.forEach(function (freq, index) {
      playNote(freq, 0.18, "triangle", 0.045, ctx.currentTime + index * 0.09);
    });
  }

  function playGlide() {
    if (!state.soundOn) return;
    var ctx = ensureAudio();
    if (!ctx) return;
    var t = ctx.currentTime;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.28);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.32);
  }

  function initPlayground() {
    onResize();
    if ("ResizeObserver" in window) {
      var observer = new ResizeObserver(function () { onResize(); });
      observer.observe(els.stage);
    } else {
      window.addEventListener("resize", onResize);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopLoop();
      else if (!reducedMotion.matches) startLoop();
    });
    reducedMotion.addEventListener("change", function () {
      if (reducedMotion.matches) stopLoop();
      else startLoop();
      renderFrame(performance.now(), 1);
    });
    mobileQuery.addEventListener("change", onResize);
    buildCascade();

    els.stage.addEventListener("pointermove", function (event) {
      if (state.drag) return;
      updatePointer(event);
      if (reducedMotion.matches) renderFrame(performance.now(), 1);
    });
    els.stage.addEventListener("pointerleave", function () {
      if (state.drag) return;
      state.pointer.inside = false;
      if (reducedMotion.matches) renderFrame(performance.now(), 1);
    });
  }

  function initDraggableObjects() {
    state.tokens.forEach(function (item) {
      item.el.addEventListener("pointerdown", function (event) {
        if (state.mode !== "playground") return;
        startDrag("token", item, event);
      });
      if (item.section) {
        item.el.addEventListener("click", function () {
          if (item.suppressClick) {
            item.suppressClick = false;
            return;
          }
          navigateToSection(item.section);
        });
      }
    });

    window.addEventListener("pointermove", function (event) {
      if (!state.drag || event.pointerId !== state.drag.pointerId) return;
      updatePointer(event);
      moveDrag(event);
    });
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", function () {
      if (state.drag) endDrag({ pointerId: state.drag.pointerId });
    });
  }

  function initInteractions() {
    state.balls.forEach(function (ball) {
      ball.el.addEventListener("click", function () {
        if (state.mode !== "playground") return;
        nudgeBall(ball);
      });
    });

    els.nameBtn.addEventListener("click", function () {
      if (state.mode === "bio") returnToPlayground();
      else navigateToSection("bio");
    });
    if (els.infoClose) {
      els.infoClose.addEventListener("click", function () { closeInfo(); });
    }
  }

  function initNavigation() {
    window.addEventListener("hashchange", applyFromUrl);
    window.addEventListener("popstate", applyFromUrl);
    document.addEventListener("keydown", function (event) {
      if (els.lightbox && !els.lightbox.hidden) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          stepLightbox(-1);
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          stepLightbox(1);
          return;
        }
      }
      if (event.key !== "Escape") return;
      closeInfo();
      if (state.mode !== "playground") returnToPlayground();
    });
    els.stage.addEventListener("click", function (event) {
      if (state.mode === "playground" || !els.sheet || els.sheet.hidden) return;
      // Full-bleed sheet on mobile: no outside gutter — close via X / Escape only.
      if (state.layout && state.layout.mobile) return;
      if (performance.now() < state.ignoreCloseUntil) return;
      if (els.sheet.contains(event.target)) return;
      if (event.target.closest && event.target.closest(".token")) return;
      returnToPlayground();
    });
    applyFromUrl();
  }

  function onResize() {
    var prev = state.layout;
    var next = computeLayout();
    if (prev && prev.w && state.mode === "playground") {
      var sx = next.w / prev.w;
      var sy = next.h / prev.h;
      state.tokens.forEach(function (item) {
        if (!item.custom) return;
        item.x *= sx;
        item.y *= sy;
        item.parkX *= sx;
        item.parkY *= sy;
      });
    }
    state.layout = next;
    syncSvgBoxes();

    if (!prev) {
      state.tokens.forEach(function (item) {
        var home = itemHome(item);
        item.x = home.x;
        item.y = home.y;
        item.parkX = home.x;
        item.parkY = home.y;
      });
      state.balls.forEach(function (ball) {
        var point = orbitPoint(ball);
        ball.x = point.x;
        ball.y = point.y;
      });
    } else if (state.mode === "playground") {
      state.tokens.forEach(function (item) {
        if (item.custom || item.dragging) return;
        var home = itemHome(item);
        item.x = home.x;
        item.y = home.y;
        item.parkX = home.x;
        item.parkY = home.y;
      });
    }

    if (reducedMotion.matches || !state.loop) renderFrame(performance.now(), 1);
  }

  function computeLayout() {
    var w = els.stage.clientWidth;
    var h = els.stage.clientHeight;
    var mobile = mobileQuery.matches || w < 760;
    if (mobile) {
      return {
        w: w,
        h: h,
        mobile: true,
        orbit: {
          x: w * 0.5,
          y: h * 0.36,
          rx: Math.min(96, w * 0.26),
          ry: Math.min(64, h * 0.1)
        },
        bio: { x: w * 0.26, y: h * 0.18 },
        circus: { x: w * 0.74, y: h * 0.18 },
        music: { x: w * 0.26, y: h * 0.62 },
        contact: { x: w * 0.74, y: h * 0.62 },
        piano: { x: w * 0.5, y: h * 0.86 }
      };
    }
    return {
      w: w,
      h: h,
      mobile: false,
      orbit: {
        x: w * 0.36,
        y: h * 0.44,
        rx: Math.min(230, w * 0.2),
        ry: Math.min(150, h * 0.22)
      },
      circus: { x: w * 0.78, y: h * 0.18 },
      music: { x: w * 0.2, y: h * 0.74 },
      bio: { x: w * 0.16, y: h * 0.16 },
      contact: { x: w * 0.48, y: h * 0.84 },
      piano: { x: w * 0.8, y: h * 0.68 }
    };
  }

  function syncSvgBoxes() {
    var box = "0 0 " + state.layout.w + " " + state.layout.h;
    els.halo.setAttribute("viewBox", box);
    els.waves.setAttribute("viewBox", box);
    els.flourish.setAttribute("viewBox", box);
    if (els.dragTrail) els.dragTrail.setAttribute("viewBox", box);
  }

  function startLoop() {
    if (state.loop || reducedMotion.matches) return;
    state.last = 0;
    state.loop = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (!state.loop) return;
    cancelAnimationFrame(state.loop);
    state.loop = 0;
  }

  function tick(now) {
    if (!state.last) state.last = now;
    var dt = (now - state.last) / 16.67;
    state.last = now;
    if (dt > 2 || dt <= 0) dt = 1;
    renderFrame(now, dt);
    state.loop = requestAnimationFrame(tick);
  }

  function renderFrame(now, dt) {
    var layout = state.layout;
    if (!layout || layout.w < 20 || layout.h < 20) return;
    var step = dt == null ? 1 : dt;
    var reduced = reducedMotion.matches;
    var ease = reduced ? 1 : 0.14;
    var movers = visibleMovers();

    state.balls.forEach(function (ball) {
      ball.el.classList.remove("is-hidden");
    });

    if (state.mode === "playground") {
      updateOrbits(step, reduced);
      updateTokens(step, reduced, now);
      state.tokens.forEach(function (item) {
        item.el.classList.remove("is-covered");
        if (!item.dragging) item.scale += (1 - item.scale) * 0.2;
      });
      state.balls.forEach(function (ball) {
        ball.scale += (1 - ball.scale) * 0.2;
      });
    } else if (state.mode === "circus") {
      state.balls.forEach(function (ball, index) {
        var point = circusPoint(index);
        seek(ball, point.x, point.y, ease);
        ball.rot += (0 - ball.rot) * ease;
        ball.scale += (0.86 - ball.scale) * ease;
      });
      placeSectionTokens(ease, now, reduced);
    } else {
      state.balls.forEach(function (ball, index) {
        var point = musicPoint(index, state.balls.length, now);
        seek(ball, point.x, point.y, ease);
        ball.rot += ((index % 2 === 0 ? -8 : 8) - ball.rot) * ease;
        ball.scale += (0.9 - ball.scale) * ease;
      });
      placeSectionTokens(ease, now, reduced);
    }

    updateHalo(ease);
    renderWaves(now, musicAtmosphere());
    drawDragTrail(now);
    placeMovers(movers);
    placePiano();
  }

  function visibleMovers() {
    var list = [];
    state.balls.forEach(function (ball) {
      list.push(ball);
    });
    state.tokens.forEach(function (item) { list.push(item); });
    return list;
  }

  function updateOrbits(dt, reduced) {
    var orbit = state.layout.orbit;
    els.orbit.style.width = orbit.rx * 2 + "px";
    els.orbit.style.height = orbit.ry * 2 + "px";
    place(els.orbit, orbit.x, orbit.y, 0, 1);

    if (!reduced) state.beat += 0.038 * dt;

    state.balls.forEach(function (ball) {
      if (ball.loose) {
        stepLooseBall(ball, dt, reduced);
        return;
      }
      if (!reduced) ball.burst *= Math.pow(0.9, dt);
      var base = orbitPoint(ball);
      var desired = pointerDeviation(base);
      var k = reduced ? 1 : 0.28;
      ball.devX += (desired.x - ball.devX) * k;
      ball.devY += (desired.y - ball.devY) * k;
      var hop = reduced ? 0 : ball.burst * -12;
      var tx = base.x + ball.devX;
      var ty = base.y + ball.devY + hop;
      ball.rot += (0 - ball.rot) * (reduced ? 1 : 0.12);
      if (ball.rejoin && !reduced) {
        ball.x += (tx - ball.x) * 0.16;
        ball.y += (ty - ball.y) * 0.16;
        if (Math.hypot(tx - ball.x, ty - ball.y) < 1.4) ball.rejoin = false;
      } else {
        ball.x = tx;
        ball.y = ty;
        ball.rejoin = false;
      }
    });
  }

  function stepLooseBall(ball, dt, reduced) {
    if (reduced) {
      releaseLooseBall(ball);
      return;
    }
    var floor = state.layout.h - 18;
    var margin = 20;
    ball.vy += 0.5 * dt;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.rot += ball.vx * 1.6 * dt;
    if (ball.x < margin) {
      ball.x = margin;
      ball.vx = Math.abs(ball.vx) * 0.72;
    } else if (ball.x > state.layout.w - margin) {
      ball.x = state.layout.w - margin;
      ball.vx = -Math.abs(ball.vx) * 0.72;
    }
    if (ball.y >= floor && ball.vy > 0) {
      ball.y = floor;
      ball.vy = -ball.vy * 0.56;
      ball.vx *= 0.88;
      ball.bounces += 1;
      ball.scale = 0.78;
      spawnImpact(ball.x, ball.y);
      playNote(ball.note * 0.5, 0.07, "square", 0.025);
    }
    var settled = ball.bounces >= 3 && Math.abs(ball.vy) < 2.4 && ball.y > floor - 6;
    if (ball.bounces >= 5 || settled) releaseLooseBall(ball);
  }

  function releaseLooseBall(ball) {
    ball.loose = false;
    ball.rejoin = true;
    ball.vx = 0;
    ball.vy = 0;
    ball.bounces = 0;
    ball.el.classList.remove("is-loose");
  }

  function dropBall(ball) {
    var away = ball.x >= state.layout.w * 0.5 ? 1 : -1;
    var kick = state.layout.mobile ? 4.4 : 6.4;
    ball.loose = true;
    ball.rejoin = false;
    ball.burst = 0;
    ball.devX = 0;
    ball.devY = 0;
    ball.vx = away * kick;
    ball.vy = 1.2;
    ball.bounces = 0;
    ball.el.classList.add("is-loose");
  }

  function updateTokens(dt, reduced, now) {
    state.tokens.forEach(function (item) {
      var home = itemHome(item);
      if (item.dragging) return;
      if (item.rejoin) {
        seek(item, item.parkX, item.parkY, reduced ? 1 : 0.14);
        item.rot += (item.restRot - item.rot) * 0.2;
        if (Math.hypot(item.parkX - item.x, item.parkY - item.y) < 1) item.rejoin = false;
        return;
      }
      if (!item.custom) {
        var drift = reduced ? { x: 0, y: 0, rot: 0 } : tokenDrift(item, now || 0);
        var pad = state.layout.mobile ? 64 : 86;
        var tx = clampRange(home.x + drift.x, pad, state.layout.w - pad);
        var ty = clampRange(home.y + drift.y, pad, state.layout.h - pad);
        if (reduced) {
          item.x = tx;
          item.y = ty;
        } else {
          item.x += (tx - item.x) * 0.045;
          item.y += (ty - item.y) * 0.045;
        }
        item.rot += (item.restRot + drift.rot - item.rot) * 0.08;
      } else if (!reduced) {
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        item.vx *= Math.pow(0.86, dt);
        item.vy *= Math.pow(0.86, dt);
        if (Math.hypot(item.vx, item.vy) < 0.06) {
          item.vx = 0;
          item.vy = 0;
        }
        clampItem(item);
        item.rot += (item.restRot - item.rot) * 0.18;
      }
    });
  }

  function tokenDrift(item, now) {
    var t = now * 0.000085 * (item.driftSpeed || 1);
    var seed = item.drift || 0;
    var ampX = state.layout.mobile ? 18 : 46;
    var ampY = state.layout.mobile ? 14 : 34;
    return {
      x: Math.sin(t + seed) * ampX + Math.sin(t * 0.46 + seed * 2.1) * ampX * 0.38,
      y: Math.cos(t * 0.71 + seed * 1.35) * ampY + Math.cos(t * 0.33 + seed) * ampY * 0.42,
      rot: Math.sin(t * 0.58 + seed) * 6
    };
  }

  function clampRange(value, min, max) {
    if (max < min) return (min + max) / 2;
    return Math.max(min, Math.min(max, value));
  }

  function arcPoint(u, fromLeft) {
    var x = fromLeft ? -1 + 2 * u : 1 - 2 * u;
    var y = 4 * u * (1 - u);
    var sep = 0.4 * Math.sin(Math.PI * u);
    x += fromLeft ? -sep : sep;
    return { x: x, y: y };
  }

  function buildCascade() {
    [true, false].forEach(function (fromLeft, index) {
      var d = "";
      for (var i = 0; i <= 28; i += 1) {
        var arc = arcPoint(i / 28, fromLeft);
        var x = 50 + arc.x * 46;
        var y = 50 + (0.72 - arc.y * 1.55) * 46;
        d += (i ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
      }
      var path = document.getElementById(index === 0 ? "orbit-a" : "orbit-b");
      if (path) path.setAttribute("d", d);
    });
  }

  function frameInset() {
    return {
      x: state.layout.mobile ? 52 : 86,
      y: state.layout.mobile ? 48 : 68
    };
  }

  function circusPoint(index) {
    var w = state.layout.w;
    var h = state.layout.h;
    var pad = frameInset();
    var slots = [
      { x: pad.x, y: pad.y },
      { x: w - pad.x, y: pad.y },
      { x: pad.x, y: h - pad.y },
      { x: w - pad.x, y: h - pad.y },
      { x: pad.x, y: h * 0.5 },
      { x: w - pad.x, y: h * 0.48 },
      { x: w * 0.5, y: pad.y },
      { x: w * 0.5, y: h - pad.y }
    ];
    return slots[index % slots.length];
  }

  function musicPoint(index, count, now) {
    var w = state.layout.w;
    var h = state.layout.h;
    var pad = frameInset();
    var amp = reducedMotion.matches ? 0 : (state.layout.mobile ? 6 : 10);
    var slots = [
      { x: pad.x, y: h * 0.24 },
      { x: pad.x, y: h * 0.55 },
      { x: pad.x, y: h - pad.y },
      { x: w - pad.x, y: h * 0.24 },
      { x: w - pad.x, y: h * 0.55 },
      { x: w - pad.x, y: h - pad.y },
      { x: w * 0.5, y: h - pad.y },
      { x: w * 0.5, y: pad.y }
    ];
    var base = slots[index % slots.length];
    return {
      x: base.x,
      y: base.y + Math.sin(now * 0.003 + index * 0.9) * amp
    };
  }

  function musicAtmosphere() {
    if (state.mode === "music") return true;
    var data = SECTIONS[state.mode];
    return !!(data && data.kind === "band");
  }

  function coveredSection() {
    if (state.mode === "playground") return null;
    var data = SECTIONS[state.mode];
    if (!data || data.kind === "band") return null;
    return state.mode;
  }

  function sheetGutters() {
    var w = state.layout.w;
    var fallback = state.layout.mobile ? 84 : 160;
    if (!els.sheet || els.sheet.hidden) {
      return { left: fallback / 2, right: w - fallback / 2 };
    }
    var sheet = els.sheet.getBoundingClientRect();
    var stage = els.stage.getBoundingClientRect();
    var leftSpace = sheet.left - stage.left;
    var rightSpace = stage.right - sheet.right;
    return {
      left: Math.max(42, leftSpace / 2),
      right: w - Math.max(42, rightSpace / 2)
    };
  }

  function placeSectionTokens(ease, now, reduced) {
    if (state.layout.mobile) {
      state.tokens.forEach(function (item) {
        item.el.classList.add("is-covered");
      });
      return;
    }
    var covered = coveredSection();
    var shown = [];
    state.tokens.forEach(function (item) {
      var hide = item.section === covered;
      item.el.classList.toggle("is-covered", hide);
      if (!hide) shown.push(item);
    });
    var gutters = sheetGutters();
    var amp = reduced ? 0 : 8;
    var tokenScale = shown.length > 3 ? 0.78 : 0.9;
    var lanes = shown.length > 3
      ? [0.16, 0.38, 0.62, 0.84]
      : [0.22, 0.5, 0.78];
    shown.forEach(function (item, index) {
      var yNorm = lanes[index] || lanes[lanes.length - 1];
      var point = {
        x: gutters.right,
        y: state.layout.h * yNorm + Math.sin((now || 0) * 0.003 + index * 0.9) * amp
      };
      seek(item, point.x, point.y, ease);
      item.rot += ((index % 2 === 0 ? -8 : 8) - item.rot) * ease;
      item.scale += (tokenScale - item.scale) * ease;
    });
  }

  function updateHalo(ease) {
    var target = state.mode === "circus"
      ? Math.min(state.layout.w, state.layout.h) * 0.62
      : 0;
    state.haloR += (target - state.haloR) * ease;
    if (state.haloR < 0.4) state.haloR = 0;
    placeHaloCircle(els.haloCircle, state.haloR);
    placeHaloCircle(els.haloInner, state.haloR * 0.72);
    els.halo.style.opacity = state.haloR > 6 ? "1" : "0";
  }

  function placeHaloCircle(circle, radius) {
    if (!circle) return;
    circle.setAttribute("cx", state.layout.w / 2);
    circle.setAttribute("cy", state.layout.h / 2);
    circle.setAttribute("r", Math.max(0, radius).toFixed(1));
  }

  function drawDragTrail(now) {
    var paths = {
      circus: els.dragCircus,
      music: els.dragMusic,
      bio: els.dragBio,
      contact: els.dragContact
    };
    if (!paths.circus || !paths.music || !paths.bio || !paths.contact) return;
    var keys = ["circus", "music", "bio", "contact"];
    if (reducedMotion.matches) {
      state.dragTrail = [];
      keys.forEach(function (key) { paths[key].setAttribute("d", ""); });
      return;
    }
    var live = [];
    var built = { circus: "", music: "", bio: "", contact: "" };
    var count = { circus: 0, music: 0, bio: 0, contact: 0 };
    for (var i = 0; i < state.dragTrail.length; i += 1) {
      var point = state.dragTrail[i];
      if (now - point.t > 260) continue;
      live.push(point);
      var key = built[point.key] != null ? point.key : "circus";
      built[key] += (count[key] ? " L " : "M ") + point.x.toFixed(1) + " " + point.y.toFixed(1);
      count[key] += 1;
    }
    state.dragTrail = live;
    keys.forEach(function (key) {
      paths[key].setAttribute("d", count[key] > 1 ? built[key] : "");
    });
  }

  function renderWaves(now, active) {
    if (!active) {
      els.waves.style.opacity = "0";
      return;
    }
    els.waves.style.opacity = "1";
    var levels = state.layout.mobile ? [0.48] : [0.32, 0.5, 0.68];
    var amps = reducedMotion.matches ? [0, 0, 0] : (state.layout.mobile ? [16] : [26, 42, 22]);
    for (var i = 0; i < els.wavePaths.length; i += 1) {
      var path = els.wavePaths[i];
      if (i >= levels.length) {
        path.setAttribute("d", "");
        continue;
      }
      var d = "";
      var steps = 22;
      var base = state.layout.h * levels[i];
      for (var s = 0; s <= steps; s += 1) {
        var x = (state.layout.w * s) / steps;
        var y = base + Math.sin(s * 0.55 + now * 0.003 + i * 1.3) * amps[i];
        d += (s ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
      }
      path.setAttribute("d", d);
      var width = reducedMotion.matches ? 2.2 : 2.1 + Math.sin(now * 0.007 + i * 1.2) * 1.15;
      path.setAttribute("stroke-width", width.toFixed(2));
    }
  }

  function placeMovers(movers) {
    for (var i = 0; i < movers.length; i += 1) {
      var item = movers[i];
      place(item.el, item.x, item.y, item.rot || 0, item.scale || 1);
      item.el.style.zIndex = item.dragging ? "5" : "";
    }
  }

  function place(el, x, y, rot, scale) {
    el.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%) rotate(" + (rot || 0) + "deg) scale(" + (scale || 1) + ")";
  }

  var PIANO_FREQ = {
    C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, E4: 329.63, F4: 349.23,
    Fs4: 369.99, G4: 392, Gs4: 415.3, A4: 440, As4: 466.16, B4: 493.88,
    C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, E5: 659.25, F5: 698.46,
    Fs5: 739.99, G5: 783.99, Gs5: 830.61, A5: 880, As5: 932.33, B5: 987.77
  };

  // Star Wars main theme (pickup + fanfare). Times in ms; beat ≈ 480ms.
  var STAR_WARS_MOTIF = [
    { note: "D4", at: 0, hold: 140 },
    { note: "D4", at: 160, hold: 140 },
    { note: "D4", at: 320, hold: 140 },
    { note: "G4", at: 480, hold: 900 },
    { note: "D5", at: 1440, hold: 900 },
    { note: "C5", at: 2400, hold: 140 },
    { note: "B4", at: 2560, hold: 140 },
    { note: "A4", at: 2720, hold: 140 },
    { note: "G5", at: 2880, hold: 420 },
    { note: "D5", at: 3360, hold: 900 },
    { note: "C5", at: 4320, hold: 140 },
    { note: "B4", at: 4480, hold: 140 },
    { note: "A4", at: 4640, hold: 140 },
    { note: "G5", at: 4800, hold: 420 },
    { note: "D5", at: 5280, hold: 900 },
    { note: "C5", at: 6240, hold: 140 },
    { note: "B4", at: 6400, hold: 140 },
    { note: "C5", at: 6560, hold: 140 },
    { note: "A4", at: 6720, hold: 1400 }
  ];
  var STAR_WARS_LOOP_MS = 9800;

  var pianoMotif = {
    timers: [],
    loopTimer: 0,
    paused: false,
    generation: 0
  };

  function initPiano() {
    if (!els.piano) return;
    var resumeTimer = 0;
    function scheduleMotifResume(delay) {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(function () {
        resumeTimer = 0;
        if (!els.piano.contains(document.activeElement)) resumePianoMotif();
      }, delay || 900);
    }
    els.piano.querySelectorAll(".key").forEach(function (key) {
      key.addEventListener("pointerdown", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = key.getAttribute("data-note");
        var freq = PIANO_FREQ[id];
        if (!freq) return;
        pausePianoMotif(true);
        pressPianoKey(key, 160);
        playPianoNote(freq, 0.85);
        scheduleMotifResume(900);
      });
    });
    els.piano.addEventListener("focusin", function () {
      window.clearTimeout(resumeTimer);
      pausePianoMotif(false);
    });
    els.piano.addEventListener("focusout", function () {
      scheduleMotifResume(120);
    });
    if (!reducedMotion.matches) startPianoMotif();
    reducedMotion.addEventListener("change", function () {
      if (reducedMotion.matches) stopPianoMotif();
      else if (state.mode === "playground") startPianoMotif();
    });
  }

  function pressPianoKey(key, holdMs) {
    if (!key) return;
    key.classList.add("is-down");
    window.setTimeout(function () { key.classList.remove("is-down"); }, holdMs || 160);
  }

  function playPianoNote(freq, dur) {
    var ctx = ensureAudio();
    if (!ctx) return;
    var length = typeof dur === "number" ? dur : 0.85;
    var t = ctx.currentTime;
    var master = ctx.createGain();
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.16, t + 0.012);
    master.gain.exponentialRampToValueAtTime(0.0001, t + length);
    [1, 2, 3].forEach(function (harmonic) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = harmonic === 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq * harmonic, t);
      gain.gain.setValueAtTime(harmonic === 1 ? 0.7 : harmonic === 2 ? 0.2 : 0.06, t);
      osc.connect(gain);
      gain.connect(master);
      osc.start(t);
      osc.stop(t + length + 0.05);
    });
  }

  function clearPianoMotifTimers() {
    pianoMotif.timers.forEach(function (id) { window.clearTimeout(id); });
    pianoMotif.timers = [];
    if (pianoMotif.loopTimer) {
      window.clearTimeout(pianoMotif.loopTimer);
      pianoMotif.loopTimer = 0;
    }
  }

  function stopPianoMotif() {
    pianoMotif.generation += 1;
    pianoMotif.paused = true;
    clearPianoMotifTimers();
    if (els.piano) {
      els.piano.querySelectorAll(".key.is-down").forEach(function (key) {
        key.classList.remove("is-down");
      });
    }
  }

  function pausePianoMotif(clearKeys) {
    if (pianoMotif.paused) return;
    pianoMotif.paused = true;
    pianoMotif.generation += 1;
    clearPianoMotifTimers();
    if (clearKeys && els.piano) {
      els.piano.querySelectorAll(".key.is-down").forEach(function (key) {
        key.classList.remove("is-down");
      });
    }
  }

  function resumePianoMotif() {
    if (!pianoMotif.paused) return;
    if (reducedMotion.matches || state.mode !== "playground") return;
    pianoMotif.paused = false;
    schedulePianoMotif();
  }

  function startPianoMotif() {
    if (!els.piano || reducedMotion.matches) return;
    pianoMotif.paused = false;
    schedulePianoMotif();
  }

  function schedulePianoMotif() {
    if (!els.piano || pianoMotif.paused || reducedMotion.matches) return;
    clearPianoMotifTimers();
    var gen = pianoMotif.generation;
    STAR_WARS_MOTIF.forEach(function (step) {
      var timer = window.setTimeout(function () {
        if (gen !== pianoMotif.generation || pianoMotif.paused) return;
        if (state.mode !== "playground") return;
        var key = els.piano.querySelector('.key[data-note="' + step.note + '"]');
        pressPianoKey(key, step.hold);
        if (state.soundOn) {
          var freq = PIANO_FREQ[step.note];
          if (freq) playPianoNote(freq, Math.max(0.18, step.hold / 1000 + 0.12));
        }
      }, step.at);
      pianoMotif.timers.push(timer);
    });
    pianoMotif.loopTimer = window.setTimeout(function () {
      if (gen !== pianoMotif.generation || pianoMotif.paused) return;
      schedulePianoMotif();
    }, STAR_WARS_LOOP_MS);
  }

  function placePiano() {
    if (!els.piano || !state.layout || !state.layout.piano) return;
    var spot = state.layout.piano;
    place(els.piano, spot.x, spot.y, -3, 1);
  }

  function seek(item, x, y, ease) {
    item.x += (x - item.x) * ease;
    item.y += (y - item.y) * ease;
  }

  function orbitPoint(ball) {
    var orbit = state.layout.orbit;
    var t = state.beat;
    var b = ball.phase;
    var s = b + 3 * Math.floor((t - b) / 3);
    var u = (t - s) / 3;
    var fromLeft = (((s % 2) + 2) % 2) === 0;
    var arc = arcPoint(u, fromLeft);
    return {
      x: orbit.x + arc.x * orbit.rx * 0.92,
      y: orbit.y + (0.72 - arc.y * 1.55) * orbit.ry * 0.92
    };
  }

  function itemHome(item) {
    var point = state.layout[item.key];
    return { x: point.x, y: point.y };
  }

  function pointerDeviation(base) {
    if (!state.pointer.inside || state.mode !== "playground") return { x: 0, y: 0 };
    var dx = base.x - state.pointer.x;
    var dy = base.y - state.pointer.y;
    var dist = Math.hypot(dx, dy);
    var reach = state.layout.mobile ? 96 : 150;
    if (dist > reach || dist < 0.001) return { x: 0, y: 0 };
    var force = (1 - dist / reach) * (state.layout.mobile ? 28 : 48);
    return { x: (dx / dist) * force, y: (dy / dist) * force };
  }

  function clampItem(item) {
    var margin = 22;
    var maxX = state.layout.w - margin;
    var maxY = state.layout.h - margin;
    if (item.x < margin) { item.x = margin; item.vx = 0; }
    if (item.y < margin) { item.y = margin; item.vy = 0; }
    if (item.x > maxX) { item.x = maxX; item.vx = 0; }
    if (item.y > maxY) { item.y = maxY; item.vy = 0; }
  }

  function clampPoint(point) {
    var margin = 16;
    point.x = Math.max(margin, Math.min(state.layout.w - margin, point.x));
    point.y = Math.max(margin, Math.min(state.layout.h - margin, point.y));
  }

  function pointFromEvent(event) {
    var rect = els.stage.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function updatePointer(event) {
    if (!state.layout) return;
    var point = pointFromEvent(event);
    state.pointer.x = point.x;
    state.pointer.y = point.y;
    state.pointer.inside = point.x >= 0 && point.y >= 0 && point.x <= state.layout.w && point.y <= state.layout.h;
  }

  function startDrag(kind, item, event) {
    if (state.mode !== "playground") return;
    if (event.button != null && event.button !== 0) return;
    var point = pointFromEvent(event);
    state.drag = {
      kind: kind,
      item: item,
      pointerId: event.pointerId,
      startX: point.x,
      startY: point.y,
      lastX: point.x,
      lastY: point.y,
      offX: item ? point.x - item.x : 0,
      offY: item ? point.y - item.y : 0,
      moved: false,
      vx: 0,
      vy: 0
    };
    if (item) item.dragging = true;
    document.body.classList.add("is-dragging");
    if (event.currentTarget.setPointerCapture) {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
    }
    event.preventDefault();
  }

  function moveDrag(event) {
    var drag = state.drag;
    if (!drag) return;
    var point = pointFromEvent(event);
    var dx = point.x - drag.lastX;
    var dy = point.y - drag.lastY;
    if (Math.hypot(point.x - drag.startX, point.y - drag.startY) > 10) drag.moved = true;
    drag.vx = dx;
    drag.vy = dy;
    drag.lastX = point.x;
    drag.lastY = point.y;

    if (drag.item) {
      drag.item.x = point.x - drag.offX;
      drag.item.y = point.y - drag.offY;
      clampItem(drag.item);
      drag.item.rot = drag.item.restRot + Math.max(-18, Math.min(18, dx * 1.15));
      drag.item.scale = 1.06;
      if (drag.moved) {
        state.dragTrail.push({
          x: drag.item.x,
          y: drag.item.y,
          t: performance.now(),
          key: drag.item.key
        });
        if (state.dragTrail.length > 24) state.dragTrail.shift();
      }
    }
    if (reducedMotion.matches) renderFrame(performance.now(), 1);
  }

  function endDrag(event) {
    var drag = state.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    state.drag = null;
    document.body.classList.remove("is-dragging");

    var item = drag.item;
    if (!item) return;
    item.dragging = false;
    if (drag.moved) {
      item.custom = true;
      item.vx = drag.vx;
      item.vy = drag.vy;
      armSuppress(item);
      // showToast("Place");
    } else {
      item.vx = 0;
      item.vy = 0;
      if (item.section) {
        armSuppress(item);
        spawnImpact(item.x, item.y);
        navigateToSection(item.section);
      }
    }
    if (reducedMotion.matches) renderFrame(performance.now(), 1);
  }

  function nudgeBall(ball) {
    ball.el.classList.remove("ping");
    void ball.el.offsetWidth;
    ball.el.classList.add("ping");
    spawnImpact(ball.x, ball.y);
    playNote(ball.note, 0.12, "square", 0.03);
    if (!noteBallOrder(ball)) showToast("Drop");
    if (reducedMotion.matches) {
      ball.y += 28;
      renderFrame(performance.now(), 1);
      ball.rejoin = true;
      return;
    }
    dropBall(ball);
  }

  function noteBallOrder(ball) {
    var now = performance.now();
    var pattern = [0, 1, 2];
    state.ballSeq = state.ballSeq.filter(function (hit) { return now - hit.t < 2500; });
    if (ball.index === pattern[state.ballSeq.length]) {
      state.ballSeq.push({ i: ball.index, t: now });
      if (state.ballSeq.length === pattern.length) {
        state.ballSeq = [];
        triggerBalance();
        return true;
      }
      return false;
    }
    state.ballSeq = ball.index === pattern[0] ? [{ i: ball.index, t: now }] : [];
    return false;
  }

  function armSuppress(item) {
    item.suppressClick = true;
    window.setTimeout(function () { item.suppressClick = false; }, 350);
  }

  function triggerBalance() {
    var layout = state.layout;
    var size = Math.min(layout.w, layout.h) * 0.22;
    els.flourishPath.setAttribute("d", lemniscate(layout.w / 2, layout.h / 2, size));
    if (reducedMotion.matches) {
      els.flourishPath.style.opacity = "1";
      els.flourishPath.style.strokeDashoffset = "0";
      window.setTimeout(function () {
        els.flourishPath.style.opacity = "0";
      }, 1200);
    } else {
      els.flourishPath.style.opacity = "";
      els.flourishPath.style.strokeDashoffset = "";
      els.flourish.classList.remove("play");
      void els.flourish.offsetWidth;
      els.flourish.classList.add("play");
    }
    showToast("Fire");
    playArpeggio([392, 494, 587, 784]);
  }

  function lemniscate(cx, cy, size) {
    var d = "";
    for (var i = 0; i <= 80; i += 1) {
      var t = (i / 80) * Math.PI * 2;
      var s = Math.sin(t);
      var c = Math.cos(t);
      var denom = 1 + s * s;
      var x = cx + (size * c) / denom;
      var y = cy + (size * s * c) / denom;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    return d;
  }

  function navigateToSection(section, options) {
    options = options || {};
    if (!SECTIONS[section]) return;
    if (state.mode === section && !els.sheet.hidden) {
      if (!options.fromUrl) writeUrl(section);
      return;
    }
    if (state.mode === "playground") parkPlayground();
    state.mode = section;
    els.stage.dataset.mode = section;
    els.stage.classList.add("is-open");
    state.ignoreCloseUntil = performance.now() + 450;
    pausePianoMotif(true);
    if ("inert" in els.field) els.field.inert = false;
    if (!options.fromUrl) writeUrl(section);
    renderSheet(section);
    closeInfo(true);
    setTitle(section);
    showToast(SECTIONS[section].title);
    playArpeggio(section === "music" ? [220, 330] : [196, 247, 294]);
    syncName();
    if (section === "circus") flashStage();
    syncSectionTheme();
    renderFrame(performance.now(), 1);
  }

  function flashStage() {
    els.stage.classList.remove("flash");
    void els.stage.offsetWidth;
    els.stage.classList.add("flash");
    window.clearTimeout(state.flashTimer);
    state.flashTimer = window.setTimeout(function () {
      els.stage.classList.remove("flash");
    }, 560);
  }

  function spawnImpact(x, y) {
    if (!els.field || reducedMotion.matches) return;
    var spark = document.createElement("span");
    spark.className = "impact";
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    els.field.appendChild(spark);
    window.setTimeout(function () {
      if (spark.parentNode) spark.parentNode.removeChild(spark);
    }, 460);
  }

  function returnToPlayground(options) {
    options = options || {};
    closeLightbox();
    closeInfo(true);
    if (state.mode === "playground" && els.sheet.hidden) {
      if (!options.fromUrl) writeUrl(null);
      setTitle(null);
      return;
    }
    var previous = state.mode;
    state.mode = "playground";
    els.stage.dataset.mode = "playground";
    els.stage.classList.remove("is-open");
    els.sheet.hidden = true;
    els.sheet.innerHTML = "";
    if ("inert" in els.field) els.field.inert = false;
    state.balls.forEach(function (ball) { ball.rejoin = true; });
    state.tokens.forEach(function (item) { item.rejoin = true; });
    if (!options.fromUrl) writeUrl(null);
    setTitle(null);
    syncSectionTheme();
    renderFrame(performance.now(), 1);
    syncName();
    resumePianoMotif();
    var opener = document.getElementById("token-" + previous);
    if (opener) opener.focus({ preventScroll: true });
  }

  function syncName() {
    if (!els.nameBtn) return;
    var open = state.mode === "bio" && els.sheet && !els.sheet.hidden;
    els.nameBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function parkPlayground() {
    state.tokens.forEach(function (item) {
      item.parkX = item.x;
      item.parkY = item.y;
      item.vx = 0;
      item.vy = 0;
      item.dragging = false;
    });
    state.drag = null;
    document.body.classList.remove("is-dragging");
    state.balls.forEach(function (ball) {
      if (!ball.loose) return;
      releaseLooseBall(ball);
    });
  }

  function renderSheet(section) {
    var data = SECTIONS[section];
    els.sheet.classList.remove("is-in", "is-circus", "is-music", "is-bio", "is-contact", "is-band");
    els.sheet.classList.add("is-" + (data.kind === "band" ? "music" : section));
    if (data.kind === "band") els.sheet.classList.add("is-band");
    var body = sheetBody(section, data);
    var back = data.kind === "band"
      ? '<button type="button" class="sheet-back" data-switch="music" aria-label="Back to music">&#8592; Music</button>'
      : "";
    var nav = section === "music" || data.kind === "band" ? "" : sheetNav(section);
    var bandLinks = data.kind === "band" ? (data.links || []).map(linkMarkup).join("") : "";
    var titleBlock = bandLinks
      ? (
          '<div class="sheet-head">' +
            '<h1 class="sheet-title" id="sheet-title">' + escapeHtml(data.title) + "</h1>" +
            '<p class="act-links">' + bandLinks + "</p>" +
          "</div>"
        )
      : '<h1 class="sheet-title" id="sheet-title">' + escapeHtml(data.title) + "</h1>";
    els.sheet.innerHTML =
      '<button type="button" class="sheet-close" data-back aria-label="Close">X</button>' +
      '<div class="sheet-scroll">' +
        back +
        '<p class="sheet-kicker">' + escapeHtml(data.kicker) + "</p>" +
        titleBlock +
        '<p class="sheet-lead">' + escapeHtml(data.lead) + "</p>" +
        '<div class="sheet-mark" aria-hidden="true"></div>' +
        body +
        nav +
      "</div>";
    els.sheet.hidden = false;
    // Block the ghost click that opened this sheet from hitting band rows / links.
    els.sheet.style.pointerEvents = "none";
    window.setTimeout(function () {
      if (els.sheet) els.sheet.style.pointerEvents = "";
    }, 480);
    els.sheet.querySelector(".sheet-scroll").scrollTop = 0;
    void els.sheet.offsetWidth;
    els.sheet.classList.add("is-in");
    els.sheet.querySelector("[data-back]").addEventListener("click", function () {
      returnToPlayground();
    });
    els.sheet.querySelectorAll("[data-switch]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (performance.now() < state.ignoreCloseUntil) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        navigateToSection(button.getAttribute("data-switch"));
      });
    });
    if (section === "circus") {
      var flame = document.querySelector("#token-circus .glyph-flame svg");
      var mark = els.sheet.querySelector(".sheet-mark");
      if (flame && mark) mark.appendChild(flame.cloneNode(true));
    }
    bindContactForm(els.sheet);
    bindShotGallery(els.sheet);
    var heading = els.sheet.querySelector("#sheet-title");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  function sheetBody(section, data) {
    if (section === "contact") return contactBody();
    if (section === "bio") return bioBody(data);
    if (data.kind === "band") return bandBody(data);
    if (section === "music") return musicBody(data);
    return '<div class="cards">' + data.projects.map(function (project) {
      return (
        '<article class="card">' +
          '<div class="motif motif-' + safeMotif(project.motif) + '" aria-hidden="true">' + motifMarkup(project.motif) + "</div>" +
          '<div class="card-copy">' +
            '<p class="card-discipline">' + escapeHtml(project.discipline) + "</p>" +
            "<h2>" + escapeHtml(project.name) + "</h2>" +
            '<p class="card-text">' + escapeHtml(project.text) + "</p>" +
          "</div>" +
        "</article>"
      );
    }).join("") + "</div>";
  }

  function bioBody(data) {
    var frames = data.photos.map(function (label) {
      return '<figure class="portrait"><figcaption>' + escapeHtml(label) + "</figcaption></figure>";
    }).join("");
    return (
      '<div class="portraits">' + frames + "</div>" +
      '<p class="bio-text">' + escapeHtml(data.text) + "</p>"
    );
  }

  function contactBody() {
    return (
      '<form class="contact-form" id="contact-form">' +
        '<label>Name<input name="name" type="text" autocomplete="name" required maxlength="80"></label>' +
        '<label>Your email<input name="email" type="email" autocomplete="email" required maxlength="120"></label>' +
        '<label>Message<textarea name="message" required maxlength="2000"></textarea></label>' +
        '<button class="send" type="submit">Send</button>' +
      "</form>" +
      '<p class="contact-note">The note opens in your mail app, addressed to ' + escapeHtml(PROFILE.email) + ".</p>" +
      '<div class="contact-routes">' +
        '<a href="mailto:' + escapeHtml(PROFILE.email) + '">' + escapeHtml(PROFILE.email) + "</a>" +
        '<a href="' + escapeHtml(PROFILE.instagram) + '" target="_blank" rel="noopener noreferrer">Instagram — ' + escapeHtml(PROFILE.instagramName) + "</a>" +
      "</div>"
    );
  }

  function musicBody(data) {
    var featured = data.featured.map(function (key) {
      var band = SECTIONS[key];
      return (
        '<button type="button" class="band-row" data-switch="' + key + '">' +
          '<span class="band-copy">' +
            '<span class="band-meta">' + escapeHtml(band.kicker) + "</span>" +
            '<span class="band-name">' + escapeHtml(band.title) + "</span>" +
          "</span>" +
        "</button>"
      );
    }).join("");
    var also = data.also.map(function (item) {
      return (
        "<li>" +
          '<p class="also-slot">' + escapeHtml(item.slot) + "</p>" +
          '<p class="also-text">' + escapeHtml(item.text) + "</p>" +
        "</li>"
      );
    }).join("");
    return (
    
      '<div class="acts">' + featured + "</div>" +
      '<section class="also">' +
        '<h2 class="block-title">Curriculum</h2>' +
        '<ul class="also-list">' + also + "</ul>" +
      "</section>"
    );
  }

  function bandBody(data) {
    var parts = [];
    if (data.story) {
      parts.push('<p class="band-story">' + escapeHtml(data.story) + "</p>");
    }
    parts.push(mediaStack(data.media));
    if (data.video && data.video.youtube) {
      parts.push(bandVideo(data.video));
    }
    return parts.join("");
  }

  function linkMarkup(link) {
    if (link.href) {
      return '<a href="' + escapeHtml(link.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(link.label) + "</a>";
    }
    return '<span class="link-pending">' + escapeHtml(link.label) + " — add the link</span>";
  }

  function bandVideo(video) {
    var id = String(video.youtube).replace(/[^a-zA-Z0-9_-]/g, "");
    if (!id) return "";
    var title = video.title || "Watch on YouTube";
    var note = video.note
      ? '<p class="band-video-note">' + escapeHtml(video.note) + "</p>"
      : "";
    return (
      '<section class="band-video">' +
        '<h2 class="block-title">Listen</h2>' +
        note +
        '<div class="band-video-frame">' +
          '<iframe' +
            ' src="https://www.youtube.com/embed/' + id + '"' +
            ' title="' + escapeHtml(title) + '"' +
            ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
            ' referrerpolicy="strict-origin-when-cross-origin"' +
            " allowfullscreen" +
            " loading=\"lazy\"" +
          "></iframe>" +
        "</div>" +
      "</section>"
    );
  }

  function mediaStack(media) {
    if (!media || !media.length) return "";
    var hasFiles = media.some(function (item) { return item.src || item.youtube; });
    if (hasFiles) return shotGallery(media);
    var cards = media.map(function (item) {
      var kind = item.kind === "video" ? "video" : "photo";
      return (
        '<article class="media-card" data-kind="' + kind + '">' +
          '<span class="slide-kind">' + (kind === "video" ? "Video" : "Photo") + "</span>" +
          '<span class="slide-label">' + escapeHtml(item.label || "Media") + " — add the file</span>" +
        "</article>"
      );
    }).join("");
    return '<div class="media-stack">' + cards + "</div>";
  }

  function shotGallery(media) {
    var shots = media.filter(function (item) { return item.kind !== "video" && item.src; }).map(function (item, index) {
      return (
        '<button type="button" class="shot shot-' + ((index % 4) + 1) + '" data-lightbox-index="' + index + '" aria-label="' + escapeHtml(item.alt || "Open photo") + '">' +
          '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt || "") + '" loading="lazy" decoding="async">' +
        "</button>"
      );
    }).join("");
    if (!shots) return "";
    return '<div class="shot-gallery">' + shots + "</div>";
  }

  function bindShotGallery(root) {
    var gallery = root.querySelector(".shot-gallery");
    if (!gallery) return;
    gallery.querySelectorAll("[data-lightbox-index]").forEach(function (shot) {
      shot.addEventListener("click", function () {
        var index = Number(shot.getAttribute("data-lightbox-index"));
        var shots = Array.prototype.map.call(gallery.querySelectorAll("[data-lightbox-index]"), function (el) {
          var img = el.querySelector("img");
          return {
            src: img ? img.getAttribute("src") : "",
            alt: img ? img.getAttribute("alt") || "" : ""
          };
        }).filter(function (item) { return item.src; });
        if (!shots.length) return;
        openLightbox(shots, index);
      });
    });
  }

  function initLightbox() {
    if (!els.lightbox) return;
    els.lightboxClose.addEventListener("click", function () { closeLightbox(); });
    els.lightboxPrev.addEventListener("click", function () { stepLightbox(-1); });
    els.lightboxNext.addEventListener("click", function () { stepLightbox(1); });
    els.lightbox.addEventListener("click", function (event) {
      if (event.target === els.lightbox) closeLightbox();
    });
  }

  function openLightbox(shots, index) {
    if (!els.lightbox || !shots || !shots.length) return;
    state.lightbox.shots = shots;
    state.lightbox.index = ((index % shots.length) + shots.length) % shots.length;
    renderLightbox();
    els.lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    els.lightboxClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!els.lightbox || els.lightbox.hidden) return;
    els.lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    state.lightbox.shots = [];
    state.lightbox.index = 0;
    if (els.lightboxImage) {
      els.lightboxImage.removeAttribute("src");
      els.lightboxImage.alt = "";
    }
  }

  function stepLightbox(delta) {
    var shots = state.lightbox.shots;
    if (!shots.length) return;
    state.lightbox.index = (state.lightbox.index + delta + shots.length) % shots.length;
    renderLightbox();
  }

  function renderLightbox() {
    var shot = state.lightbox.shots[state.lightbox.index];
    if (!shot || !els.lightboxImage) return;
    els.lightboxImage.src = shot.src;
    els.lightboxImage.alt = shot.alt || "";
    var many = state.lightbox.shots.length > 1;
    els.lightboxPrev.hidden = !many;
    els.lightboxNext.hidden = !many;
  }

  function bindContactForm(root) {
    var form = root.querySelector("#contact-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim()
      };
      if (!fields.name || !fields.email || !fields.message) return;
      window.location.href = buildMailto(fields);
    });
  }

  function buildMailto(fields) {
    var subject = "Note from " + fields.name;
    var body = fields.message + "\n\n" + fields.name + "\n" + fields.email;
    return "mailto:" + PROFILE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function sheetNav(section) {
    var links = ["circus", "music", "bio", "contact"].filter(function (key) {
      return key !== section;
    }).map(function (key) {
      return '<button type="button" data-switch="' + key + '">' + escapeHtml(SECTIONS[key].title) + "</button>";
    }).join("");
    return '<div class="sheet-nav">' + links + "</div>";
  }

  function safeMotif(name) {
    var allowed = { orbit: 1, stack: 1, ring: 1, wave: 1, bars: 1, pulse: 1 };
    return allowed[name] ? name : "ring";
  }

  function motifMarkup(name) {
    if (name === "wave") {
      return '<svg viewBox="0 0 64 32" aria-hidden="true"><path d="M2 16 C12 4 16 4 26 16 S42 28 52 16 S62 6 62 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>';
    }
    if (name === "stack" || name === "bars") return "<i></i><i></i><i></i>";
    return "<i></i>";
  }

  function applyFromUrl() {
    var section = readSection();
    if (section) navigateToSection(section, { fromUrl: true });
    else if (state.mode !== "playground" || !els.sheet.hidden) returnToPlayground({ fromUrl: true });
  }

  function readSection() {
    var hash = location.hash.replace("#", "");
    if (SECTIONS[hash]) return hash;
    return null;
  }

  function writeUrl(section) {
    var next = section
      ? location.pathname + location.search + "#" + section
      : location.pathname + location.search;
    var current = location.pathname + location.search + location.hash;
    if (current === next) return;
    try {
      history.pushState({ section: section }, "", next);
    } catch (err) {
      if (section) location.hash = section;
      else location.hash = "";
    }
  }

  function setTitle(section) {
    document.title = section && SECTIONS[section]
      ? SECTIONS[section].title + " — Simone Pagani"
      : "Simone Pagani — Circus ✳ Music";
  }

  function toggleInfo() {
    if (els.info.hidden) openInfo();
    else closeInfo();
  }

  function openInfo() {
    els.info.hidden = false;
    els.nameBtn.setAttribute("aria-expanded", "true");
    showToast("Note");
  }

  function closeInfo() {
    els.info.hidden = true;
    els.nameBtn.setAttribute("aria-expanded", "false");
  }

  function showToast(text) {
    els.toast.textContent = text;
    els.toast.classList.add("show");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(function () {
      els.toast.classList.remove("show");
    }, 1400);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  init();
})();
