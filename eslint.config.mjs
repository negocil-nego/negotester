// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@stylistic/space-before-function-paren": "off",
    "@stylistic/comma-dangle": "off",
    "@stylistic/quotes": "off",
    "@stylistic/semi": "off",
    "@stylistic/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/padding-line-between-blocks": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/no-multiple-template-root": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-indent": "off",
  },
});
