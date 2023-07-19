module.exports = {
    semi: false,
    tabWidth: 4,
    arrowParens: "avoid",
    trailingComma: "es5",
    overrides: [
        { files: "*.svelte", options: { parser: "svelte" } },
        { files: "*.md", options: { tabWidth: 2 } },
    ],
    plugins: ["prettier-plugin-svelte"],
}
