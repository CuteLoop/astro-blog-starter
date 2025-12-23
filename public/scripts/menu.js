console.log("[menu] loaded", window.location.pathname);

function initMenu() {
  document.querySelectorAll(".site-header").forEach((header) => {
    const menu = header.querySelector(".menu");
    const nav = header.querySelector("#main-menu");

    if (!menu || !nav) return;

    menu.addEventListener("click", () => {
      const isExpanded = menu.getAttribute("aria-expanded") === "true";
      const next = !isExpanded;

      menu.setAttribute("aria-expanded", String(next));
      header.classList.toggle("menu-open", next);
    });

    // Optional: close on link click (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest("a")) {
        menu.setAttribute("aria-expanded", "false");
        header.classList.remove("menu-open");
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenu);
} else {
  initMenu();
}
