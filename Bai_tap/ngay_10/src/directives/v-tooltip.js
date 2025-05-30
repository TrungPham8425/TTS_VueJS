export const vTooltip = {
  mounted: (el, binding) => {
    el.setAttribute("data-tooltip", binding.value);
    el.style.position = "relative";
    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);
  },
  unmounted: (el) => {
    el.removeEventListener("mouseenter", showTooltip);
    el.removeEventListener("mouseleave", hideTooltip);
  },
};

function showTooltip(e) {
  const tooltip = document.createElement("div");
  tooltip.className = "v-tooltip";
  tooltip.textContent = e.target.getAttribute("data-tooltip");
  tooltip.style.cssText = `
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
  `;
  e.target.appendChild(tooltip);
}

function hideTooltip(e) {
  const tooltip = e.target.querySelector(".v-tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

export default {
  install(app) {
    app.directive("tooltip", vTooltip);
  },
};
