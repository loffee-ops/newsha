import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";

import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

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

    ...compat.extends(
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ),

    {
        settings: {
            react: { version: "detect" },
            "import/resolver": {
                typescript: {
                    project: [
                        "./tsconfig.base.json",
                        "./backend/tsconfig.json",
                        "./frontend/tsconfig.json",
                        "./shared/tsconfig.json",
                        "./design-system/tsconfig.json",
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
        files: ["frontend/**/*.{ts,tsx}", "design-system/**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
        ...reactRefresh.configs.vite,
        rules: {
            ...(reactRefresh.configs.vite.rules ?? {}),
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",

            "import/no-restricted-paths": [
                "error",
                {
                    zones: [
                        {
                            target: "./frontend/src/entities",
                            from: ["./frontend/src/widgets", "./frontend/src/pages"],
                        },
                        {
                            target: "./frontend/src/shared",
                            from: [
                                "./frontend/src/entities",
                                "./frontend/src/features",
                                "./frontend/src/widgets",
                                "./frontend/src/pages",
                                "./frontend/src/app",
                            ],
                        },
                    ],
                },
            ],
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
