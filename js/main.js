(function () {
  "use strict";

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  /* ---------- horário de funcionamento (dados reais da academia) ---------- */
  var HOURS = [
    null, // domingo — fechado
    { open: [6, 0], close: [22, 0] }, // segunda
    { open: [6, 0], close: [22, 0] }, // terça
    { open: [6, 0], close: [22, 0] }, // quarta
    { open: [6, 0], close: [22, 0] }, // quinta
    { open: [6, 0], close: [21, 30] }, // sexta
    { open: [8, 0], close: [12, 0] }, // sábado
  ];
  var DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  function formatHour(h, m) {
    return m === 0 ? h + "h" : h + "h" + String(m).padStart(2, "0");
  }

  function getStatus(now) {
    var day = now.getDay();
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day];

    if (today) {
      var openMin = today.open[0] * 60 + today.open[1];
      var closeMin = today.close[0] * 60 + today.close[1];
      if (nowMin >= openMin && nowMin < closeMin) {
        return { open: true, text: "Aberto agora · fecha às " + formatHour(today.close[0], today.close[1]) };
      }
      if (nowMin < openMin) {
        return { open: false, text: "Fechado agora · abre hoje às " + formatHour(today.open[0], today.open[1]) };
      }
    }

    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (HOURS[d]) {
        var label = i === 1 ? "amanhã" : DAY_NAMES[d];
        return { open: false, text: "Fechado agora · abre " + label + " às " + formatHour(HOURS[d].open[0], HOURS[d].open[1]) };
      }
    }
    return { open: false, text: "Fechado" };
  }

  var statusLabel = document.getElementById("statusLabel");
  var statusDot = document.getElementById("statusDot");
  if (statusLabel) {
    var status = getStatus(new Date());
    statusLabel.textContent = status.text;
    if (statusDot && !status.open) statusDot.classList.add("is-closed");
  }

  var todayRow = document.querySelector('.hours-table li[data-day="' + new Date().getDay() + '"]');
  if (todayRow) todayRow.classList.add("is-today");

  /* ---------- motion (only if GSAP loaded and motion allowed) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.gsap && !reduceMotion) {
    document.documentElement.classList.add("js-anim");
    gsap.registerPlugin(ScrollTrigger);

    // hero entrance
    gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
      .to(".hero .eyebrow[data-reveal]", { opacity: 1, y: 0, delay: 0.1 })
      .to(".hero-title .line", { opacity: 1, y: 0, stagger: 0.12 }, "-=0.55")
      .to(".hero-lede[data-reveal]", { opacity: 1, y: 0 }, "-=0.5")
      .to(".hero-cta[data-reveal]", { opacity: 1, y: 0 }, "-=0.55")
      .to(".hero-stats[data-reveal]", { opacity: 1, y: 0 }, "-=0.55");

    gsap.fromTo(".hd-blue", { xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 0.08, duration: 1.4, ease: "power3.out" });
    gsap.fromTo(".hd-orange", { xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 0.55, duration: 1.4, ease: "power3.out", delay: 0.1 });

    // scroll reveals for everything below the hero
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (el.closest(".hero")) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    // animated counters (rating / review count)
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var isDecimal = String(target).indexOf(".") !== -1;
      var obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: function () {
          el.textContent = isDecimal ? obj.val.toFixed(1).replace(".", ",") : Math.round(obj.val);
        },
      });
    });
  }
})();
