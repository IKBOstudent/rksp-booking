const eslintPluginPrettier = require('eslint-plugin-prettier');
const typescriptEslint = require('typescript-eslint');

module.exports = [
    ...typescriptEslint.configs.recommended,
    {
        languageOptions: {
            parser: typescriptEslint.parser,
        },

        plugins: {
            prettier: eslintPluginPrettier,
        },

        ignores: ['build', 'node_modules'],
    },
];
