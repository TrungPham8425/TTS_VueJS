export const vFocus = {
  mounted: (el) => {
    el.focus();
  },
};

export default {
  install(app) {
    app.directive("focus", vFocus);
  },
};
