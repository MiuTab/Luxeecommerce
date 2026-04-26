
# Luxeecommerce

Proyecto frontend con Vite + React listo para publicar en GitHub Pages.

## Desarrollo local

1. Instala dependencias con `pnpm install`.
2. Inicia el servidor con `pnpm run dev`.

## Despliegue en GitHub Pages (automatico)

El repositorio incluye el workflow `.github/workflows/deploy-pages.yml` que publica automaticamente en cada push a `main`.

1. En GitHub, ve a `Settings > Pages`.
2. En `Source`, selecciona `GitHub Actions`.
3. Haz push a `main`.
4. Espera a que termine el workflow `Deploy to GitHub Pages`.

El build usa la base `/<repo>/` cuando detecta `GITHUB_PAGES=true`, para que los assets carguen correctamente en Pages.

## Despliegue manual opcional

Tambien puedes publicar manualmente a la rama `gh-pages`:

1. Instala dependencias con `pnpm install`.
2. Ejecuta `pnpm run deploy`.

Ese comando construye con base de GitHub Pages y publica la carpeta `dist`.
