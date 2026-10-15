import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    {
      name: 'name-downloadable-html',
      enforce: 'post',
      generateBundle(_, bundle) {
        const html = bundle['index.html'];
        if (html?.type === 'asset') {
          delete bundle['index.html'];
          this.emitFile({
            type: 'asset',
            fileName: 'WLED_CHRISTMAS_TREE_MAPPING_TOOL.html',
            source: html.source,
          });
        }
      },
    },
  ],
});
