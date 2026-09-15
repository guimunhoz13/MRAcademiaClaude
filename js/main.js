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
