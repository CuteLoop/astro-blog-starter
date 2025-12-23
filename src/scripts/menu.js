console.log("[menu] module loaded");

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
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenu);
} else {
  initMenu();
}
