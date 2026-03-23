import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "**/dist/**",
        "**/coverage/**",
        "**/node_modules/**",
        "**/.turbo/**",
        "**/build/**",
    ]),

    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,

    {
        settings: {
            "import/resolver": {
                typescript: {
                    project: [
                        "./tsconfig.base.json",
                        "./backend/tsconfig.json",
                        "./shared/tsconfig.json",
                    ],
                    noWarnOnMultipleProjects: true,
                },
            },
        },
    },

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
        plugins: {
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
        rules: {
            quotes: ["error", "double", { avoidEscape: true }],
            "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
        },
    },

    {
        files: ["backend/**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
    },

    {
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
]);
