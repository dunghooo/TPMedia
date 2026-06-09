# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Translating locales using Microsoft Translator

Add your Microsoft Translator credentials as environment variables and run the helper to translate `src/locales/vi.json` into Traditional Chinese (`src/locales/zh-TW.json`):

1. Set environment variables:

```powershell
setx TRANSLATOR_KEY "<your-key>"
setx TRANSLATOR_REGION "<your-region>"
```

2. Run the script:

```bash
npm run translate
```

The script reads `src/locales/vi.json`, translates the strings using the Microsoft Translator Text API (to `zh-Hant`), and writes `src/locales/zh-TW.json`.
