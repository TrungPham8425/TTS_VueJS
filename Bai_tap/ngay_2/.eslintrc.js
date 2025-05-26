module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    "no-undef": "off", // Tắt quy tắc no-undef
    "vue/multi-word-component-names": "off", // Tắt quy tắc yêu cầu tên component nhiều từ
  },
};
