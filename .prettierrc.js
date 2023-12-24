export default {
    semi: false,
    tabWidth: 4,
    arrowParens: "avoid",
    trailingComma: "es5",
    overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
    plugins: ["prettier-plugin-svelte"],
}
