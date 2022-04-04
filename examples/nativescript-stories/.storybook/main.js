module.exports = {
    stories: [
        // "../stories/**/*.stories.mdx",
        // "../stories/**/*.stories.@(json)",
        "../app/components/**/*.stories.ts",
        "../app/components/**/*.stories.json"
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/server"
};
