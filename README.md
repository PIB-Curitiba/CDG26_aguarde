
# Casas de Glória 2026 — LP Aguarde

Landing page "aguarde" da conferência Casas de Glória 2026 (PIB Curitiba).

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos estáticos ficam em `dist/`.

## Publicar no GitHub

1. Crie um repositório no GitHub (ex.: `cdg26-lp-aguarde`).
2. Envie os arquivos deste projeto (sem `node_modules` e sem `dist`).
3. Em **Settings → Pages**, escolha **GitHub Actions** como origem.
4. Faça push na branch `main` — o workflow `.github/workflows/deploy-pages.yml` publica automaticamente.

O site ficará em: `https://<seu-usuario>.github.io/<nome-do-repo>/`

## Stack

- React 18 + Vite 6
- Tailwind CSS 4
- Motion (ShinyText)
- OGL (SpecularButton)
