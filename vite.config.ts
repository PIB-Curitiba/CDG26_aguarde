import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Compatibilidade com projetos configurados como módulos ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Resolve arquivos exportados pelo Figma Make.
 * Exemplo:
 * figma:asset/imagem.png
 * torna-se:
 * src/assets/imagem.png
 */
function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',

    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')

        return path.resolve(__dirname, 'src/assets', filename)
      }

      return null
    },
  }
}

export default defineConfig(({ command }) => ({
  /**
   * No desenvolvimento local, utiliza "/".
   * No build do GitHub Pages, utiliza o nome do repositório.
   */
  base: command === 'build' ? '/CDG26_aguarde/' : '/',

  plugins: [
    figmaAssetResolver(),

    // Necessários para o funcionamento do projeto
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Permite imports como: import Componente from '@/components/Componente'
      '@': path.resolve(__dirname, './src'),
    },
  },

  /**
   * Configuração explícita da pasta gerada pelo build.
   * O GitHub Pages deverá publicar esta pasta.
   */
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  // Arquivos que podem ser importados diretamente pelo projeto
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
