const webpack = require("@nativescript/webpack");

module.exports = (env) => {
    webpack.init(env);

    // Learn how to customize:
    // https://docs.nativescript.org/webpack

    return webpack.resolveConfig();
};

// https://medium.com/loftbr/angular-storybook-6d8ae099ab96
