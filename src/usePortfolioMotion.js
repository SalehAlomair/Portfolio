import { useEffect, useRef } from "react";

// Content is visible by default. Entrances enhance it only as it enters view.
export function usePortfolioMotion() {
  const root = useRef(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...root.current.querySelectorAll([
      ".project-inner > *", ".section-intro > *", ".about-copy > *",
      ".case-heading > *", ".case-overview > *", ".case-editorial-grid > *",
      ".case-decisions > *", ".case-meta > *", ".additional-project > *",
      ".experience-entry", ".education-column > *", ".expertise-grid > *",
      ".contact-layout > *", ".project-diagram", ".landing-diagram",
    ].join(","))];
    let observer;
    function reset() {
      observer?.disconnect();
      elements.forEach((element) => {
        element.classList.remove("motion-arrived");
        element.style.removeProperty("--entrance-delay");
      });
    }
    function start() {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          target.classList.add("motion-arrived");
          observer.unobserve(target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
      elements.forEach((element) => {
        const index = [...element.parentElement.children].indexOf(element);
        element.style.setProperty("--entrance-delay", `${Math.min(index, 3) * 60}ms`);
        observer.observe(element);
      });
    }
    start();
    preference.addEventListener("change", start);
    return () => {
      reset();
      preference.removeEventListener("change", start);
    };
  }, []);
  return root;
}
